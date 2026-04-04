"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { ArrowUpRight, BrainCircuit, CalendarRange, Sparkles, Target } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

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
    title: "Every movement lands in context",
    description: "Wallets, balances, and fresh activity stay visible from the moment money moves."
  },
  {
    id: "analyze",
    eyebrow: "Analyze",
    title: "Patterns become signal instantly",
    description: "Watch charts, pressure points, and trend shifts update inside one calm decision layer."
  },
  {
    id: "act",
    eyebrow: "Act",
    title: "The next best action stays close",
    description: "Goals, budget guardrails, and AI prompts stay visible enough to change what you do next."
  }
];

export function LandingDemo() {
  const ref = useRef<HTMLElement | null>(null);
  const [activeScene, setActiveScene] = useState<DemoScene>("capture");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const deviceScale = useTransform(scrollYProgress, [0, 0.18], [0.9, 1]);
  const deviceOpacity = useTransform(scrollYProgress, [0, 0.14], [0.3, 1]);
  const deviceY = useTransform(scrollYProgress, [0, 0.18], [60, 0]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const miniCardY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveScene("capture");
      return;
    }

    if (latest < 0.67) {
      setActiveScene("analyze");
      return;
    }

    setActiveScene("act");
  });

  const currentScene = scenes.find((scene) => scene.id === activeScene) ?? scenes[0];

  return (
    <section id="demo" ref={ref} className="relative px-4 py-16 sm:px-6 lg:px-8">
      <LandingReveal className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <LandingSectionHeading
            eyebrow="Product demo"
            title="Watch the product come alive as the story unfolds"
            description="Scroll through a guided product sequence that shows how Fyntra captures activity, explains the pattern, and drives the next best action."
            align="left"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className={cn(
                  "rounded-[1.45rem] border px-4 py-4 transition-all duration-200",
                  activeScene === scene.id
                    ? "border-primary/20 bg-primary/10 shadow-[0_18px_40px_-28px_rgba(56,87,255,0.36)]"
                    : "border-border/70 bg-card/68"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{scene.eyebrow}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{scene.title}</p>
              </div>
            ))}
          </div>
        </div>
      </LandingReveal>

      <div className="relative mx-auto mt-10 max-w-7xl">
        <div className="absolute left-0 top-0 hidden h-full w-[18rem] lg:block" />
        <div className="relative h-[220vh]">
          <div className="sticky top-24 grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
            <motion.div style={{ y: introY }} className="hidden lg:block">
              <div className="relative rounded-[2rem] border border-border/70 bg-card/62 p-6 backdrop-blur-xl">
                <div className="absolute left-6 top-24 h-[65%] w-px bg-white/8" />
                <motion.div
                  style={{ height: progressHeight }}
                  className="absolute left-6 top-24 w-px bg-gradient-to-b from-primary via-sky-400 to-violet-400"
                />
                <div className="space-y-7">
                  {scenes.map((scene, index) => (
                    <div key={scene.id} className="relative pl-8">
                      <span
                        className={cn(
                          "absolute left-0 top-1.5 size-3 rounded-full border transition-all duration-200",
                          activeScene === scene.id
                            ? "border-primary bg-primary shadow-[0_0_0_6px_rgba(56,87,255,0.16)]"
                            : "border-white/20 bg-background"
                        )}
                      />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{`0${index + 1}`}</p>
                      <p className="mt-2 text-sm font-medium text-foreground">{scene.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{scene.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ scale: deviceScale, opacity: deviceOpacity, y: deviceY }} className="relative">
              <motion.div style={{ y: miniCardY }} className="pointer-events-none absolute -left-4 top-24 hidden xl:block">
                <MiniFloatCard
                  title="Net position"
                  value="Rp 35.2M"
                  detail="+8.2% vs last month"
                  className="rotate-[-6deg]"
                />
              </motion.div>
              <motion.div style={{ y: deviceY }} className="pointer-events-none absolute -right-4 top-10 hidden xl:block">
                <MiniFloatCard title="AI insight" value="Dining is up" detail="Trim Rp300K to stay on target" className="rotate-[6deg]" />
              </motion.div>

              <div className="relative mx-auto max-w-[58rem]">
                <div className="rounded-t-[2rem] border border-b-0 border-border/70 bg-[#0b1324] px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-red-400/80" />
                      <span className="size-3 rounded-full bg-amber-400/80" />
                      <span className="size-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="h-9 w-full max-w-xs rounded-full border border-white/8 bg-white/4" />
                    <Badge className="bg-primary/12 text-primary">{currentScene.eyebrow}</Badge>
                  </div>
                </div>

                <div className="overflow-hidden rounded-b-[2.35rem] border border-border/70 bg-[#09111f] p-3 shadow-[0_40px_90px_-48px_rgba(56,87,255,0.44)]">
                  <div className="relative overflow-hidden rounded-[1.8rem] border border-white/6 bg-[linear-gradient(180deg,#0d172b_0%,#0b1322_100%)] p-3 sm:p-4">
                    <motion.div
                      key={activeScene}
                      initial={{ opacity: 0, x: 36 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                      className="grid gap-4 lg:grid-cols-[0.2fr_0.8fr]"
                    >
                      <SidebarScene activeScene={activeScene} />
                      <ScreenScene activeScene={activeScene} />
                    </motion.div>
                  </div>
                </div>

                <div className="mx-auto h-5 w-[74%] rounded-b-[999px] bg-[linear-gradient(180deg,rgba(226,232,240,0.72),rgba(148,163,184,0.18))] shadow-[0_18px_40px_-26px_rgba(15,23,42,0.4)] dark:bg-[linear-gradient(180deg,rgba(71,85,105,0.76),rgba(15,23,42,0.16))]" />
              </div>
            </motion.div>
          </div>
        </div>
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
      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <ScreenPanel title="Wallet balances" badge="Live sync">
          <div className="grid gap-3 sm:grid-cols-3">
            {dashboardSnapshot.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.2rem] border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{metric.label}</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{formatCompactCurrency(metric.value)}</p>
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

function MiniFloatCard({
  title,
  value,
  detail,
  className
}: {
  title: string;
  value: string;
  detail: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[1.4rem] border border-border/70 bg-card/74 px-4 py-4 backdrop-blur-xl shadow-[0_20px_44px_-28px_rgba(15,23,42,0.42)]", className)}>
      <p className="text-xs uppercase tracking-[0.18em] text-primary">{title}</p>
      <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
