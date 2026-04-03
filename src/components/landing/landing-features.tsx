import type { LucideIcon } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Card } from "@/components/ui/card";

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
            title="Everything you need to stay financially clear"
            description="Designed for people who want a modern money workspace that feels calm, fast, and trustworthy from the first session."
          />
        </LandingReveal>
        <LandingStagger className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.08}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <LandingMotionItem key={item.title}>
                <Card className="group border-border/70 bg-card/76 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_26px_52px_-34px_rgba(56,87,255,0.26)]">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/12 bg-[linear-gradient(135deg,rgba(56,87,255,0.14),rgba(14,165,233,0.12))] text-primary transition-transform duration-200 group-hover:scale-[1.04]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
                </Card>
              </LandingMotionItem>
            );
          })}
        </LandingStagger>
      </div>
    </section>
  );
}
