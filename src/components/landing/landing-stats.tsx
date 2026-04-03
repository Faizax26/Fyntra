import { ArrowUpRight, ShieldCheck, Star } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { Card } from "@/components/ui/card";

const stats = [
  {
    value: "50,000+",
    label: "transactions tracked",
    note: "From daily spending to long-term goals, users keep every movement visible.",
    icon: ArrowUpRight
  },
  {
    value: "Rp 12B+",
    label: "managed by users",
    note: "A single workspace for balances, savings, assets, and debt obligations.",
    icon: ShieldCheck
  },
  {
    value: "4.9",
    label: "average satisfaction",
    note: "Built to feel calm, fast, and clear even when finances get more complex.",
    icon: Star
  }
];

export function LandingStats() {
  return (
    <section className="landing-section-tight relative -mt-2">
      <LandingReveal className="mx-auto max-w-7xl">
        <LandingStagger className="grid gap-4 md:grid-cols-3" stagger={0.08}>
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <LandingMotionItem key={stat.label}>
                <Card className="group border-border/70 bg-card/76 p-6 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_24px_54px_-38px_rgba(56,87,255,0.34)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-[3.2rem]">{stat.value}</p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{stat.label}</p>
                    </div>
                    <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/14 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">{stat.note}</p>
                </Card>
              </LandingMotionItem>
            );
          })}
        </LandingStagger>
      </LandingReveal>
    </section>
  );
}
