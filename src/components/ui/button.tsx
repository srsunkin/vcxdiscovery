import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,box-shadow,opacity,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:bg-accent/90 shadow-[0_0_0_1px_rgba(77,124,255,0.35)]",
        secondary:
          "bg-elevated text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-elevated/80",
        ghost: "text-muted hover:text-fg hover:bg-elevated",
        outline:
          "border border-border bg-transparent text-fg hover:bg-elevated hover:border-border-strong",
        danger: "bg-danger text-fg hover:bg-danger/90",
        success: "bg-success text-fg hover:bg-success/90",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-5",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
