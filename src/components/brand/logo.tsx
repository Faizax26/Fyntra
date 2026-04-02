import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ href = "/app/dashboard", compact = false, className }: { href?: string; compact?: boolean; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-400 text-sm font-bold text-primary-foreground shadow-[0_14px_34px_-20px_rgba(56,87,255,0.8)]">
        fy
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className="text-base font-bold tracking-[-0.04em]">fyntra</span>
          <span className="text-xs text-sidebar-muted sm:text-muted-foreground">Personal finance clarity</span>
        </span>
      ) : null}
    </Link>
  );
}
