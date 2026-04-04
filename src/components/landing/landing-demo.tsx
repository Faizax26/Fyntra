"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BrainCircuit, CalendarRange, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

import { LandingReveal } from "@/components/landing/landing-motion";
import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Badge } from "@/components/ui/badge";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type DemoScene = "capture" | "analyze" | "act";

const scenes: {
  id: DemoScene;
  eyebrow: string;
  title: string;
  description: string;
}[] = [
  {
    id: "capture",
    eyebrow: "Capture",
    title: "Track every movement without losing context",
    description: "Balances, wallets, and daily activity stay organized from the moment money moves."
  },
  {
    id: "analyze",
    eyebrow: "Analyze",
    title: "Turn patterns into signal, not noise",
    description: "Watch charts, pressure points, and trends update in a single decision-ready workspace."
  },
  {
    id: "act",
    eyebrow: "Act",
    title: "Move money with a clear next best step",
    description: "Goals, budget guardrails, and AI prompts stay close enough to influence what happens next."
  }
];

export function LandingDemo() {
  const [activeScene, setActiveScene] = useState<DemoScene>("capture");
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setIsActive(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        setIsActive(Boolean(entries[0]?.isIntersecting));
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const order: DemoScene[] = ["capture", "analyze", "act"];
    const interval = window.setInterval(() => {
      setActiveScene((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 3200);

    return () => {
      window.clearInterval(interval);
    };
  }, [isActive]);

  const currentScene = useMemo(() => scenes.find((scene) => scene.id === activeScene) ?? scenes[0], [activeScene]);

  return (
    <section id="demo" ref={ref} className="landing-section scroll-mt-36">
      <div className="mx-auto max-w-7xl">
        <LandingReveal>
          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
            <LandingSectionHeading
              eyebrow="Product demo"
              title="See how the product moves before you ever sign in"
              description="A cinematic walkthrough shows how Fyntra captures activity, explains the pattern, and pushes the next best action into view."
              align="left"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveScene(scene.id)}
                  className={cn(
                    "rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-200",
                    activeScene === scene.id
                      ? "border-primary/20 bg-primary/10 shadow-[0_18px_40px_-28px_rgba(56,87,255,0.36)]"
                      : "border-border/70 bg-card/68 hover:-translate-y-0.5 hover:border-primary/16"
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{scene.eyebrow}</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{scene.title}</p>
                </button>
              ))}
            </div>
          </div>
        </LandingReveal>

        <LandingReveal className="mt-10" delay={0.08}>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-card/76 px-4 pb-8 pt-6 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(56,87,255,0.18),transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl">
              <div className="mx-auto mb-6 flex max-w-[54rem] items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{currentScene.eyebrow}</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">{currentScene.title}</p>
                </div>
                <Badge className="bg-primary/12 text-primary">Live product flow</Badge>
              </div>

              <div className="relative mx-auto max-w-[54rem]">
                <div className="rounded-t-[2rem] border border-b-0 border-border/70 bg-[#0b1324] px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-red-400/80" />
                      <span className="size-3 rounded-full bg-amber-400/80" />
                      <span className="size-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="h-9 w-full max-w-xs rounded-full border border-white/8 bg-white/4" />
                    <div className="w-16" />
                  </div>
                </div>

                <div className="overflow-hidden rounded-b-[2.3rem] border border-border/70 bg-[#09111f] p-3 shadow-[0_30px_90px_-48px_rgba(56,87,255,0.46)]">
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/6 bg-[linear-gradient(180deg,#0d172b_0%,#0b1322_100%)] p-3 sm:p-4">
                    <motion.div
                      key={activeScene}
                      initial={{ opacity: 0, x: 26 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="grid gap-4 lg:grid-cols-[0.22fr_0.78fr]"
                    >
                      <SidebarScene activeScene={activeScene} />
                      <ScreenScene activeScene={activeScene} />
                    </motion.div>
                  </div>
                </div>

                <div className="mx-auto h-5 w-[74%] rounded-b-[999px] bg-[linear-gradient(180deg,rgba(226,232,240,0.72),rgba(148,163,184,0.18))] shadow-[0_18px_40px_-26px_rgba(15,23,42,0.4)] dark:bg-[linear-gradient(180deg,rgba(71,85,105,0.76),rgba(15,23,42,0.16))]" />
              </div>
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}

function SidebarScene({ activeScene }: { activeScene: DemoScene }) {
  const items = [
    { id: "capture", label: "Wallets" },
    { id: "analyze", label: "Analytics" },
    { id: "act", label: "Goals" }
  ] as const;

  return (
    <div className="rounded-[1.45rem] border border-white/6 bg-white/4 p-3">
      <div className="rounded-[1.15rem] border border-white/6 bg-white/4 px-3 py-2 text-sm font-medium text-white/90">
        fyntra
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-[1rem] px-3 py-2.5 text-sm transition-all duration-200",
              activeScene === item.id ? "bg-primary/18 text-white" : "bg-transparent text-white/55"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenScene({ activeScene }: { activeScene: DemoScene }) {
  if (activeScene === "capture") return <CaptureScene />;
  if (activeScene === "analyze") return <AnalyzeScene />;
  return <ActScene />;
}

function CaptureScene() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <ScreenPanel title="Wallet balances" badge="Live sync">
          <div className="grid gap-3 sm:grid-cols-3">
            {dashboardSnapshot.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.2rem] border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{metric.label}</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                  {formatCompactCurrency(metric.value)}
                </p>
              </div>
            ))}
          </div>
        </ScreenPanel>
        <ScreenPanel title="Recent activity" badge="Updated">
          <div className="space-y-2.5">
            {dashboardSnapshot.transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-[1.1rem] border border-white/8 bg-white/4 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{transaction.title}</p>
                  <p className="mt-1 text-xs text-white/45">{transaction.category}</p>
                </div>
                <span className="text-sm font-semibold text-white">{formatCurrency(transaction.amount)}</span>
              </div>
            ))}
          </div>
        </ScreenPanel>
      </div>
    </div>
  );
}

