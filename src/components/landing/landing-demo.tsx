"use client";

import { useState } from "react";
import { ArrowUpRight, BrainCircuit, CalendarRange, CreditCard, Sparkles, Target, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { dashboardSnapshot } from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type DemoTab = "dashboard" | "wallets" | "analytics";

const tabs: { id: DemoTab; label: string; summary: string }[] = [
  { id: "dashboard", label: "Dashboard", summary: "See balances, budgets, and insights at a glance." },
  { id: "wallets", label: "Wallets", summary: "Follow every account and goal wallet without switching tabs." },
  { id: "analytics", label: "Analytics", summary: "Read trends, signals, and savings momentum clearly." }
];

export function LandingDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("dashboard");

  return (
    <section id="demo" className="landing-section scroll-mt-36">
      <div className="mx-auto max-w-7xl">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="Product preview"
            title="See the product before you commit"
            description="Explore a lightweight demo of the Fyntra workspace to understand how money movement, goals, and insights come together."
          />
        </LandingReveal>

        <LandingReveal className="mt-8" delay={0.08}>
          <div className="rounded-[1.9rem] border border-border/70 bg-card/78 p-2.5 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.24)] backdrop-blur-xl sm:p-3">
            <div className="rounded-[1.55rem] border border-border/70 bg-background/42 px-4 py-3 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Choose a workspace view</p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "rounded-[1.35rem] border px-4 py-3.5 text-left transition-all duration-200",
                      activeTab === tab.id
                        ? "border-primary/22 bg-primary/10 shadow-[0_18px_40px_-28px_rgba(56,87,255,0.42)]"
                        : "border-transparent bg-background/60 hover:border-border/70 hover:bg-background/80 hover:-translate-y-0.5"
                    )}
                  >
                    <p className="text-sm font-semibold tracking-[-0.02em] text-foreground sm:text-base">{tab.label}</p>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{tab.summary}</p>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3"
            >
              {activeTab === "dashboard" ? <DashboardTab /> : null}
              {activeTab === "wallets" ? <WalletsTab /> : null}
              {activeTab === "analytics" ? <AnalyticsTab /> : null}
            </motion.div>
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}

