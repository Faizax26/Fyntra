"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "Rp 0",
    label: "For a calm starting point",
    description: "Track the essentials, understand your money movement, and build confidence without friction.",
    features: ["Wallet and transaction tracking", "Core budgets and goals", "Monthly analytics snapshots"],
    cta: "Start free",
    href: "/app/dashboard",
    featured: false
  },
  {
    name: "Premium",
    price: "Rp 89K",
    label: "For deeper control",
    description: "Unlock richer signals, unlimited visibility, and the AI guidance that turns momentum into action.",
    features: ["Unlimited wallets and categories", "Advanced analytics and trends", "AI insights and recommendations"],
    cta: "Unlock premium",
    href: "/app/dashboard",
    featured: true
  }
] as const;

export function PricingRevealSection() {
  return (
    <section id="pricing" className="landing-section relative py-24 sm:py-28">
      <LandingReveal className="mx-auto max-w-3xl text-center">
        <Badge className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">Launch pricing</Badge>
        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-5xl">
          Simple plans, revealed like a product release.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Start with the core system for free. Upgrade when you want the deeper visibility and AI-led decisions that
          make Fyntra feel indispensable.
        </p>
      </LandingReveal>

      <LandingStagger className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr]" stagger={0.12}>
        {plans.map((plan) => (
          <LandingMotionItem key={plan.name} y={20} className={plan.featured ? "lg:pt-3" : undefined}>
            <motion.div
              whileHover={{ y: -8, scale: plan.featured ? 1.02 : 1.01 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "landing-surface relative h-full overflow-hidden rounded-[2.2rem] border p-7 sm:p-8",
                plan.featured
                  ? "border-primary/28 bg-[linear-gradient(165deg,rgba(56,87,255,0.16),rgba(7,12,24,0.96)_46%,rgba(56,189,248,0.08))] shadow-[0_34px_96px_-48px_rgba(56,87,255,0.44)]"
                  : "border-border/70 bg-card/58 shadow-[0_24px_70px_-48px_rgba(9,17,31,0.76)]"
              )}
            >
              {plan.featured ? (
                <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent" />
              ) : null}
              {plan.featured ? (
                <div className="absolute right-6 top-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Most complete
                </div>
              ) : null}

              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{plan.label}</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-foreground">{plan.name}</h3>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.08em] text-foreground">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{plan.featured ? "/ month" : "/ always"}</span>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.12 + featureIndex * 0.06 }}
                    className="flex items-start gap-3 rounded-[1.2rem] border border-border/60 bg-background/54 px-4 py-4"
                  >
                    <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>
                    <p className="text-sm leading-7 text-foreground">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className={cn(
                    "h-12 rounded-full px-6 text-sm",
                    plan.featured ? "landing-cta-primary text-primary-foreground" : "bg-foreground text-background hover:bg-foreground/92"
                  )}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                {plan.featured ? (
                  <Button asChild variant="outline" className="landing-cta-secondary h-12 rounded-full border-border/70 bg-background/68 px-6 text-sm">
                    <Link href="#faq">
                      <Sparkles className="size-4" />
                      Why premium works
                    </Link>
                  </Button>
                ) : null}
              </div>
            </motion.div>
          </LandingMotionItem>
        ))}
      </LandingStagger>

      <LandingReveal className="mx-auto mt-8 max-w-5xl">
        <div className="grid gap-3 rounded-[1.8rem] border border-border/70 bg-card/48 p-4 text-sm text-muted-foreground sm:grid-cols-3 sm:p-5">
          <div className="rounded-[1.2rem] border border-border/60 bg-background/54 px-4 py-3">No setup fee. No lock-in.</div>
          <div className="rounded-[1.2rem] border border-border/60 bg-background/54 px-4 py-3">Switch plans whenever your workflow changes.</div>
          <div className="rounded-[1.2rem] border border-border/60 bg-background/54 px-4 py-3">Built for individuals who want clarity before complexity.</div>
        </div>
      </LandingReveal>
    </section>
  );
}
