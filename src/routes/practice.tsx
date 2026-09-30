import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PARTNERS, SCENARIOS, type Mode } from "@/lib/practice";
import {
  createConversation,
  listConversations,
  type ConversationRow,
} from "@/lib/server/conversations";
import { cn } from "@/lib/utils";

type PracticeSearch = { mode?: Mode; scenario?: string };

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>): PracticeSearch => ({
    mode: search.mode === "him" || search.mode === "her" ? search.mode : undefined,
    scenario: typeof search.scenario === "string" ? search.scenario : undefined,
  }),
  component: PracticePage,
});

function PracticePage() {
  const { user, isPending } = useCurrentUserState();
  const { mode, scenario } = Route.useSearch();

  if (isPending) {
    return (
      <div className="flex min-h-svh flex-col">
        <AppHeader />
        <div className="mx-auto w-full max-w-5xl px-5 py-10">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-6 h-24 w-full max-w-xl" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    const next = mode
      ? `/practice?mode=${mode}${scenario ? `&scenario=${encodeURIComponent(scenario)}` : ""}`
      : "/practice";
    return <Navigate to="/login" search={{ next }} />;
  }

  return <PracticePicker mode={mode} presetScenario={scenario} />;
}

function PracticePicker({
  mode: initialMode,
  presetScenario,
}: {
  mode?: Mode;
  presetScenario?: string;
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode | undefined>(initialMode);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<ConversationRow[] | null>(null);
  const autoStarted = useRef(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    let alive = true;
    listConversations()
      .then((rows) => {
        if (alive) setRecent(rows);
      })
      .catch(() => {
        if (alive) setRecent([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!mode || !presetScenario || autoStarted.current) return;
    if (!SCENARIOS.some((s) => s.id === presetScenario)) return;
    autoStarted.current = true;
    void start(presetScenario);
    // start is stable enough for this one-shot handoff from /login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, presetScenario]);

  async function start(scenarioId: string) {
    if (!mode || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { id } = await createConversation({ data: { mode, scenarioId } });
      await navigate({
        to: "/practice/$conversationId",
        params: { conversationId: String(id) },
      });
    } catch {
      setError("Could not start the conversation. Try signing in again.");
      setBusy(false);
      autoStarted.current = false;
    }
  }

  const partner = mode ? PARTNERS[mode] : null;

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-16 pt-4 sm:px-8">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Choose a path</p>
        <h1 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
          Who are you practicing with?
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Two rooms. Same skills. Pick the counterpart you want to talk to.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <ModeToggle
            active={mode === "her"}
            label="Her"
            name={PARTNERS.her.name}
            hint="Practice as a man"
            onClick={() => setMode("her")}
            tint="her"
          />
          <ModeToggle
            active={mode === "him"}
            label="Him"
            name={PARTNERS.him.name}
            hint="Practice as a woman"
            onClick={() => setMode("him")}
            tint="him"
          />
        </div>

        {partner ? (
          <>
            <p className="mt-10 text-sm text-muted">
              <span className="text-fg">{partner.name}</span>, {partner.age}. {partner.blurb}
            </p>
            <h2 className="mt-8 font-display text-2xl italic tracking-tight">Pick a scene</h2>
            {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={busy}
                  onClick={() => void start(s.id)}
                  className="flex min-h-32 flex-col items-start rounded-xl border border-border bg-surface p-5 text-left transition-[border-color,background-color,transform] duration-150 hover:border-border-strong hover:bg-elevated active:scale-[0.99] disabled:opacity-50"
                >
                  <span className="font-display text-xl italic tracking-tight text-fg">
                    {s.title}
                  </span>
                  <span className="mt-2 text-sm text-muted">{s.lede}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {recent && recent.length > 0 ? (
          <section className="mt-14 border-t border-border pt-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl italic tracking-tight">Continue privately</h2>
              <Link to="/history" className="text-sm text-muted hover:text-fg">
                All conversations
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {recent.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/practice/$conversationId"
                    params={{ conversationId: String(c.id) }}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm no-underline"
                  >
                    <span className="text-fg">{c.title}</span>
                    <span className="shrink-0 text-subtle">
                      {c.locked ? "Paused" : c.flagged ? "Care" : "Open"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function ModeToggle({
  active,
  label,
  name,
  hint,
  onClick,
  tint,
}: {
  active: boolean;
  label: string;
  name: string;
  hint: string;
  onClick: () => void;
  tint: Mode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-5 py-5 text-left transition-[border-color,background-color] duration-150",
        active
          ? "border-border-strong bg-elevated"
          : "border-border bg-surface hover:border-border-strong",
      )}
    >
      <p className={cn("text-xs tracking-[0.18em] uppercase", tint === "her" ? "text-her" : "text-him")}>
        {hint}
      </p>
      <p className="mt-2 font-display text-3xl italic tracking-tight">{label}</p>
      <p className="mt-1 text-sm text-muted">{name}</p>
    </button>
  );
}
