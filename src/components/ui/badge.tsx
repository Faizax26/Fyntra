import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors", {
  variants: {
    variant: {
      default: "border-primary/15 bg-primary/10 text-primary",
      secondary: "border-border/60 bg-secondary/80 text-secondary-foreground",
      outline: "border-border/80 bg-transparent text-foreground",
      success: "border-lime-500/10 bg-lime-500/12 text-lime-700 dark:text-lime-300",
      warning: "border-amber-500/10 bg-amber-500/12 text-amber-700 dark:text-amber-300"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
