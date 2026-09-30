import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-2.5 text-fg no-underline",
        className,
      )}
    >
      <span
        className="grid size-8 place-items-center rounded-full border border-border-strong"
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="5.2" cy="7" r="3.1" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8.8" cy="7" r="3.1" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
      <span className="font-display text-xl italic tracking-tight">Kindred</span>
    </Link>
  );
}
