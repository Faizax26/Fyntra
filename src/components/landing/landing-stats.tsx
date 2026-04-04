"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles, Star } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { Card } from "@/components/ui/card";

const stats = [
  {
    value: 50000,
    label: "transactions tracked",
    note: "From daily spending to long-term goals, users keep every movement visible.",
    icon: ArrowUpRight,
    prefix: "",
    suffix: "+",
    decimals: 0
  },
  {
    value: 12,
    label: "managed by users",
    note: "A single workspace for balances, savings, assets, and debt obligations.",
    icon: ShieldCheck,
    prefix: "Rp ",
    suffix: "B+",
    decimals: 0
  },
  {
    value: 4.9,
    label: "average satisfaction",
    note: "Built to feel calm, fast, and clear even when finances get more complex.",
    icon: Star,
    prefix: "",
    suffix: "",
    decimals: 1
  },
  {
    value: 87,
    label: "weekly save signals",
    note: "Subtle AI prompts help users notice better decisions before spending turns into regret.",
    icon: Sparkles,
    prefix: "",
    suffix: "%",
    decimals: 0
  }
];

export function LandingStats() {
  return (
    <section className="landing-section-tight relative -mt-1">
      <LandingReveal className="mx-auto max-w-6xl">
        <LandingStagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
          {stats.map((stat) => (
            <LandingMotionItem key={stat.label}>
              <StatCard {...stat} />
            </LandingMotionItem>
          ))}
        </LandingStagger>
      </LandingReveal>
    </section>
  );
}

function StatCard({
  value,
  label,
  note,
  icon: Icon,
  prefix,
  suffix,
  decimals
}: {
  value: number;
  label: string;
  note: string;
  icon: typeof ArrowUpRight;
  prefix: string;
  suffix: string;
  decimals: number;
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setHasStarted(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1200;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [hasStarted, value]);

  const textValue = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    const finalValue = hasStarted ? displayValue : 0;
    return `${prefix}${formatter.format(finalValue)}${suffix}`;
  }, [decimals, displayValue, hasStarted, prefix, suffix]);

  return (
    <Card
      ref={ref}
      className="group border-border/70 bg-card/76 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_24px_54px_-36px_rgba(56,87,255,0.32)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-[3rem]">{textValue}</p>
          <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary">{label}</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/14 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">{note}</p>
    </Card>
  );
}
