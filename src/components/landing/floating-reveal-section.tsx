"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { BrainCircuit, ShieldCheck, Sparkles, Target, TrendingUp, Wallet2 } from "lucide-react";

import { useLandingSectionProgress } from "@/components/landing/landing-hooks";
import { LandingReveal } from "@/components/landing/landing-motion";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FloatingRevealSection() {
  const { ref, scrollYProgress } = useLandingSectionProgress<HTMLElement>(["start end", "end start"]);

  const layerOneY = useTransform(scrollYProgress, [0, 1], [36, -28]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const layerThreeY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section id="reveal" ref={ref} className="landing-section relative overflow-hidden">
      <LandingReveal className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Floating reveal</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-5xl">
          The product assembles itself in layers.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Rather than throwing a dashboard at the screen, Fyntra reveals the system piece by piece: balance, movement,
          intelligence, and the actions that tie them together.
        </p>
      </LandingReveal>

      <div className="relative mx-auto mt-14 max-w-6xl">
        <div className="pointer-events-none absolute inset-x-[14%] top-[20%] h-[22rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.16),transparent_64%)] blur-[110px]" />
        <div className="pointer-events-none absolute left-[22%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-[20%] top-[30%] h-[14rem] w-[14rem] rounded-full bg-sky-400/10 blur-[90px]" />

        <div className="grid gap-4 lg:hidden">
          <RevealCard className="p-5">
            <WalletBalanceCard />
          </RevealCard>
          <RevealCard className="p-5">
            <AnalyticsCard />
          </RevealCard>
          <RevealCard className="p-5">
            <TransactionsCard />
          </RevealCard>
          <RevealCard className="p-5">
            <AiCard />
          </RevealCard>
          <RevealCard className="p-5">
            <GoalsCard />
          </RevealCard>
        </div>

        <div className="relative hidden min-h-[42rem] lg:block">
          <motion.div style={{ y: layerOneY }} className="absolute left-[6%] top-[8%] w-[22rem]">
            <RevealCard className="p-5" delay={0.12}>
              <WalletBalanceCard />
            </RevealCard>
          </motion.div>

          <motion.div style={{ y: layerTwoY }} className="absolute right-[8%] top-[4%] w-[19rem]">
            <RevealCard className="p-5" delay={0.22}>
              <AnalyticsCard />
            </RevealCard>
          </motion.div>

          <motion.div style={{ y: layerThreeY }} className="absolute left-[18%] top-[48%] w-[20rem]">
            <RevealCard className="p-5" delay={0.32}>
              <TransactionsCard />
            </RevealCard>
          </motion.div>

          <motion.div style={{ y: layerOneY }} className="absolute right-[18%] top-[46%] w-[18rem]">
            <RevealCard className="p-5" delay={0.42}>
              <AiCard />
            </RevealCard>
          </motion.div>

          <motion.div style={{ y: layerTwoY }} className="absolute left-[44%] top-[22%] w-[17rem] -translate-x-1/2">
            <RevealCard className="p-5" delay={0.52}>
              <GoalsCard />
            </RevealCard>
          </motion.div>

          <motion.div style={{ y: layerThreeY }} className="pointer-events-none absolute left-[39%] top-[58%] w-[18rem] -translate-x-1/2">
            <RevealCard className="p-4" delay={0.62}>
              <TrustCard />
            </RevealCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RevealCard({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38, scale: 0.94, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "landing-surface rounded-[2rem] border border-border/70 bg-card/70 shadow-[0_28px_70px_-44px_rgba(56,87,255,0.28)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function WalletBalanceCard() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Balance system</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {formatCurrency(dashboardSnapshot.metrics[0].value)}
          </p>
        </div>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Wallet2 className="size-5" />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {dashboardSnapshot.wallets.slice(0, 4).map((wallet) => (
          <div key={wallet.id} className="rounded-2xl border border-border/70 bg-background/62 px-4 py-3">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{wallet.name}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{formatCompactCurrency(wallet.balance)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsCard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Analytics strip</p>
          <p className="mt-2 text-sm text-muted-foreground">Trend clarity without clutter.</p>
        </div>
        <TrendingUp className="size-5 text-primary" />
      </div>
      <div className="mt-6 flex h-28 items-end gap-2">
        {[38, 52, 46, 68, 82, 74].map((height, index) => (
          <div
            key={height}
            className={cn(
              "flex-1 rounded-full bg-gradient-to-t from-primary to-indigo-300",
              index > 3 && "from-sky-400 to-primary"
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function TransactionsCard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Movement log</p>
          <p className="mt-2 text-sm text-muted-foreground">Every inflow and outflow stays attached to context.</p>
        </div>
        <Sparkles className="size-5 text-primary" />
      </div>
      <div className="mt-5 space-y-2.5">
        {dashboardSnapshot.transactions.map((transaction) => (
          <div key={transaction.id} className="rounded-2xl border border-border/70 bg-background/62 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{transaction.category}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">{formatCompactCurrency(transaction.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiCard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">AI recommendation</p>
          <p className="mt-2 text-sm text-muted-foreground">Signal over noise, delivered at the right moment.</p>
        </div>
        <BrainCircuit className="size-5 text-primary" />
      </div>
      <div className="mt-6 rounded-[1.6rem] border border-primary/14 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(168,85,247,0.08))] p-4">
        <p className="text-sm leading-7 text-foreground">
          Dining and utilities are accelerating faster than planned. Trimming one recurring expense restores your
          savings pace this month.
        </p>
      </div>
    </div>
  );
}

function GoalsCard() {
  const goal = dashboardSnapshot.goals[0];
  const progress = Math.round((goal.current / goal.target) * 100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Goal focus</p>
          <p className="mt-2 text-sm text-muted-foreground">{goal.name}</p>
        </div>
        <Target className="size-5 text-primary" />
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-foreground">{progress}%</p>
      <div className="mt-4 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {formatCompactCurrency(goal.current)} of {formatCompactCurrency(goal.target)}
      </p>
    </div>
  );
}

function TrustCard() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">Secure by design</p>
          <p className="mt-1 text-xs text-muted-foreground">Audit logs, privacy-first defaults, and optional 2FA.</p>
        </div>
      </div>
    </div>
  );
}
