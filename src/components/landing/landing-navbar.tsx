"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" }
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-white/70 bg-background/82 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl"
            : "border-white/50 bg-background/52 backdrop-blur-md"
        )}
      >
        <Logo href="/" className="shrink-0" />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost">
            <Link href="/app/dashboard">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/app/dashboard">Get Started</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="border-l border-border/70 bg-background/95 px-6 py-20 backdrop-blur-xl">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex h-full flex-col">
              <Logo href="/" />
              <div className="mt-10 grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-foreground transition hover:border-border hover:bg-muted/60"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto grid gap-3">
                <Button asChild variant="ghost" className="justify-center">
                  <Link href="/app/dashboard">Login</Link>
                </Button>
                <Button asChild className="justify-center">
                  <Link href="/app/dashboard">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
