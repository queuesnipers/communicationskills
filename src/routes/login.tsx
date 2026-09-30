import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Wordmark } from "@/components/wordmark";
import { safeNextPath } from "@/lib/practice";

type LoginSearch = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    next: typeof search.next === "string" ? search.next : undefined,
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const callbackURL = safeNextPath(next);
  const returningToPractice = callbackURL.startsWith("/practice");

  return (
    <div className="flex min-h-svh flex-col">
      <header className="px-5 py-4 sm:px-8">
        <Wordmark />
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pb-16">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Private practice</p>
        <h1 className="mt-3 font-display text-4xl italic tracking-tight text-fg sm:text-5xl">
          Sign in to keep this yours.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          {returningToPractice
            ? "After you sign in, you will come back to the room you chose. Conversations stay on your account only."
            : "Conversations are stored privately on your account. Nobody else can open them."}
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL })}
                className="flex h-12 w-full items-center justify-center rounded-lg border border-border bg-elevated text-sm font-medium text-fg transition-[border-color,background-color,transform] duration-150 hover:border-border-strong hover:bg-surface active:scale-[0.96]"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>

        <p className="mt-8 text-sm text-subtle">
          By continuing you agree this is an adult communication practice, not a dating
          service and not therapy.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          Back to Kindred
        </Link>
      </main>
    </div>
  );
}
