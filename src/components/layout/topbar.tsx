"use client";

import Link from "next/link";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { demoUser, getPageMeta } from "@/lib/mock-data";

export function Topbar({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const pathname = usePathname();
  const pageMeta = getPageMeta(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button aria-label="Open navigation" variant="outline" size="icon" className="lg:hidden" onClick={onOpenMobileNav}>
              <Menu className="size-4" />
            </Button>
            <div>
              <p className="eyebrow">Workspace overview</p>
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">{pageMeta.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{pageMeta.subtitle}</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative w-[320px] lg:w-[360px]">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions, wallets, or goals" className="pl-11 pr-4" />
            </div>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Open notifications" variant="outline" size="icon" className="relative">
                  <Bell className="size-4" />
                  <span className="absolute right-3 top-3 size-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {demoUser.notifications.map((item) => (
                  <DropdownMenuItem key={item.id} className="flex flex-col items-start gap-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.body}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-border/70 bg-background/70 p-1 shadow-sm">
                  <Avatar>
                    <AvatarFallback>{demoUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{demoUser.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{demoUser.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/app/settings">Go to settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-between">
                  <span>Plan</span>
                  <Badge className="bg-primary/12 text-primary">{demoUser.plan}</Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search your finances" className="pl-11" />
          </div>
          <Button variant="outline" size="icon">
            <Sparkles className="size-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
