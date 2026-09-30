import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Wordmark } from "@/components/wordmark";
import { Skeleton } from "@/components/ui/skeleton";

export function AppHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <Wordmark />
      <nav className="flex items-center gap-4 sm:gap-6">
        {!compact ? (
          <Link
            to="/history"
            className="hidden text-sm text-muted transition-colors duration-150 hover:text-fg sm:inline"
          >
            Your conversations
          </Link>
        ) : null}
        <AuthSlot />
      </nav>
    </header>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <Skeleton className="h-8 w-28 rounded-full" />;
  }
  if (user) {
    return (
      <div className="max-w-[220px] truncate text-fg [&_button]:text-muted [&_button]:no-underline [&_span]:text-sm [&_span]:text-muted">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="inline-flex h-10 items-center rounded-md border border-border px-3.5 text-sm text-fg transition-colors duration-150 hover:border-border-strong hover:bg-elevated"
    >
      Sign in
    </Link>
  );
}
