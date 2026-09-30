import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PARTNERS, scenarioById, type Mode } from "@/lib/practice";
import {
  getConversation,
  sendMessage,
  type ConversationRow,
  type MessageRow,
} from "@/lib/server/conversations";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice/$conversationId")({
  component: ConversationPage,
});

function ConversationPage() {
  const { conversationId } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const id = Number(conversationId);

  if (isPending) {
    return (
      <div className="flex min-h-svh flex-col">
        <AppHeader compact />
        <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-8 h-24 w-2/3 rounded-xl" />
          <Skeleton className="ml-auto mt-4 h-16 w-1/2 rounded-xl" />
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        search={{ next: `/practice/${conversationId}` }}
      />
    );
  }
  if (!Number.isFinite(id) || id <= 0) {
    return <Missing />;
  }
  return <ChatRoom id={id} />;
}

function Missing() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6">
        <h1 className="font-display text-4xl italic">That conversation is not here.</h1>
        <p className="mt-3 text-muted">It may be private to another account, or it never existed.</p>
        <Link to="/practice" className="mt-8 text-sm text-fg underline-offset-4 hover:underline">
          Start a new practice
        </Link>
      </main>
    </div>
  );
}

function ChatRoom({ id }: { id: number }) {
  const navigate = useNavigate();
  const [conv, setConv] = useState<ConversationRow | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    getConversation({ data: { id } })
      .then((payload) => {
        if (!alive) return;
        if (!payload) {
          setLoadError("missing");
          return;
        }
        setConv(payload.conversation);
        setMessages(payload.messages);
      })
      .catch(() => {
        if (alive) setLoadError("failed");
      });
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function onSend() {
    const content = draft.trim();
    if (!content || sending || conv?.locked) return;
    setSending(true);
    setSendError(null);
    setDraft("");
    const optimistic: MessageRow = {
      id: -Date.now(),
      conversationId: id,
      role: "user",
      content,
      coachNote: null,
      emotion: null,
      flagged: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    try {
      const result = await sendMessage({ data: { conversationId: id, content } });
      if (!result.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setDraft(content);
        setSendError(result.error);
        setSending(false);
        return;
      }
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimistic.id),
        result.userMessage,
        result.assistantMessage,
      ]);
      setConv((c) =>
        c
          ? {
              ...c,
              locked: result.locked,
              flagged: result.flagKind !== "none" ? true : c.flagged,
              flagKind: result.flagKind === "none" ? c.flagKind : result.flagKind,
            }
          : c,
      );
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setDraft(content);
      setSendError("The reply did not come through. Try once more.");
    }
    setSending(false);
  }

  if (loadError === "missing") return <Missing />;
  if (loadError) {
    return (
      <div className="flex min-h-svh flex-col">
        <AppHeader />
        <main className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-6">
          <p className="text-muted">Could not open this conversation.</p>
          <button
            type="button"
            className="mt-4 min-h-11 text-left text-sm underline-offset-4 hover:underline"
            onClick={() => void navigate({ to: "/practice" })}
          >
            Back to practice
          </button>
        </main>
      </div>
    );
  }
  if (!conv) {
    return (
      <div className="flex min-h-svh flex-col">
        <AppHeader compact />
        <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-8 h-24 w-2/3 rounded-xl" />
        </div>
      </div>
    );
  }

  const mode: Mode = conv.mode;
  const partner = PARTNERS[mode];
  const scenario = scenarioById(conv.scenarioId);
  const crisis = conv.flagKind === "crisis" || conv.flagKind === "age";

  return (
    <div className="flex h-svh min-h-svh flex-col">
      <AppHeader compact />
      <div className="mx-auto flex w-full max-w-3xl items-end justify-between gap-4 px-5 pb-3 sm:px-6">
        <div className="min-w-0">
          <p className={cn("text-xs tracking-[0.18em] uppercase", mode === "her" ? "text-her" : "text-him")}>
            {partner.name}
          </p>
          <h1 className="truncate font-display text-2xl italic tracking-tight">
            {scenario?.title ?? conv.title}
          </h1>
        </div>
        <Link
          to="/practice"
          search={{ mode }}
          className="inline-flex h-11 shrink-0 items-center text-sm text-muted hover:text-fg"
        >
          New scene
        </Link>
      </div>

      {conv.flagged ? (
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <div className="rounded-lg border border-care/40 bg-elevated px-4 py-3 text-sm text-care">
            {crisis
              ? "This practice is paused. Kindred stepped out of the scene to keep you safe. Your words stay private."
              : "Kindred marked a care flag on this conversation. The partner will stay gentle. You can continue when you are ready, or start a new scene."}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5 py-4 sm:px-6">
        <ul className="flex flex-col gap-5">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} mode={mode} partnerName={partner.name} />
          ))}
          {sending ? <Typing mode={mode} name={partner.name} /> : null}
        </ul>
        <div ref={endRef} className="h-4" />
      </div>

      <form
        className="mx-auto w-full max-w-3xl px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6"
        onSubmit={(e) => {
          e.preventDefault();
          void onSend();
        }}
      >
        {sendError ? <p className="mb-2 text-sm text-danger">{sendError}</p> : null}
        {conv.locked ? (
          <div className="rounded-lg border border-border bg-surface px-4 py-4 text-sm text-muted">
            This scene is closed.{" "}
            <Link to="/practice" search={{ mode }} className="text-fg underline-offset-4 hover:underline">
              Start a new conversation
            </Link>{" "}
            when you want to practice again.
          </div>
        ) : (
          <div className="flex items-end gap-3 rounded-xl border border-border bg-surface p-2">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onSend();
                }
              }}
              placeholder={`Talk to ${partner.name}…`}
              rows={1}
              maxLength={1500}
              className="max-h-36 min-h-12 border-0 bg-transparent py-3 focus-visible:ring-0"
              disabled={sending}
            />
            <Button type="submit" size="md" disabled={sending || !draft.trim()} className="mb-0.5 shrink-0">
              Send
            </Button>
          </div>
        )}
        <p className="mt-2 px-1 text-xs text-subtle">
          Private to you. If things get heavy, Kindred will pause the scene and flag it for care.
        </p>
      </form>
    </div>
  );
}

