import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { PARTNERS } from "@/lib/practice";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <section className="stagger-in max-w-3xl">
          <p className="text-xs tracking-[0.22em] text-muted uppercase">
            Romantic communication, practiced
          </p>
          <h1 className="mt-4 font-display text-5xl italic leading-tight tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Say the hard thing.
            <br />
            Keep the connection.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            Kindred is a private room to practice talking with someone you care about —
            first dates, feelings, fights, boundaries. A partner answers like a person.
            A coach tells you why it landed.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
          <ModeCard
            mode="her"
            kicker="For men"
            title="Practice with her"
            partner={PARTNERS.her.name}
            blurb={PARTNERS.her.blurb}
          />
          <ModeCard
            mode="him"
            kicker="For women"
            title="Practice with him"
            partner={PARTNERS.him.name}
            blurb={PARTNERS.him.blurb}
          />
        </section>

        <section className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          <Step n="01" title="Pick a scene" body="A first date. A repair. A boundary. Situations people actually freeze in." />
          <Step n="02" title="Talk like you" body="No scripts. The partner answers with feeling — and with a spine." />
          <Step n="03" title="Stay private" body="Sign in. Every conversation is stored for you alone. Nobody else can read it." />
        </section>
      </main>
    </div>
  );
}

function ModeCard({
  mode,
  kicker,
  title,
  partner,
  blurb,
}: {
  mode: "her" | "him";
  kicker: string;
  title: string;
  partner: string;
  blurb: string;
}) {
  const tint = mode === "her" ? "her" : "him";
  return (
    <Link
      to="/practice"
      search={{ mode }}
      className="group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 no-underline transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-border-strong sm:p-8"
    >
      <div
        className={
          tint === "her"
            ? "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_0%_100%,color-mix(in_oklab,var(--color-her)_18%,transparent),transparent_70%)] opacity-70"
            : "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_100%,color-mix(in_oklab,var(--color-him)_18%,transparent),transparent_70%)] opacity-70"
        }
      />
      <div className="relative">
        <p className={`text-xs tracking-[0.18em] uppercase ${tint === "her" ? "text-her" : "text-him"}`}>
          {kicker}
        </p>
        <h2 className="mt-3 font-display text-4xl italic tracking-tight text-fg sm:text-5xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted">with {partner}</p>
      </div>
      <p className="relative mt-8 max-w-md text-sm leading-relaxed text-muted">{blurb}</p>
      <span className="relative mt-6 inline-flex h-11 items-center text-sm font-medium text-fg">
        Choose this path
        <span className="ml-2 inline-block transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <p className="font-display text-sm italic text-subtle">{n}</p>
      <h2 className="mt-2 font-display text-2xl italic tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
