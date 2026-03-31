import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary/70 bg-primary text-primary-foreground shadow-[0_16px_36px_-18px_rgba(13,122,112,0.7)] hover:-translate-y-0.5 hover:bg-primary/92",
        secondary: "border-border/60 bg-secondary/82 text-secondary-foreground hover:bg-secondary",
        outline: "border-border/80 bg-[color:var(--surface-1)] text-foreground hover:border-primary/30 hover:bg-accent/60 hover:text-accent-foreground",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-accent/55 hover:text-accent-foreground",
        destructive: "border-destructive/50 bg-destructive text-destructive-foreground hover:bg-destructive/92"
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
