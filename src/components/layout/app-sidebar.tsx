"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { ChevronsLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/brand/logo";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { appNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function SidebarNavLink({
  collapsed,
  href,
  label,
  description,
  icon: Icon,
  active,
  onNavigate
}: {
  collapsed: boolean;
  href: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  onNavigate?: () => void;
}) {
  const link = (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all",
        collapsed ? "justify-center px-0" : "justify-start",
        active
          ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "text-sidebar-muted hover:bg-white/6 hover:text-white"
      )}
    >
      <Icon className="size-4 shrink-0" />
      {!collapsed ? (
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{label}</span>
          <span className="truncate text-xs text-sidebar-muted">{description}</span>
        </span>
      ) : null}
    </Link>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function AppSidebarNav({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const isCollapsed = collapsed && !mobile;

  return (
    <TooltipProvider delayDuration={120}>
      <ScrollArea className="h-full">
        <nav className="space-y-2 pr-2">
          {appNavigation.map((item) => (
            <SidebarNavLink
              key={item.href}
              active={pathname === item.href}
              collapsed={isCollapsed}
              description={item.description}
              href={item.href}
              icon={item.icon}
              label={item.label}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </ScrollArea>
    </TooltipProvider>
  );
}

export function AppSidebar() {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "surface-shell hidden h-screen border-r border-white/6 text-sidebar-foreground lg:flex lg:flex-col",
        collapsed ? "w-[92px]" : "w-[292px]"
      )}
    >
      <div className="flex items-center justify-between px-4 pb-4 pt-5">
        <Logo compact={collapsed} className="text-sidebar-foreground [&_span:last-child]:text-sidebar-muted" />
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-muted hover:bg-white/8 hover:text-white"
          aria-label="Collapse sidebar"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeftRight className={cn("size-4", collapsed && "rotate-180")} />
        </Button>
      </div>
      <div className="min-h-0 flex-1 px-3 pb-4 pt-8">
        <AppSidebarNav />
      </div>
      <div className="border-t border-white/8 px-4 py-4">
        <div className={cn("rounded-3xl border border-white/8 bg-white/5 p-4", collapsed && "px-2")}>
          <Badge variant="neutral" className={cn("bg-white/8 text-sidebar-foreground", collapsed && "justify-center px-0 py-2")}>
            {collapsed ? "Free" : "Free plan"}
          </Badge>
          {!collapsed ? (
            <p className="mt-3 text-sm text-sidebar-muted">
              Upgrade later for unlimited wallets, AI insights, and advanced analytics.
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
