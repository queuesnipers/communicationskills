import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listConversations, type ConversationRow } from "@/lib/server/conversations";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="flex min-h-svh flex-col">
        <AppHeader />
        <div className="mx-auto w-full max-w-3xl px-5 py-10">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="mt-8 h-16 w-full" />
          <Skeleton className="mt-3 h-16 w-full" />
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" search={{ next: "/history" }} />;
  }
  return <HistoryList />;
}

function HistoryList() {
  const [rows, setRows] = useState<ConversationRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    listConversations()
      .then((data) => {
        if (alive) setRows(data);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-6 sm:px-8">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Only you can see these</p>
        <h1 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
          Your conversations
        </h1>
        <p className="mt-3 max-w-lg text-muted">
          Every practice is saved privately to your account. Open one to continue, or start a new
          scene.
        </p>
        <Link
          to="/practice"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
        >
          New practice
        </Link>

        {failed ? <p className="mt-8 text-sm text-danger">Could not load your conversations.</p> : null}
        {rows === null && !failed ? (
          <div className="mt-10 space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : null}
        {rows && rows.length === 0 ? (
          <p className="mt-12 text-muted">No conversations yet. Pick a path and start talking.</p>
        ) : null}
        {rows && rows.length > 0 ? (
          <ul className="mt-10 divide-y divide-border border-t border-border">
            {rows.map((c) => (
              <li key={c.id}>
                <Link
                  to="/practice/$conversationId"
                  params={{ conversationId: String(c.id) }}
                  className="flex min-h-11 items-center justify-between gap-4 py-4 no-underline"
                >
                  <div className="min-w-0">
                    <p className="truncate text-fg">{c.title}</p>
                    <p className="mt-1 text-xs tracking-[0.14em] text-subtle uppercase">
                      with {c.partnerName}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {c.locked ? "Paused" : c.flagged ? "Care flag" : "Open"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
}
