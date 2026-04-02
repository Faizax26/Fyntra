"use client";

import { Logo } from "@/components/brand/logo";
import { AppSidebarNav } from "@/components/layout/app-sidebar";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="surface-shell border-white/10 text-sidebar-foreground">
        <div className="sr-only">
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>Primary application navigation for Fyntra.</SheetDescription>
        </div>
        <div className="flex h-full flex-col px-4 pb-6 pt-5">
          <Logo compact={false} className="text-sidebar-foreground [&_span:last-child]:text-sidebar-foreground" />
          <div className="mt-6 flex-1">
            <AppSidebarNav mobile onNavigate={() => onOpenChange(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
