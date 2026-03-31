import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/lib/navigation";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <Logo className="shrink-0" />
          <nav className="hidden items-center gap-6 md:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Start free</Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-border/70 bg-linear-to-b from-transparent to-[color:var(--surface-2)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.9fr] lg:px-8">
          <div className="space-y-4">
            <Logo className="items-start" />
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              fyntra. membantu pengguna awam memahami cashflow, budget, asset, debt, dan security account dalam satu dashboard yang terasa ringan.
            </p>
            <p className="text-sm text-muted-foreground">support@fyntra.com</p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-1)]"><Instagram className="size-4" /></div>
              <div className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-1)]"><Twitter className="size-4" /></div>
              <div className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-1)]"><Linkedin className="size-4" /></div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-foreground">Product</p>
            <Link href="/features" className="block text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="block text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/faq" className="block text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-foreground">Legal & Support</p>
            <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/app/help" className="block text-muted-foreground hover:text-foreground">
              Help Center
            </Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-foreground">Account</p>
            <Link href="/login" className="block text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/register" className="block text-muted-foreground hover:text-foreground">
              Signup
            </Link>
            <Link href="/forgot-password" className="block text-muted-foreground hover:text-foreground">
              Forgot Password
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-border/60 px-4 py-5 text-sm text-muted-foreground lg:px-8">
          <p>© {currentYear} fyntra. All rights reserved.</p>
          <p>Built for clear personal finance.</p>
        </div>
      </footer>
    </div>
  );
}
