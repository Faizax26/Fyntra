import type { LucideIcon } from "lucide-react";

import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Card } from "@/components/ui/card";

export function LandingFeatures({
  items
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <section id="features" className="scroll-mt-28 px-4 py-18 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LandingSectionHeading
          eyebrow="Features"
          title="Everything you need to stay financially clear"
          description="Designed for people who want a modern money workspace that feels calm, fast, and trustworthy from the first session."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group border-border/70 bg-card/76 p-6 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-34px_rgba(56,87,255,0.22)]"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(56,87,255,0.14),rgba(14,165,233,0.12))] text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
