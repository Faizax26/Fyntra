"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, TrendingUp, Wallet2 } from "lucide-react";

import { useLandingSectionProgress } from "@/components/landing/landing-hooks";
import { LandingMotionItem, LandingStagger } from "@/components/landing/landing-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function HeroFilmSection() {
  const { ref, scrollYProgress } = useLandingSectionProgress<HTMLElement>(["start start", "end start"]);

  const headlineScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.18]);
  const headlineY = useTransform(scrollYProgress, [0, 0.55], [0, -42]);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const visualYPrimary = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const visualYSecondary = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const visualYTertiary = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[120svh] items-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-18 sm:pt-28 lg:px-8"
    >
      <motion.div style={{ y: atmosphereY }} className="pointer-events-none absolute inset-x-0 top-0 h-[46rem]">
        <div className="landing-ribbon landing-ribbon-primary absolute left-[-8%] top-4 h-72 w-[44rem] rotate-[8deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-secondary absolute right-[-8%] top-16 h-80 w-[38rem] -rotate-[16deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-accent absolute left-[22%] top-64 h-48 w-[30rem] rotate-[4deg] rounded-full blur-3xl" />
        <div className="absolute left-[18%] top-24 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(56,87,255,0.14),transparent_66%)] blur-[90px]" />
        <div className="absolute right-[18%] top-32 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14),rgba(56,87,255,0.1),transparent_70%)] blur-[120px]" />
        <div className="landing-particle absolute left-[14%] top-28 size-2 rounded-full bg-sky-300/35" />
        <div className="landing-particle landing-particle-delay absolute right-[14%] top-36 size-1.5 rounded-full bg-indigo-300/32" />
        <div className="landing-particle landing-particle-delay-2 absolute left-[28%] top-[22rem] size-1.5 rounded-full bg-violet-300/28" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-10">
        <motion.div
          style={{ scale: headlineScale, opacity: headlineOpacity, y: headlineY }}
          className="relative z-10 max-w-2xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <LandingMotionItem y={14}>
            <Badge className="rounded-full border border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.14),rgba(168,85,247,0.08))] px-4 py-2 text-primary shadow-[0_18px_34px_-24px_rgba(56,87,255,0.48)]">
              Fyntra / personal finance as a calmer operating system
            </Badge>
          </LandingMotionItem>

          <LandingMotionItem y={18}>
            <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.09em] text-foreground sm:text-6xl lg:text-[5.6rem] lg:leading-[0.92]">
              Your money,
              <br />
              <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-indigo-300">
                orchestrated
              </span>
              <br />
              into one calm system.
            </h1>
          </LandingMotionItem>

          <LandingMotionItem y={18}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-[1.18rem]">
              Fyntra brings wallets, budgets, goals, and AI guidance into one precise workspace, so the next move
              feels obvious before your finances get noisy.
            </p>
          </LandingMotionItem>

          <LandingMotionItem y={16}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="landing-cta-primary h-12 rounded-full px-6 text-sm text-primary-foreground sm:text-base">
                <Link href="/app/dashboard">
                  Get Started for Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="landing-cta-secondary h-12 rounded-full border-border/70 bg-background/72 px-6 text-sm shadow-[0_14px_34px_-26px_rgba(15,23,42,0.26)] backdrop-blur-xl sm:text-base"
              >
                <Link href="#sequence">
                  <Play className="size-4" />
                  Watch the product story
                </Link>
              </Button>
            </div>
          </LandingMotionItem>

          <LandingStagger className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.08} delay={0.18}>
            {[
              "Budgets that stay calm",
              "Signals that drive action",
              "One workspace for the full picture"
            ].map((item) => (
              <LandingMotionItem key={item} y={12}>
                <div className="rounded-2xl border border-border/70 bg-card/62 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-xl">
                  {item}
                </div>
              </LandingMotionItem>
            ))}
          </LandingStagger>
        </motion.div>

        <div className="relative hidden min-h-[40rem] lg:block">
          <motion.div style={{ y: visualYPrimary }} className="absolute left-[5%] top-[8%]">
            <HeroSurface className="w-[20rem]" delay={0.18}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Total balance</p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                    {formatCurrency(dashboardSnapshot.metrics[0].value)}
                  </p>
                </div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Wallet2 className="size-5" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {dashboardSnapshot.wallets.slice(0, 2).map((wallet) => (
                  <div key={wallet.id} className="rounded-2xl border border-border/70 bg-background/62 px-4 py-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{wallet.name}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{formatCompactCurrency(wallet.balance)}</p>
                  </div>
                ))}
              </div>
            </HeroSurface>
          </motion.div>

          <motion.div style={{ y: visualYSecondary }} className="absolute right-[6%] top-[14%]">
            <HeroSurface className="w-[18rem]" delay={0.3} loopDirection="up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Cashflow rhythm</p>
                  <p className="mt-2 text-sm text-muted-foreground">Five-month movement</p>
                </div>
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div className="mt-7 flex h-28 items-end gap-2">
                {[48, 62, 54, 76, 88].map((height, index) => (
                  <div
                    key={height}
                    className={cn(
                      "flex-1 rounded-full bg-gradient-to-t from-primary to-indigo-300",
                      index === 4 && "from-sky-400 to-primary"
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </HeroSurface>
          </motion.div>

          <motion.div style={{ y: visualYTertiary }} className="absolute left-[18%] bottom-[8%]">
            <HeroSurface className="w-[21rem]" delay={0.42}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Live movement</p>
                  <p className="mt-2 text-sm text-muted-foreground">Fresh from your wallets</p>
                </div>
                <Sparkles className="size-5 text-primary" />
              </div>
              <div className="mt-5 space-y-2.5">
                {dashboardSnapshot.transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="rounded-2xl border border-border/70 bg-background/62 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{formatCompactCurrency(transaction.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </HeroSurface>
          </motion.div>

          <motion.div style={{ y: visualYSecondary }} className="absolute right-[18%] bottom-[12%]">
            <HeroSurface className="w-[15rem]" delay={0.56} loopDirection="up">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">AI signal</p>
              <p className="mt-4 text-sm leading-6 text-foreground">
                Utilities and dining are rising faster than planned. One smaller weekly cap restores balance.
              </p>
            </HeroSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroSurface({
  children,
  className,
  delay = 0,
  loopDirection = "down"
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  loopDirection?: "up" | "down";
}) {
  const translate = loopDirection === "up" ? [0, -8, 6, 0] : [0, 8, -6, 0];
  const rotate = loopDirection === "up" ? [0, 1.4, -1, 0] : [0, -1.4, 1, 0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.96, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        animate={{ y: translate, rotate }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
        className={cn(
          "landing-surface rounded-[2rem] border border-border/70 p-5 shadow-[0_30px_80px_-46px_rgba(56,87,255,0.3)]",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
