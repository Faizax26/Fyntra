"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet2
} from "lucide-react";

import { useLandingSectionProgress } from "@/components/landing/landing-hooks";
import { LandingReveal } from "@/components/landing/landing-motion";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { dashboardSnapshot } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const storySteps = [
  {
    id: "capture",
    label: "Step 01",
    title: "Capture every money movement without the clutter.",
    body: "Wallets, balances, and fresh activity arrive in one quiet overview so the full picture lands instantly."
  },
  {
    id: "analyze",
    label: "Step 02",
    title: "Turn patterns into signals worth acting on.",
    body: "Fyntra surfaces trends, pressure points, and AI-backed summaries so you notice the right change early."
  },
  {
    id: "act",
    label: "Step 03",
    title: "Move from insight to action with clear next steps.",
    body: "Goals, nudges, and recommended moves keep progress tangible, not theoretical."
  }
] as const;

const sceneEase = [0.22, 1, 0.36, 1] as const;

export function StorySequenceSection() {
  const { ref, scrollYProgress } = useLandingSectionProgress<HTMLDivElement>(["start start", "end end"]);
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveStep(0);
      return;
    }

    if (latest < 0.68) {
      setActiveStep(1);
      return;
    }

    setActiveStep(2);
  });

  const frameY = useTransform(scrollYProgress, [0, 1], [36, -42]);
  const frameScale = useTransform(scrollYProgress, [0, 0.18], [0.94, 1]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  const captureOpacity = useTransform(scrollYProgress, [0, 0.1, 0.26, 0.36], [0.34, 1, 1, 0]);
  const captureScale = useTransform(scrollYProgress, [0, 0.18, 0.36], [0.94, 1, 0.97]);
  const captureY = useTransform(scrollYProgress, [0, 0.3, 0.4], [42, 0, -24]);
  const captureBlur = useTransform(scrollYProgress, [0, 0.26, 0.36], ["blur(18px)", "blur(0px)", "blur(18px)"]);

  const analyzeOpacity = useTransform(scrollYProgress, [0.26, 0.4, 0.58, 0.72], [0, 1, 1, 0]);
  const analyzeScale = useTransform(scrollYProgress, [0.28, 0.48, 0.72], [0.95, 1, 0.97]);
  const analyzeY = useTransform(scrollYProgress, [0.24, 0.5, 0.74], [34, 0, -22]);
  const analyzeBlur = useTransform(scrollYProgress, [0.26, 0.42, 0.72], ["blur(18px)", "blur(0px)", "blur(18px)"]);

  const actOpacity = useTransform(scrollYProgress, [0.58, 0.76, 1], [0, 1, 1]);
  const actScale = useTransform(scrollYProgress, [0.58, 0.8, 1], [0.95, 1, 1]);
  const actY = useTransform(scrollYProgress, [0.58, 0.82, 1], [28, 0, -14]);
  const actBlur = useTransform(scrollYProgress, [0.58, 0.8, 1], ["blur(18px)", "blur(0px)", "blur(0px)"]);

  return (
    <section id="sequence" className="landing-section relative py-24 sm:py-28 lg:py-32">
      <LandingReveal className="mx-auto max-w-3xl text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Guided product film</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-5xl">
          One sticky sequence. Three precise moments. Zero wasted motion.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Scroll and the workspace shifts from capture to analysis to action, like a product demo directed with intent
          instead of stitched together from screenshots.
        </p>
      </LandingReveal>

      <div ref={ref} className="relative mx-auto mt-14 max-w-7xl lg:h-[260vh]">
        <div className="grid gap-8 lg:sticky lg:top-24 lg:h-[calc(100svh-7rem)] lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12">
          <div className="hidden lg:block">
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 h-[24rem] w-px rounded-full bg-border/70">
                <motion.div
                  className="origin-top rounded-full bg-gradient-to-b from-primary via-sky-400 to-violet-400"
                  style={{ scaleY: progressScale, height: "100%" }}
                />
              </div>

              <div className="space-y-7">
                {storySteps.map((step, index) => {
                  const isActive = activeStep === index;

                  return (
                    <motion.div
                      key={step.id}
                      animate={{ opacity: isActive ? 1 : 0.48, x: isActive ? 0 : -10 }}
                      transition={{ duration: 0.45, ease: sceneEase }}
                      className={cn("rounded-[1.8rem] border px-5 py-5", isActive ? "border-primary/24 bg-card/72 shadow-[0_24px_54px_-40px_rgba(56,87,255,0.42)]" : "border-border/60 bg-card/42")}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{step.label}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div style={{ y: frameY, scale: frameScale }} className="relative">
            <div className="pointer-events-none absolute -left-8 top-12 hidden h-36 w-36 rounded-full bg-primary/16 blur-[90px] lg:block" />
            <div className="pointer-events-none absolute -right-4 top-20 hidden h-40 w-40 rounded-full bg-sky-400/14 blur-[100px] lg:block" />
            <div className="pointer-events-none absolute bottom-6 left-1/3 hidden h-32 w-32 rounded-full bg-violet-500/12 blur-[90px] lg:block" />

            <div className="landing-surface relative overflow-hidden rounded-[2.25rem] border border-border/70 p-3 shadow-[0_44px_120px_-54px_rgba(9,17,31,0.78)]">
              <div className="flex items-center justify-between rounded-[1.5rem] border border-border/70 bg-background/84 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2f]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="rounded-full border border-border/70 bg-muted/40 px-4 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Fyntra product sequence
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Live UI</div>
              </div>

              <div className="relative mt-3 min-h-[31rem] overflow-hidden rounded-[1.9rem] border border-border/70 bg-[radial-gradient(circle_at_top,rgba(119,144,255,0.16),transparent_28%),linear-gradient(180deg,rgba(14,22,39,0.96),rgba(7,12,24,0.98))] p-5 sm:min-h-[34rem] sm:p-6">
                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: captureOpacity, scale: captureScale, y: captureY, filter: captureBlur }}
                >
                  <CaptureScene active={activeStep === 0} />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: analyzeOpacity, scale: analyzeScale, y: analyzeY, filter: analyzeBlur }}
                >
                  <AnalyzeScene active={activeStep === 1} />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: actOpacity, scale: actScale, y: actY, filter: actBlur }}
                >
                  <ActScene active={activeStep === 2} />
                </motion.div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:hidden">
              {storySteps.map((step, index) => (
                <div key={step.id} className="rounded-[1.8rem] border border-border/70 bg-card/58 px-5 py-5 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{step.label}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Scene {index + 1}
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CaptureScene({ active }: { active: boolean }) {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.14fr_0.86fr]">
      <div className="space-y-4">
        <SceneCard active={active} delay={0} className="min-h-[14rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Capture</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-foreground">
                {formatCurrency(dashboardSnapshot.metrics[0].value)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">All balances, centered into one calm read.</p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Wallet2 className="size-5" />
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {dashboardSnapshot.wallets.slice(0, 4).map((wallet, index) => (
              <SceneCard
                key={wallet.id}
                active={active}
                delay={0.08 + index * 0.06}
                className="rounded-[1.35rem] border-border/60 bg-background/62 px-4 py-4"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{wallet.name}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{formatCompactCurrency(wallet.balance)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{wallet.type}</p>
              </SceneCard>
            ))}
          </div>
        </SceneCard>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Inflow", formatCompactCurrency(dashboardSnapshot.metrics[1].value)],
            ["Outflow", formatCompactCurrency(dashboardSnapshot.metrics[2].value)],
            ["Wallets", `${dashboardSnapshot.wallets.length} connected`]
          ].map(([label, value], index) => (
            <SceneCard
              key={label}
              active={active}
              delay={0.18 + index * 0.06}
              className="rounded-[1.35rem] border-border/60 bg-background/60 px-4 py-4"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
            </SceneCard>
          ))}
        </div>
      </div>

      <SceneCard active={active} delay={0.12} className="min-h-[22rem]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recent movement</p>
            <p className="mt-2 text-sm text-muted-foreground">List items step into place with context intact.</p>
          </div>
          <Sparkles className="size-5 text-primary" />
        </div>

        <div className="mt-5 space-y-3">
          {dashboardSnapshot.transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              animate={{
                opacity: active ? 1 : 0.45,
                y: active ? 0 : 16
              }}
              transition={{ duration: 0.55, ease: sceneEase, delay: 0.12 + index * 0.08 }}
              className="rounded-[1.35rem] border border-border/60 bg-background/60 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{transaction.category}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{formatCompactCurrency(transaction.amount)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SceneCard>
    </div>
  );
}

function AnalyzeScene({ active }: { active: boolean }) {
  const insights = [
    "Dining is pacing 11% ahead of plan.",
    "Utilities stabilized after a higher first week.",
    "Goal transfers are outperforming last month."
  ];

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
      <SceneCard active={active} delay={0.02} className="min-h-[23rem]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Analyze</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">Patterns become legible.</h3>
          </div>
          <TrendingUp className="size-5 text-primary" />
        </div>

        <div className="mt-7 rounded-[1.5rem] border border-border/60 bg-background/58 p-5">
          <div className="flex h-52 items-end gap-3">
            {dashboardSnapshot.cashflow.map((item, index) => (
              <motion.div
                key={item.month}
                animate={{
                  opacity: active ? 1 : 0.4,
                  y: active ? 0 : 14
                }}
                transition={{ duration: 0.65, ease: sceneEase, delay: 0.08 + index * 0.06 }}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div className="flex h-40 w-full items-end gap-1.5">
                  <motion.div
                    animate={{ height: active ? `${item.income * 8.5}%` : "24%" }}
                    transition={{ duration: 0.7, ease: sceneEase, delay: 0.14 + index * 0.04 }}
                    className="w-full rounded-full bg-gradient-to-t from-primary to-indigo-300"
                  />
                  <motion.div
                    animate={{ height: active ? `${item.expense * 8.5}%` : "18%" }}
                    transition={{ duration: 0.7, ease: sceneEase, delay: 0.2 + index * 0.04 }}
                    className="w-full rounded-full bg-gradient-to-t from-sky-400/70 to-cyan-300"
                  />
                </div>
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{item.month}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SceneCard>

      <div className="space-y-4">
        <SceneCard active={active} delay={0.16}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">AI signals</p>
              <p className="mt-2 text-sm text-muted-foreground">Summaries appear with quiet priority.</p>
            </div>
            <BrainCircuit className="size-5 text-primary" />
          </div>

          <div className="mt-5 space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={insight}
                animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 18 }}
                transition={{ duration: 0.55, ease: sceneEase, delay: 0.16 + index * 0.08 }}
                className="rounded-[1.25rem] border border-primary/14 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(168,85,247,0.08))] px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </span>
                  <p className="text-sm leading-7 text-foreground">{insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SceneCard>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Budget variance", "+4.8%"],
            ["Savings pace", "On track"],
            ["Cashflow confidence", "High"],
            ["Noise removed", "17 alerts filtered"]
          ].map(([label, value], index) => (
            <SceneCard
              key={label}
              active={active}
              delay={0.24 + index * 0.05}
              className="rounded-[1.25rem] border-border/60 bg-background/60 px-4 py-4"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
            </SceneCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActScene({ active }: { active: boolean }) {
  const goals = dashboardSnapshot.goals.slice(0, 2);

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <SceneCard active={active} delay={0.04}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Act</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">The next move is already framed.</h3>
            </div>
            <Target className="size-5 text-primary" />
          </div>

          <div className="mt-6 space-y-4">
            {goals.map((goal, index) => {
              const progress = Math.round((goal.current / goal.target) * 100);

              return (
                <motion.div
                  key={goal.id}
                  animate={{ opacity: active ? 1 : 0.42, y: active ? 0 : 14 }}
                  transition={{ duration: 0.6, ease: sceneEase, delay: 0.12 + index * 0.08 }}
                  className="rounded-[1.4rem] border border-border/60 bg-background/60 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{goal.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatCompactCurrency(goal.current)} of {formatCompactCurrency(goal.target)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{progress}%</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-muted">
                    <motion.div
                      animate={{ width: active ? `${progress}%` : "18%" }}
                      transition={{ duration: 0.7, ease: sceneEase, delay: 0.18 + index * 0.08 }}
                      className="h-2 rounded-full bg-gradient-to-r from-primary via-sky-400 to-violet-400"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SceneCard>

        <SceneCard active={active} delay={0.18} className="rounded-[1.4rem] border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(56,189,248,0.08),rgba(168,85,247,0.08))]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recommended move</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-foreground">
                Shift Rp 350K into your emergency fund this week.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The savings pace stays on schedule and dining remains inside your target range.
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </SceneCard>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Quiet recommendations",
            body: "Suggested actions appear only when the benefit is clear and the timing is right.",
            icon: CheckCircle2
          },
          {
            title: "Privacy guardrails",
            body: "Every action sits behind audit logs, consent-aware controls, and optional 2FA.",
            icon: ShieldCheck
          }
        ].map((card, index) => {
          const Icon = card.icon;

          return (
            <SceneCard key={card.title} active={active} delay={0.16 + index * 0.1}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">{card.title}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
              </div>
            </SceneCard>
          );
        })}
      </div>
    </div>
  );
}

function SceneCard({
  active,
  children,
  className,
  delay = 0
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.62,
        y: active ? 0 : 18,
        boxShadow: active ? "0 24px 60px -42px rgba(56,87,255,0.34)" : "0 18px 44px -38px rgba(9,17,31,0.54)"
      }}
      transition={{ duration: 0.62, ease: sceneEase, delay }}
      className={cn("rounded-[1.65rem] border border-border/70 bg-background/54 p-5 backdrop-blur-xl", className)}
    >
      {children}
    </motion.div>
  );
}
