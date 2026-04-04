import type { LucideIcon } from "lucide-react";
import { ArrowRightLeft, ShieldCheck, Sparkles, Target, TrendingUp, Wallet } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const layoutClasses = [
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-2"
];

export function LandingFeatures({
  items
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <section id="features" className="landing-section scroll-mt-36">
      <div className="mx-auto max-w-7xl">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="Features"
            title="A money workspace that feels deliberate at every layer"
            description="Each feature is designed to reduce friction, surface the right signal, and keep your financial picture coherent as it grows."
          />
        </LandingReveal>

        <LandingStagger className="mt-8 grid gap-4 md:grid-cols-6" stagger={0.08}>
          {items.map((item, index) => (
            <LandingMotionItem key={item.title}>
              <FeatureCard item={item} index={index} className={layoutClasses[index]} />
            </LandingMotionItem>
          ))}
        </LandingStagger>
      </div>
    </section>
  );
}

function FeatureCard({
  item,
  index,
  className
}: {
  item: { icon: LucideIcon; title: string; description: string };
  index: number;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <Card
      className={cn(
        "group h-full border-border/70 bg-card/78 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_56px_-36px_rgba(56,87,255,0.26)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/12 bg-[linear-gradient(135deg,rgba(56,87,255,0.18),rgba(168,85,247,0.12))] text-primary transition-transform duration-200 group-hover:scale-[1.04]">
          <Icon className="size-5" />
        </span>
      </div>

      <div className="mt-6">{renderFeatureVisual(index)}</div>

      <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em] text-foreground">{item.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
    </Card>
  );
}

function renderFeatureVisual(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="rounded-[1.6rem] border border-border/70 bg-background/70 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Budget runway</span>
            <span>March</span>
          </div>
          <div className="mt-4 space-y-4">
            {[
              { label: "Dining", width: "82%" },
              { label: "Transport", width: "66%" },
              { label: "Utilities", width: "74%" }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.width}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-gradient-to-r from-primary via-indigo-400 to-sky-400" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 1:
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: Wallet, label: "Payroll", value: "Rp 16.2M" },
            { icon: ArrowRightLeft, label: "GoPay", value: "Rp 1.2M" }
          ].map((item) => {
            const ItemIcon = item.icon;

            return (
              <div key={item.label} className="rounded-[1.45rem] border border-border/70 bg-background/70 p-4">
                <ItemIcon className="size-4 text-primary" />
                <p className="mt-6 text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">{item.value}</p>
              </div>
            );
          })}
        </div>
      );
    case 2:
      return (
        <div className="rounded-[1.6rem] border border-border/70 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(168,85,247,0.1))] p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-background/72 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">AI signal</p>
              <p className="mt-1 text-xs text-muted-foreground">Dining is pacing ahead of your target.</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border/60 bg-background/68 px-4 py-3 text-sm text-foreground">
            Save Rp300.000 this month by trimming two recurring expenses.
          </div>
        </div>
      );
    case 3:
      return (
        <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.55rem] border border-border/70 bg-background/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-primary">Goal progress</span>
              <Target className="size-4 text-primary" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">43%</p>
            <div className="mt-4 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: "43%" }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Emergency fund is moving ahead of its quarterly target.</p>
          </div>
          <div className="rounded-[1.55rem] border border-border/70 bg-background/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-primary">Momentum</span>
              <TrendingUp className="size-4 text-primary" />
            </div>
            <div className="mt-4 flex h-28 items-end gap-2">
              {[42, 56, 51, 68, 76].map((height, idx) => (
                <div
                  key={height}
                  className={cn(
                    "w-full rounded-full bg-gradient-to-t from-primary to-indigo-300",
                    idx === 4 && "from-sky-400 to-primary"
                  )}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="rounded-[1.6rem] border border-border/70 bg-background/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.18em] text-primary">Position overview</span>
            <TrendingUp className="size-4 text-primary" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Assets", value: "Rp 41.4M" },
              { label: "Debt", value: "Rp 6.2M" },
              { label: "Net", value: "Rp 35.2M" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="rounded-[1.6rem] border border-border/70 bg-background/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.18em] text-primary">Security</span>
            <ShieldCheck className="size-4 text-primary" />
          </div>
          <div className="mt-5 space-y-3">
            {["Audit logs enabled", "2FA available", "Private by default"].map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-background/72 px-4 py-3 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      );
  }
}
