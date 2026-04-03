"use client";

import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/lib/types";

function getToneClass(tone: DashboardMetric["tone"]) {
  if (tone === "positive") return "text-emerald-600 dark:text-emerald-400";
  if (tone === "primary") return "text-primary";
  return "text-muted-foreground";
}

export function MetricCard({
  metric,
  index,
  featured = false
}: {
  metric: DashboardMetric;
  index: number;
  featured?: boolean;
}) {
  const displayValue = formatCurrency(metric.value);
  const trendUp = metric.delta.startsWith("+") || metric.tone === "positive";
  const isIncome = metric.label === "Income this month";
  const isExpense = metric.label === "Expense this month";
  const featuredStyle = featured
    ? {
        backgroundImage:
          "radial-gradient(circle at top right, rgba(255, 255, 255, 0.12), transparent 18%), linear-gradient(135deg, rgba(99, 102, 241, 0.92) 0%, rgba(129, 140, 248, 0.84) 60%, rgba(125, 211, 252, 0.72) 100%)",
        backgroundColor: "#6366f1"
      }
    : undefined;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-border dark:bg-card dark:shadow-none dark:hover:shadow-none",
          isIncome && "border-emerald-500/20",
          isExpense && "border-red-500/20",
          featured &&
            "kpi-card-featured border-transparent text-white shadow-lg ring-1 ring-indigo-500/20 dark:border-transparent dark:shadow-xl"
        )}
        style={featuredStyle}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle
              className={cn(
                "text-sm font-medium text-slate-500 dark:text-muted-foreground",
                featured && "text-lg font-semibold text-white/90 dark:text-white"
              )}
            >
              {metric.label}
            </CardTitle>
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-300",
                isIncome && "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
                isExpense && "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
                featured && "size-11 bg-white/18 text-white dark:bg-white/12 dark:text-white shadow-[0_16px_34px_-18px_rgba(56,87,255,0.55)]"
              )}
            >
              <Sparkles className="size-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white",
              featured ? "text-[2.8rem] leading-none text-white sm:text-[3.35rem] dark:text-white" : "text-2xl sm:text-3xl"
            )}
          >
            {displayValue}
          </div>
          <div
            className={cn(
              "mt-4 inline-flex items-center gap-2 text-sm",
              featured ? "text-white/85 dark:text-white/85" : getToneClass(metric.tone),
              isExpense && "text-red-600/90 dark:text-red-400/90",
              isIncome && "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {trendUp ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
            <span>{metric.delta}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
