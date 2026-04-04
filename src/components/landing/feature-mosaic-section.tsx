"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards
} from "lucide-react";

import { LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { formatCompactCurrency } from "@/lib/format";
import { dashboardSnapshot } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const mosaicEase = [0.22, 1, 0.36, 1] as const;

export function FeatureMosaicSection() {
  const goals = dashboardSnapshot.goals.slice(0, 2);

  return (
    <section id="features" className="landing-section relative py-24 sm:py-28">
      <LandingReveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Feature mosaic</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-5xl">
          Capability, arranged like a product story instead of a template.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Each card isolates one part of the system: composure, visibility, intelligence, and the controls that keep
          money movement trustworthy.
        </p>
      </LandingReveal>

      <LandingStagger className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-12" stagger={0.1}>
        <MosaicCard className="lg:col-span-7 lg:min-h-[28rem]">
          <div className="flex h-full flex-col justify-between">
            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Budgets that stay calm</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                Guardrails that feel composed, not punitive.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Fyntra turns category budgets into a live calmness layer, so pressure points are obvious before they
                become stressful.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {dashboardSnapshot.budgets.map((budget, index) => {
                const progress = Math.min(100, Math.round((budget.spent / budget.limit) * 100));

                return (
                  <motion.div
                    key={budget.id}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 8 + index,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    className="rounded-[1.55rem] border border-border/60 bg-background/62 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{budget.category}</p>
                      <span className="text-sm font-semibold text-foreground">{progress}%</span>
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary via-sky-400 to-violet-400" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {formatCompactCurrency(budget.spent)} of {formatCompactCurrency(budget.limit)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </MosaicCard>

        <MosaicCard className="lg:col-span-5 lg:min-h-[28rem]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BrainCircuit className="size-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">AI nudges</p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                Advice that lands like a trusted operator.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Short, high-confidence suggestions show up only when they can shift the month in a measurable way.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {[
                "Dining is climbing faster than forecast.",
                "One lower weekly cap restores your savings pace.",
                "Goal transfers can increase without touching rent or utilities."
              ].map((item, index) => (
                <motion.div
                  key={item}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 7 + index,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.25
                  }}
                  className="rounded-[1.4rem] border border-primary/14 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(168,85,247,0.08))] px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 size-4 text-primary" />
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </MosaicCard>

        <MosaicCard className="lg:col-span-4 lg:min-h-[20rem]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <WalletCards className="size-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Multi-wallet visibility</p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                See every balance as one coordinated layer.
              </h3>
            </div>

            <div className="mt-8 grid gap-3">
              {dashboardSnapshot.wallets.slice(0, 3).map((wallet) => (
                <div key={wallet.id} className="rounded-[1.3rem] border border-border/60 bg-background/62 px-4 py-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{wallet.type}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{wallet.name}</p>
                    <p className="text-sm font-semibold text-foreground">{formatCompactCurrency(wallet.balance)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MosaicCard>

        <MosaicCard className="lg:col-span-4 lg:min-h-[20rem]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <TrendingUp className="size-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cashflow intelligence</p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                Follow momentum instead of scanning tables.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Income and expense movement becomes one readable rhythm with just enough detail.
              </p>
            </div>

            <div className="mt-10 flex h-32 items-end gap-2">
              {dashboardSnapshot.cashflow.map((month, index) => (
                <motion.div
                  key={month.month}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 6 + index * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.12
                  }}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="flex h-24 w-full items-end gap-1">
                    <div className="w-full rounded-full bg-gradient-to-t from-primary to-indigo-300" style={{ height: `${month.income * 8}%` }} />
                    <div className="w-full rounded-full bg-gradient-to-t from-sky-400/80 to-cyan-300" style={{ height: `${month.expense * 8}%` }} />
                  </div>
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{month.month}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </MosaicCard>

        <MosaicCard className="lg:col-span-4 lg:min-h-[20rem]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="size-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Goal tracking</p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                Progress stays tangible, even across multiple targets.
              </h3>
            </div>

            <div className="mt-8 space-y-4">
              {goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100);

                return (
                  <div key={goal.id} className="rounded-[1.3rem] border border-border/60 bg-background/62 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{goal.name}</p>
                      <p className="text-sm font-semibold text-foreground">{progress}%</p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary via-sky-400 to-violet-400" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MosaicCard>

        <MosaicCard className="lg:col-span-12 lg:min-h-[18rem]">
          <div className="grid h-full gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-lg">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Privacy-first controls</p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                Trust is designed into the product surface, not hidden in a policy page.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Audit trails, multi-account visibility, optional 2FA, and consent-aware data access all live in the same
                refined control layer.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Fingerprint, title: "Audit visibility", body: "Every sensitive change stays traceable." },
                { icon: ShieldCheck, title: "Secure by design", body: "Low-noise controls with clear protection." },
                { icon: BrainCircuit, title: "Smart but private", body: "Insights respect the limits you set." }
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: mosaicEase }}
                    className="rounded-[1.45rem] border border-border/60 bg-background/62 p-5"
                  >
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-5 text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    <motion.div
                      animate={{ opacity: [0.42, 0.8, 0.42] }}
                      transition={{ duration: 5 + index, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="mt-5 h-px bg-gradient-to-r from-primary/70 to-transparent"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </MosaicCard>
      </LandingStagger>
    </section>
  );
}

function MosaicCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.32, ease: mosaicEase }}
      className={cn(
        "landing-surface relative overflow-hidden rounded-[2rem] border border-border/70 p-6 shadow-[0_28px_82px_-48px_rgba(56,87,255,0.24)] sm:p-7",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
      {children}
    </motion.div>
  );
}
