import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-[1.15rem] border border-primary/20 bg-linear-to-br from-primary to-lime-500 text-lg font-bold text-primary-foreground shadow-[0_18px_36px_-18px_rgba(13,122,112,0.8)]">
        <span className="relative z-10">f.</span>
        <ArrowUpRight className="absolute -right-0.5 -top-0.5 size-5 opacity-20" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[1.1rem] font-semibold tracking-[-0.05em]">fyntra.</span>
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">clarity for your money</span>
      </div>
    </Link>
  );
}
