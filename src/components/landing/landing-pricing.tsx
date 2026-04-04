import Link from "next/link";
import { Check } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
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
    <section id="pricing" className="landing-section scroll-mt-36">
      <div className="mx-auto max-w-7xl">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="Pricing"
            title="Start free, upgrade when you need more depth"
            description="The core experience is available right away. Premium unlocks more scale, smarter analysis, and a fuller money picture."
          />
        </LandingReveal>
        <LandingStagger className="mt-8 grid gap-4 lg:grid-cols-2" stagger={0.1}>
          {plans.map((plan) => (
            <LandingMotionItem key={plan.name}>
              <Card
                className={cn(
                  "border-border/70 p-7 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_30px_58px_-36px_rgba(56,87,255,0.22)] lg:p-8",
                  plan.highlight
                    ? "bg-[linear-gradient(180deg,rgba(56,87,255,0.16),rgba(247,249,252,0.88))] ring-1 ring-primary/20 dark:bg-[linear-gradient(180deg,rgba(56,87,255,0.2),rgba(9,17,31,0.92))]"
                    : "bg-card/76"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                  </div>
                  {plan.highlight ? <Badge>Most popular</Badge> : <Badge variant="neutral">Core plan</Badge>}
                </div>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.07em] text-foreground">{plan.price}</span>
                  <span className="pb-2 text-sm text-muted-foreground">/ month</span>
                </div>
                <div className="mt-6 space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 px-4 py-3">
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
                  className={cn("mt-7 h-12 w-full rounded-full", plan.highlight && "landing-cta-primary text-primary-foreground")}
                >
                  <Link href="/app/dashboard">{plan.highlight ? "Choose Premium" : "Start Free"}</Link>
                </Button>
              </Card>
            </LandingMotionItem>
          ))}
        </LandingStagger>
      </div>
    </section>
  );
}