function AnalyzeScene() {
  const maxValue = Math.max(...dashboardSnapshot.cashflow.flatMap((point) => [point.income, point.expense]));

  return (
    <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
      <ScreenPanel title="Cashflow rhythm" badge="Quarter view">
        <div className="grid grid-cols-5 gap-3">
          {dashboardSnapshot.cashflow.map((point) => (
            <div key={point.month} className="flex flex-col items-center">
              <div className="flex h-36 items-end gap-2">
                <motion.div
                  className="w-4 rounded-full bg-gradient-to-t from-primary to-indigo-300"
                  animate={{ height: `${Math.max((point.income / maxValue) * 100, 20)}%` }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="w-4 rounded-full bg-gradient-to-t from-slate-300/60 to-slate-500/90"
                  animate={{ height: `${Math.max((point.expense / maxValue) * 100, 20)}%` }}
                  transition={{ duration: 0.6, delay: 0.06 }}
                />
              </div>
              <p className="mt-3 text-xs text-white/60">{point.month}</p>
            </div>
          ))}
        </div>
      </ScreenPanel>
      <ScreenPanel title="Signals" badge="AI">
        <div className="space-y-3">
          <SceneCallout icon={BrainCircuit} title="Dining is accelerating" description="Spending is running 14% ahead of last month." />
          <SceneCallout icon={CalendarRange} title="Utilities needs attention" description="The category is already at 87% of its target." />
          <SceneCallout icon={Sparkles} title="Savings momentum is healthy" description="Goal contributions are pacing ahead of plan." />
        </div>
      </ScreenPanel>
    </div>
  );
}

function ActScene() {
  const goals = dashboardSnapshot.goals.slice(0, 2);

  return (
    <div className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
      <ScreenPanel title="Goal focus" badge="Recommended">
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100);

            return (
              <div key={goal.id} className="rounded-[1.2rem] border border-white/8 bg-white/4 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{goal.name}</p>
                    <p className="mt-1 text-xs text-white/45">
                      {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{progress}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/8">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ScreenPanel>

      <ScreenPanel title="Next best action" badge="Suggested">
        <div className="grid gap-3 sm:grid-cols-2">
          <ActionCard icon={Target} title="Top up reserve" description="Move Rp 750.000 into your emergency wallet this week." />
          <ActionCard icon={ArrowUpRight} title="Trim pressure" description="Reduce one recurring dining expense to stay on target." />
        </div>
      </ScreenPanel>
    </div>
  );
}

function ScreenPanel({
  title,
  badge,
  children
}: {
  title: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.45rem] border border-white/6 bg-white/4 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <Badge className="bg-white/8 text-white/75">{badge}</Badge>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SceneCallout({
  icon: Icon,
  title,
  description
}: {
  icon: typeof BrainCircuit;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.15rem] border border-white/8 bg-white/4 p-4">
      <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/14 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-white/52">{description}</p>
      </div>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-white/8 bg-white/4 p-4">
      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="size-4" />
      </span>
      <p className="mt-4 text-sm font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/52">{description}</p>
    </div>
  );
}
