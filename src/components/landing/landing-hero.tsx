"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, TrendingUp, Wallet2 } from "lucide-react";

import { LandingMotionItem, LandingStagger } from "@/components/landing/landing-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

export function LandingHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const spotlightY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const layerOneY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const layerThreeY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-18 lg:pt-24">
      <motion.div style={{ y: spotlightY }} className="pointer-events-none absolute inset-x-0 top-0 h-[38rem]">
        <div className="landing-ribbon landing-ribbon-primary absolute left-[-6%] top-2 h-64 w-[44rem] rotate-[10deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-secondary absolute right-[-8%] top-20 h-72 w-[36rem] -rotate-[20deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-accent absolute left-[20%] top-56 h-44 w-[28rem] rotate-[4deg] rounded-full blur-3xl" />
        <div className="absolute right-[16%] top-20 h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.24),transparent_64%)] blur-[110px]" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
        <motion.div
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
            <Badge className="rounded-full border border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.16),rgba(168,85,247,0.1))] px-4 py-2 text-primary shadow-[0_18px_34px_-24px_rgba(56,87,255,0.48)]">
              Personal finance, without the spreadsheet chaos
            </Badge>
          </LandingMotionItem>

          <LandingMotionItem y={18}>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.085em] text-foreground sm:text-6xl lg:text-[5.25rem] lg:leading-[0.94]">
              Take control of your{" "}
              <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-indigo-300">
                money
              </span>{" "}
              in one place
            </h1>
          </LandingMotionItem>

          <LandingMotionItem y={20}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-[1.22rem]">
              Fyntra turns budgets, wallets, and financial insight into one calm operating system, so every decision
              feels clearer before the month gets away from you.
            </p>
          </LandingMotionItem>

          <LandingMotionItem y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                <Link href="#demo">
                  <Play className="size-4" />
                  See how it works
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
                <div className="rounded-2xl border border-border/70 bg-card/68 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-xl">
                  {item}
                </div>
              </LandingMotionItem>
            ))}
          </LandingStagger>
        </motion.div>

        <div className="relative hidden min-h-[34rem] lg:block">
          <motion.div style={{ y: layerOneY }} className="pointer-events-none absolute inset-0">
            <div className="absolute inset-[16%] rounded-[3rem] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.18),transparent_58%)]" />
          </motion.div>

          <motion.div style={{ y: layerOneY }} className="absolute left-[8%] top-[8%] w-[18rem]">
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-2, 1.5, -2] }}
              transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="landing-surface rounded-[1.9rem] p-5 shadow-[0_30px_80px_-46px_rgba(56,87,255,0.44)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary">Total balance</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                    {formatCurrency(dashboardSnapshot.metrics[0].value)}
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Wallet2 className="size-5" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {dashboardSnapshot.wallets.slice(0, 2).map((wallet) => (
                  <div key={wallet.id} className="rounded-2xl border border-border/70 bg-background/62 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{wallet.name}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{formatCompactCurrency(wallet.balance)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: layerTwoY }} className="absolute right-[6%] top-[14%] w-[17rem]">
            <motion.div
              animate={{ y: [8, -8, 8], rotate: [2, -1.5, 2] }}
              transition={{ duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="landing-surface rounded-[1.9rem] p-5 shadow-[0_28px_70px_-42px_rgba(14,165,233,0.34)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary">Cashflow rhythm</p>
                  <p className="mt-2 text-sm text-muted-foreground">Last five months</p>
                </div>
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div className="mt-6 flex h-28 items-end gap-2">
                {[42, 56, 51, 68, 76].map((height, idx) => (
                  <div
                    key={height}
                    className="flex-1 rounded-full bg-gradient-to-t from-primary to-indigo-300"
                    style={{ height: `${height}%`, opacity: idx === 4 ? 1 : 0.72 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: layerThreeY }} className="absolute left-[18%] bottom-[8%] w-[20rem]">
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-1.5, 1, -1.5] }}
              transition={{ duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="landing-surface rounded-[2rem] p-5 shadow-[0_32px_84px_-46px_rgba(168,85,247,0.28)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary">Recent activity</p>
                  <p className="mt-2 text-sm text-muted-foreground">Live from your wallets</p>
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
            </motion.div>
          </motion.div>

          <motion.div style={{ y: layerTwoY }} className="absolute right-[16%] bottom-[12%] w-[14rem]">
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [1.5, -1, 1.5] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="landing-surface rounded-[1.8rem] p-5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-primary">AI note</p>
              <p className="mt-3 text-sm leading-6 text-foreground">
                Dining and utilities are rising faster than planned. One smaller weekly cap restores balance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
