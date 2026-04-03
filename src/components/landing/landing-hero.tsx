"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

import { LandingMotionItem, LandingStagger } from "@/components/landing/landing-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

const trustPoints = [
  "Catch spending drift before month-end",
  "See wallets, goals, and cash in one view",
  "Turn patterns into clear next steps"
];

export function LandingHero() {
  const primaryGoal = dashboardSnapshot.goals[0];
  const goalProgress = Math.round((primaryGoal.current / primaryGoal.target) * 100);
  const heroBudgets = dashboardSnapshot.budgets.slice(0, 2);
  const heroTransactions = dashboardSnapshot.transactions.slice(0, 3);

  return (
    <section className="px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8 lg:pb-16 lg:pt-14">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14">
        <motion.div
          className="max-w-xl"
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
            <Badge className="rounded-full border border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.16),rgba(14,165,233,0.08))] px-4 py-2 text-primary shadow-[0_18px_34px_-24px_rgba(56,87,255,0.48)]">
              Personal finance, without the spreadsheet chaos
            </Badge>
          </LandingMotionItem>
          <LandingMotionItem y={18}>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.085em] text-foreground sm:text-6xl lg:text-[4.55rem] lg:leading-[0.98]">
              Take control of your money in one place
            </h1>
          </LandingMotionItem>
          <LandingMotionItem y={20}>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground sm:text-[1.22rem]">
              Fyntra brings budgeting, wallet tracking, and smart financial insights into a calm workspace that helps
              you make better decisions faster.
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
          <LandingStagger className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.08} delay={0.18}>
            {trustPoints.map((item) => (
              <LandingMotionItem key={item} y={12}>
                <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/72 px-4 py-3 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.24)] backdrop-blur-xl">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span className="text-sm font-medium leading-6 text-foreground">{item}</span>
                </div>
              </LandingMotionItem>
            ))}
          </LandingStagger>
        </motion.div>

        <motion.div
          className="relative lg:pl-2"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          <div className="landing-preview-glow pointer-events-none absolute left-[8%] top-[6%] h-44 w-44 rounded-full bg-primary/16 blur-[85px]" />
          <div className="landing-preview-glow pointer-events-none absolute right-[12%] top-[16%] h-52 w-52 rounded-full bg-sky-400/12 blur-[95px]" />

          <div className="landing-hero-preview landing-preview-frame group relative">
            <div className="pointer-events-none absolute inset-x-5 -top-5 bottom-5 rounded-[2.25rem] border border-border/45 bg-card/34 shadow-[0_26px_60px_-40px_rgba(15,23,42,0.18)] backdrop-blur-2xl" />
            <div className="pointer-events-none absolute inset-x-8 top-6 bottom-0 rounded-[2.25rem] border border-border/38 bg-card/22" />

            <Card className="landing-preview-shimmer relative overflow-hidden rounded-[2.25rem] border-border/70 bg-card/82 p-4 shadow-[0_34px_100px_-46px_rgba(56,87,255,0.46)] backdrop-blur-2xl sm:p-5">
              <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.22),transparent_60%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_50%)]" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4 rounded-[1.7rem] border border-border/70 bg-background/72 px-4 py-3 backdrop-blur-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Live dashboard preview</p>
                    <p className="mt-1 text-sm text-muted-foreground">Balances, budgets, goals, and insights in sync</p>
                  </div>
                  <Badge className="shrink-0 bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                    <span className="mr-2 inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.14)]" />
                    Premium ready
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {dashboardSnapshot.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.7rem] border border-border/70 bg-background/82 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.22)] transition-transform duration-200 group-hover:-translate-y-0.5"
                    >
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                        {formatCompactCurrency(metric.value)}
                      </p>
                      <p className="mt-2 text-xs font-medium text-primary">{metric.delta}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 xl:grid-cols-[1.12fr_0.88fr]">
                  <div className="rounded-[1.9rem] border border-border/70 bg-background/82 p-5 shadow-[0_20px_44px_-34px_rgba(15,23,42,0.22)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Budget health</p>
                        <p className="mt-1 text-xs text-muted-foreground">Stay ahead of categories that need attention</p>
                      </div>
                      <Badge variant="neutral" className="bg-muted/70">
                        This month
                      </Badge>
                    </div>

                    <div className="mt-5 space-y-4">
                      {heroBudgets.map((budget) => {
                        const progress = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);

                        return (
                          <div key={budget.id}>
                            <div className="flex items-center justify-between gap-3 text-sm">
                              <span className="font-medium text-foreground">{budget.category}</span>
                              <span className="text-muted-foreground">{progress}% used</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(14,165,233,0.08))] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">AI note</p>
                      <p className="mt-2 text-sm leading-6 text-foreground">
                        Dining and utilities are rising faster than planned. A smaller weekly cap keeps your savings rate on track.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[1.9rem] border border-border/70 bg-background/82 p-5 shadow-[0_20px_44px_-34px_rgba(15,23,42,0.22)]">
                      <p className="text-sm font-semibold text-foreground">Emergency fund</p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">{goalProgress}%</p>
                      <div className="mt-3 h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary via-indigo-400 to-sky-400"
                          style={{ width: `${goalProgress}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {formatCurrency(primaryGoal.current)} of {formatCurrency(primaryGoal.target)}
                      </p>
                    </div>

                    <div className="rounded-[1.9rem] border border-border/70 bg-background/82 p-5 shadow-[0_20px_44px_-34px_rgba(15,23,42,0.22)]">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">Recent activity</p>
                        <span className="text-xs text-muted-foreground">Updated live</span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {heroTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/72 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-foreground">{transaction.title}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{transaction.category}</p>
                            </div>
                            <span className="text-sm font-semibold text-foreground">{formatCurrency(transaction.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
