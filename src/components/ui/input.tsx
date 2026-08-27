import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-panel px-3 text-sm text-fg placeholder:text-subtle",
        "transition-[border-color,box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(77,124,255,0.18)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
