import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";

const productLinks = [
  { href: "#reveal", label: "Floating reveal" },
  { href: "#sequence", label: "Story sequence" },
  { href: "#pricing", label: "Pricing" }
] as const;

const companyLinks = [
  { href: "#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
] as const;

const socialLinks = [
  { href: "mailto:hello@fyntra.app", label: "Email" },
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://x.com", label: "X" }
] as const;

export function LandingFooter() {
  return (
    <footer className="relative px-4 pb-10 pt-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(56,87,255,0.08),transparent)] dark:bg-[linear-gradient(180deg,rgba(56,87,255,0.14),transparent)]" />

      <LandingReveal className="mx-auto max-w-7xl">
        <div className="landing-surface rounded-[2.4rem] border border-border/70 px-6 py-8 sm:px-8 sm:py-10">
          <LandingStagger className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]" stagger={0.08}>
            <LandingMotionItem>
              <div className="max-w-md">
                <Logo href="/" />
                <p className="mt-6 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
                  A calmer operating system for personal finance.
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Cinematic on the outside, precise where it matters. Fyntra brings money movement, insight, and action
                  into one premium workspace.
                </p>
              </div>
            </LandingMotionItem>

            <LandingMotionItem>
              <FooterColumn title="Product" links={productLinks} />
            </LandingMotionItem>

            <LandingMotionItem>
              <FooterColumn title="Company" links={companyLinks} />
            </LandingMotionItem>

            <LandingMotionItem>
              <FooterColumn title="Social" links={socialLinks} external />
            </LandingMotionItem>
          </LandingStagger>

          <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Fyntra. Built for clarity, composure, and better financial decisions.</p>
            <p>Dark-first by default. Designed to feel like a product reveal, not a template.</p>
          </div>
        </div>
      </LandingReveal>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external = false
}: {
  title: string;
  links: readonly { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">{title}</p>
      <div className="mt-5 grid gap-3">
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
