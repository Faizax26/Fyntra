import { ArrowUpRight, ShieldCheck, Star } from "lucide-react";

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
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="border-white/70 bg-white/72 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{stat.label}</p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">{stat.note}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