function DashboardTab() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.22fr_0.78fr]">
      <Card className="border-border/70 bg-background/72 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Snapshot overview</p>
            <p className="mt-1 text-sm text-muted-foreground">A quick read on cash position and budget pressure.</p>
          </div>
          <Badge>Live sync</Badge>
        </div>

        <LandingStagger className="mt-5 grid gap-3 sm:grid-cols-3" stagger={0.06}>
          {dashboardSnapshot.metrics.map((metric) => (
            <LandingMotionItem key={metric.label} y={10}>
              <div className="rounded-[1.35rem] border border-border/70 bg-background/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/18">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2.5 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  {formatCompactCurrency(metric.value)}
                </p>
                <p className="mt-1.5 text-xs font-medium text-primary">{metric.delta}</p>
              </div>
            </LandingMotionItem>
          ))}
        </LandingStagger>

        <div className="mt-5 rounded-[1.55rem] border border-border/70 bg-background/80 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Budget runway</p>
              <p className="mt-1 text-xs text-muted-foreground">Three categories worth checking this month.</p>
            </div>
            <CalendarRange className="size-5 text-primary" />
          </div>
          <div className="mt-4 space-y-4">
            {dashboardSnapshot.budgets.map((budget) => {
              const progress = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);

              return (
                <div key={budget.id}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">{budget.category}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid gap-3">
        <Card className="border-border/70 bg-background/72 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">AI insight</p>
            <BrainCircuit className="size-5 text-primary" />
          </div>
          <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-foreground">
            You can free up around Rp300.000 this month by tightening dining and utilities.
          </p>
          <div className="mt-4 grid gap-3">
            <PreviewNotice title="Most changed category" description="Dining is 86% used with 11 days remaining." />
            <PreviewNotice title="Recommended action" description="Move one subscription into a fixed utilities budget." />
          </div>
        </Card>

        <Card className="border-border/70 bg-background/72 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Recent transactions</p>
            <ArrowUpRight className="size-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2.5">
            {dashboardSnapshot.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/16"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{transaction.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{transaction.category}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(transaction.amount)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function WalletsTab() {
  const primaryWallet = dashboardSnapshot.wallets[0];

  return (
    <div className="grid gap-3 lg:grid-cols-[0.84fr_1.16fr]">
      <Card className="border-border/70 bg-background/72 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">All wallets</p>
            <p className="mt-1 text-sm text-muted-foreground">Bank, cash, e-wallet, and goal balances.</p>
          </div>
          <Wallet className="size-5 text-primary" />
        </div>
        <div className="mt-4 space-y-2.5">
          {dashboardSnapshot.wallets.map((wallet, index) => (
            <div
              key={wallet.id}
              className={cn(
                "rounded-[1.4rem] border px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5",
                index === 0
                  ? "border-primary/20 bg-primary/8 shadow-[0_16px_36px_-28px_rgba(56,87,255,0.42)]"
                  : "border-border/70 bg-background/80 hover:border-primary/16"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{wallet.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{wallet.type}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(wallet.balance)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-border/70 bg-background/72 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{primaryWallet.name}</p>
            <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-foreground">{formatCurrency(primaryWallet.balance)}</p>
          </div>
          <Badge variant="neutral" className="bg-muted/70">
            {primaryWallet.type}
          </Badge>
        </div>

        <LandingStagger className="mt-5 grid gap-3 sm:grid-cols-3" stagger={0.06}>
          <LandingMotionItem y={10}>
            <WalletStat label="7 day inflow" value="Rp 15.7M" />
          </LandingMotionItem>
          <LandingMotionItem y={10}>
            <WalletStat label="7 day spend" value="Rp 4.4M" />
          </LandingMotionItem>
          <LandingMotionItem y={10}>
            <WalletStat label="Transfers" value="3 linked" />
          </LandingMotionItem>
        </LandingStagger>

        <div className="mt-5 rounded-[1.55rem] border border-border/70 bg-background/82 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Connected goal progress</p>
            <Target className="size-5 text-primary" />
          </div>
          <div className="mt-4 space-y-4">
            {dashboardSnapshot.goals.slice(0, 2).map((goal) => {
              const progress = Math.round((goal.current / goal.target) * 100);

              return (
                <div key={goal.id}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{goal.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

function WalletStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-border/70 bg-background/82 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-foreground">{value}</p>
    </div>
  );
}

function AnalyticsTab() {
  const maxValue = Math.max(...dashboardSnapshot.cashflow.flatMap((point) => [point.income, point.expense]));

  return (
    <div className="grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
      <Card className="border-border/70 bg-background/72 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Monthly cashflow</p>
            <p className="mt-1 text-sm text-muted-foreground">A cleaner way to compare income and expense momentum.</p>
          </div>
          <CreditCard className="size-5 text-primary" />
        </div>
        <div className="mt-6 grid grid-cols-5 gap-3">
          {dashboardSnapshot.cashflow.map((point) => (
            <div key={point.month} className="flex flex-col items-center">
              <div className="flex h-40 items-end gap-2">
                <div
                  className="w-4 rounded-full bg-gradient-to-t from-primary to-indigo-300 transition-transform duration-200 hover:-translate-y-1"
                  style={{ height: `${Math.max((point.income / maxValue) * 100, 18)}%` }}
                />
                <div
                  className="w-4 rounded-full bg-gradient-to-t from-slate-300 to-slate-500 transition-transform duration-200 hover:-translate-y-1"
                  style={{ height: `${Math.max((point.expense / maxValue) * 100, 18)}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{point.month}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {point.income}M / {point.expense}M
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3">
        <Card className="border-border/70 bg-background/72 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Key signals</p>
            <Sparkles className="size-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2.5">
            <PreviewNotice title="Savings momentum" description="Net positive cashflow for five straight months keeps long-term goals healthy." />
            <PreviewNotice title="Watch utilities" description="Utility spending is nearly at its limit earlier than the rest of the month." />
            <PreviewNotice title="Goal contribution" description="Emergency fund contributions are pacing ahead of target by 8% this quarter." />
          </div>
        </Card>

        <Card className="border-border/70 bg-background/72 p-5">
          <p className="text-sm font-semibold text-foreground">Why this matters</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {formatCompactCurrency(dashboardSnapshot.metrics[0].value)}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            One source of truth helps users act on trends quickly instead of reacting after the month is already lost.
          </p>
        </Card>
      </div>
    </div>
  );
}

function PreviewNotice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.35rem] border border-border/70 bg-background/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/16">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