function MessageBubble({
  message,
  mode,
  partnerName,
}: {
  message: MessageRow;
  mode: Mode;
  partnerName: string;
}) {
  const mine = message.role === "user";
  return (
    <li className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
      {!mine ? (
        <p className={cn("mb-1.5 text-xs tracking-[0.14em] uppercase", mode === "her" ? "text-her" : "text-him")}>
          {partnerName}
        </p>
      ) : (
        <p className="mb-1.5 text-xs tracking-[0.14em] text-subtle uppercase">You</p>
      )}
      <div
        className={cn(
          "max-w-lg whitespace-pre-wrap rounded-xl px-4 py-3 text-base leading-relaxed",
          mine
            ? "rounded-br-sm bg-accent text-accent-fg"
            : "rounded-bl-sm border border-border bg-elevated text-fg",
        )}
      >
        {message.content}
      </div>
      {!mine && message.coachNote ? (
        <p className="mt-2 max-w-lg text-sm italic text-muted">
          <span className="not-italic tracking-[0.14em] text-subtle uppercase">Coach — </span>
          {message.coachNote}
        </p>
      ) : null}
    </li>
  );
}

function Typing({ mode, name }: { mode: Mode; name: string }) {
  return (
    <li className="flex flex-col items-start">
      <p className={cn("mb-1.5 text-xs tracking-[0.14em] uppercase", mode === "her" ? "text-her" : "text-him")}>
        {name}
      </p>
      <div className="flex h-11 items-center gap-1.5 rounded-xl rounded-bl-sm border border-border bg-elevated px-4">
        <span className="size-1.5 rounded-full bg-muted" style={{ animation: "pulse-dot 1s infinite" }} />
        <span className="size-1.5 rounded-full bg-muted" style={{ animation: "pulse-dot 1s infinite 0.15s" }} />
        <span className="size-1.5 rounded-full bg-muted" style={{ animation: "pulse-dot 1s infinite 0.3s" }} />
      </div>
    </li>
  );
}
