"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#reveal", label: "Reveal" },
  { href: "#sequence", label: "Story" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" }
] as const;

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        data-scrolled={scrolled}
        className={cn(
          "landing-nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-border/80 bg-background/78 shadow-[0_26px_72px_-44px_rgba(2,8,23,0.86)] backdrop-blur-2xl"
            : "border-border/60 bg-background/54 shadow-[0_18px_48px_-36px_rgba(2,8,23,0.72)] backdrop-blur-xl"
        )}
      >
        <Logo href="/" className="shrink-0" />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/80 via-sky-300/80 to-transparent transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle compact={false} className="h-11 px-4" />
          <Button asChild variant="ghost" className="rounded-full px-5 text-foreground/82 hover:bg-background/72 hover:text-foreground">
            <Link href="/app/dashboard">Log in</Link>
          </Button>
          <Button asChild className="landing-cta-primary rounded-full px-5 text-primary-foreground">
            <Link href="/app/dashboard">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="size-11" />
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground shadow-[0_16px_36px_-26px_rgba(2,8,23,0.66)] backdrop-blur-xl"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="border-l border-border/70 bg-background/94 px-6 py-20 backdrop-blur-2xl">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex h-full flex-col">
                <Logo href="/" />
                <div className="mt-12 grid gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[1.4rem] border border-transparent px-4 py-4 text-base font-medium text-foreground transition hover:border-border hover:bg-card/62"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto grid gap-3">
                  <Button asChild variant="ghost" className="justify-center rounded-full">
                    <Link href="/app/dashboard">Log in</Link>
                  </Button>
                  <Button asChild className="landing-cta-primary justify-center rounded-full">
                    <Link href="/app/dashboard">
                      Get Started
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
