import Link from "next/link";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { Logo } from "@/components/brand/logo";

const pageLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" }
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

const socialLinks = [
  { href: "mailto:hello@fyntra.app", label: "Email" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.linkedin.com", label: "LinkedIn" }
];

export function LandingFooter() {
  return (
    <footer className="relative border-t border-border/70 px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(56,87,255,0.08),transparent)] dark:bg-[linear-gradient(180deg,rgba(56,87,255,0.1),transparent)]" />
      <LandingReveal className="mx-auto max-w-7xl">
        <LandingStagger className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]" stagger={0.08}>
          <LandingMotionItem>
            <div>
              <Logo href="/" />
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                A calm, modern finance workspace for budgets, wallets, goals, and the decisions that move money forward.
              </p>
            </div>
          </LandingMotionItem>
          <LandingMotionItem>
            <FooterLinkGroup title="Product" links={pageLinks} />
          </LandingMotionItem>
          <LandingMotionItem>
            <FooterLinkGroup title="Legal" links={legalLinks} />
          </LandingMotionItem>
          <LandingMotionItem>
            <FooterLinkGroup title="Social" links={socialLinks} external />
          </LandingMotionItem>
        </LandingStagger>
      </LandingReveal>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 Fyntra. Built for personal finance clarity.</p>
        <p>Dashboard-grade UI, now on the front door.</p>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
  external = false
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{title}</p>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
