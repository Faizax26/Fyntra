import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3.5", className)}>
      <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-[1.15rem] border border-primary/20 bg-linear-to-br from-primary to-lime-500 text-lg font-bold text-primary-foreground shadow-[0_18px_36px_-18px_rgba(13,122,112,0.8)]">
        <span className="relative z-10">f.</span>
      </div>
      <div className="flex flex-col justify-center gap-1.5 leading-none">
        <span className="font-display text-[1.32rem] font-semibold tracking-[-0.06em]">Fyntra.</span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">Faizax FinanceOS</span>
      </div>
    </Link>
  );
}
