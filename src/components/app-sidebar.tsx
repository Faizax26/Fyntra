"use client";

import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { appNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function SidebarNav({ collapsed, pathname, onNavigate }: { collapsed: boolean; pathname: string; onNavigate?: () => void }) {
  return (
    <nav className={cn("space-y-1.5", collapsed && "flex flex-col items-center")}>
      {appNav.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex h-11 items-center gap-3 rounded-[1rem] px-3 text-sm",
              collapsed && "w-11 justify-center gap-0 px-0 py-0",
              active
                ? collapsed
                  ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  : "bg-linear-to-r from-white/14 to-white/6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                : "text-sidebar-muted hover:bg-white/6 hover:text-white"
            )}
          >
            {active ? (
              <span
                className={cn(
                  "absolute top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-lime-300",
                  "-left-1"
                )}
              />
            ) : null}
            <Icon
              className={cn(
                "size-4 shrink-0",
                active && "scale-105",
                collapsed && "mx-auto"
              )}
            />
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap text-sm",
                collapsed ? "hidden" : "max-w-[140px] translate-x-0 opacity-100"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFrame({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { collapsed, setCollapsed, setMobileOpen } = useSidebar();

  return (
    <aside
      className={cn(
        "surface-shell relative flex h-screen overflow-visible text-sidebar-foreground",
        collapsed && !mobile ? "w-[84px]" : "w-[232px]"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="relative px-4 pb-3 pt-5">
          <div
            className={cn(
              "flex items-center justify-start",
              collapsed && !mobile && "justify-center"
            )}
          >
            <Logo
              href="/app/dashboard"
              className={cn(
                collapsed && !mobile && "w-full justify-center gap-0 [&>div:first-child]:mx-auto [&>div:last-child]:hidden"
              )}
            />
          </div>
          <div className="relative mt-6 border-t border-white/7">
            {!mobile ? (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-0 z-10 size-8 -translate-y-1/2 rounded-full border border-white/10 bg-[rgba(23,35,29,0.96)] text-sidebar-muted shadow-[0_14px_28px_-18px_rgba(0,0,0,0.62)] hover:bg-[rgba(29,45,37,0.98)] hover:text-white",
                  collapsed ? "left-1/2 -translate-x-1/2" : "right-3"
                )}
                onClick={() => setCollapsed(!collapsed)}
              >
                <ChevronsLeftRight className={cn("size-3.5", collapsed && "rotate-180")} />
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex-1 px-2.5 pb-5 pt-3">
          <SidebarNav collapsed={collapsed && !mobile} pathname={pathname} onNavigate={mobile ? () => setMobileOpen(false) : undefined} />
        </div>
      </div>
    </aside>
  );
}

export function AppSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <div className="hidden self-start lg:sticky lg:top-0 lg:block">
        <SidebarFrame />
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[92vw] max-w-sm border-r-0 bg-transparent p-0 shadow-none">
          <SidebarFrame mobile />
        </SheetContent>
      </Sheet>
    </>
  );
}
