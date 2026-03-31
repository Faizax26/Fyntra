"use client";

import Link from "next/link";
import { Bell, Menu, Search, Settings2 } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useSidebar } from "@/components/providers/sidebar-provider";
import type { NotificationItem, User } from "@/lib/types";

export function Topbar({ notifications, user }: { notifications: NotificationItem[]; user: User }) {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/68 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 px-4 py-4 lg:px-4 xl:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="size-4" />
            </Button>
            <div className="space-y-1">
              <p className="eyebrow">Welcome Back</p>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.04em]">{user.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-11 w-[260px] rounded-full border-border/70 bg-[color:var(--surface-1)] pl-11 pr-16 lg:w-[300px]" placeholder="Cari transaksi, wallet, goal..." />
              <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-border/70 bg-background/60 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground lg:inline-flex">
                ⌘K
              </span>
            </div>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative bg-[color:var(--surface-1)]">
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((item) => (
                  <DropdownMenuItem key={item.id} className="flex flex-col items-start gap-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.body}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-border/70 bg-[color:var(--surface-1)] p-1 shadow-sm">
                  <Avatar className="size-9">
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/app/settings">
                    <Settings2 className="size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Logout demo</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 rounded-full border-border/70 bg-[color:var(--surface-1)] pl-11 pr-4" placeholder="Cari transaksi, wallet, goal..." />
          </div>
        </div>
      </div>
    </header>
  );
}
