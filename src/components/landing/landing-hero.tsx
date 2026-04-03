import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

const trustPoints = ["Budgets that stay clear", "Wallets in one timeline", "Insights that drive action"];

export function LandingHero() {
  const primaryGoal = dashboardSnapshot.goals[0];
  const goalProgress = Math.round((primaryGoal.current / primaryGoal.target) * 100);
  const heroBudgets = dashboardSnapshot.budgets.slice(0, 2);
  const heroTransactions = dashboardSnapshot.transactions.slice(0, 3);

  return (
    <section className="px-4 pb-18 pt-10 sm:px-6 sm:pb-24 lg:px-8 lg:pt-14">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-2xl">
          <Badge className="rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-primary">
            Personal finance, without the spreadsheet chaos
          </Badge>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
            Take control of your money in one place
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Fyntra brings budgeting, wallet tracking, and smart financial insights into a calm workspace that helps
            you make better decisions faster.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-6 text-sm sm:text-base">
              <Link href="/app/dashboard">
                Get Started for Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 text-sm sm:text-base">
              <Link href="#demo">
                <Play className="size-4" />
                See how it works
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 backdrop-blur-sm">
                <CheckCircle2 className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-primary/16 blur-3xl" />
          <Card className="relative overflow-hidden border-white/70 bg-white/80 p-4 shadow-[0_28px_80px_-42px_rgba(56,87,255,0.48)] backdrop-blur-xl sm:p-5">
            <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.22),transparent_60%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_50%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 rounded-[1.7rem] border border-white/70 bg-background/72 px-4 py-3 backdrop-blur-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Live dashboard preview</p>
                  <p className="mt-1 text-sm text-muted-foreground">Balances, budgets, goals, and insights in sync</p>
                </div>
                <Badge className="shrink-0 bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">Premium ready</Badge>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {dashboardSnapshot.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.7rem] border border-white/70 bg-background/82 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.22)]"
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
                <div className="rounded-[1.9rem] border border-white/70 bg-background/82 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Budget health</p>
                      <p className="mt-1 text-xs text-muted-foreground">Stay ahead of categories that need attention</p>
                    </div>
                    <Badge variant="neutral" className="bg-muted/70">This month</Badge>
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
                  <div className="rounded-[1.9rem] border border-white/70 bg-background/82 p-5">
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
                  <div className="rounded-[1.9rem] border border-white/70 bg-background/82 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">Recent activity</p>
                      <span className="text-xs text-muted-foreground">Updated live</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {heroTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/72 px-4 py-3">
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
      </div>
    </section>
  );
}
