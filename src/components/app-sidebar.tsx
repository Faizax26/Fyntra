"use client";

import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { PlanBadge } from "@/components/plan-badge";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { appNav } from "@/lib/navigation";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

function SidebarNav({ collapsed, pathname, onNavigate }: { collapsed: boolean; pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1.5">
      {appNav.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-[1.15rem] px-3 py-3 text-sm transition-all duration-200",
              active
                ? "bg-linear-to-r from-white/14 to-white/6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                : "text-sidebar-muted hover:bg-white/6 hover:text-white"
            )}
          >
            {active ? <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-lime-300" /> : null}
            <Icon className={cn("size-4 shrink-0 transition-transform duration-200", active && "scale-105")} />
            {!collapsed ? <span>{item.label}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFrame({ user, mobile = false }: { user: User; mobile?: boolean }) {
  const pathname = usePathname();
  const { collapsed, setCollapsed, setMobileOpen } = useSidebar();

  return (
    <aside className={cn("surface-shell flex h-full flex-col text-sidebar-foreground", collapsed && !mobile ? "w-[96px]" : "w-[304px]")}>
      <div className="flex items-center justify-between px-5 py-5">
        <Logo href="/app/dashboard" className={cn(collapsed && !mobile && "justify-center [&>div:last-child]:hidden")} />
        {!mobile ? (
          <Button variant="ghost" size="icon" className="border-white/5 text-sidebar-foreground hover:bg-white/8 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
            <ChevronsLeftRight className="size-4" />
          </Button>
        ) : null}
      </div>
      <div className="px-5 pb-5">
        <div className="rounded-[28px] border border-white/10 bg-linear-to-br from-white/8 to-white/3 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className={cn("space-y-2", collapsed && !mobile && "hidden")}>
            <p className="eyebrow text-sidebar-muted">Signed in as</p>
            <p className="font-medium text-sidebar-foreground">{user.email}</p>
            <p className="text-sm text-sidebar-muted">Workspace premium dengan kontrol budgeting, asset, dan security center.</p>
            <PlanBadge plan={user.plan} />
          </div>
          {collapsed && !mobile ? (
            <div className="flex justify-center">
              <PlanBadge plan={user.plan} />
            </div>
          ) : null}
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 pb-5">
        <SidebarNav collapsed={collapsed && !mobile} pathname={pathname} onNavigate={mobile ? () => setMobileOpen(false) : undefined} />
      </ScrollArea>
    </aside>
  );
}

export function AppSidebar({ user }: { user: User }) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <div className="hidden border-r border-border/70 lg:block">
        <SidebarFrame user={user} />
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[92vw] max-w-sm border-r-0 bg-transparent p-0 shadow-none">
          <SidebarFrame user={user} mobile />
        </SheetContent>
      </Sheet>
    </>
  );
}
