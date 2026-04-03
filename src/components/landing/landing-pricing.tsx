import Link from "next/link";
import { Check } from "lucide-react";

import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "Rp0",
    description: "A strong starting point for personal tracking and planning.",
    features: ["Basic transaction tracking", "Up to 3 wallets", "Core budgeting tools", "Basic analytics"],
    highlight: false
  },
  {
    name: "Premium",
    price: "Rp79K",
    description: "For deeper visibility, more accounts, and smarter guidance.",
    features: ["Unlimited wallets", "Advanced analytics", "AI insights", "Priority goals and planning"],
    highlight: true
  }
];

export function LandingPricing() {
  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-18 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LandingSectionHeading
          eyebrow="Pricing"
          title="Start free, upgrade when you need more depth"
          description="The core experience is available right away. Premium unlocks more scale, smarter analysis, and a fuller money picture."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "border-border/70 p-8 backdrop-blur-xl",
                plan.highlight
                  ? "bg-[linear-gradient(180deg,rgba(56,87,255,0.14),rgba(247,249,252,0.88))] ring-1 ring-primary/20 dark:bg-[linear-gradient(180deg,rgba(56,87,255,0.16),rgba(9,17,31,0.9))]"
                  : "bg-card/76"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{plan.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                </div>
                {plan.highlight ? <Badge>Most popular</Badge> : <Badge variant="neutral">Core plan</Badge>}
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.07em] text-foreground">{plan.price}</span>
                <span className="pb-2 text-sm text-muted-foreground">/ month</span>
              </div>
              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/72 px-4 py-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                variant={plan.highlight ? "default" : "outline"}
                className={cn("mt-8 h-12 w-full rounded-full", plan.highlight && "landing-cta-primary text-primary-foreground")}
              >
                <Link href="/app/dashboard">{plan.highlight ? "Choose Premium" : "Start Free"}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
