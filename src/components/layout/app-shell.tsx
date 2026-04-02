"use client";

import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Topbar } from "@/components/layout/topbar";
import { useSidebar } from "@/components/providers/sidebar-provider";

export function AppShell({ children }: { children: ReactNode }) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[auto_1fr]">
      <AppSidebar />
      <div className="min-w-0">
        <Topbar onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </div>
  );
}
