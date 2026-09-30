import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-12 w-full resize-none rounded-lg border border-border bg-elevated px-4 py-3 text-base text-fg placeholder:text-subtle shadow-none outline-none transition-[border-color,box-shadow] duration-150",
      "focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-accent/50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
