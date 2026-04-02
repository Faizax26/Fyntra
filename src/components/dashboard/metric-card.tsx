"use client";

import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { DashboardMetric } from "@/lib/types";

function getToneClass(tone: DashboardMetric["tone"]) {
  if (tone === "positive") return "text-emerald-600 dark:text-emerald-400";
  if (tone === "primary") return "text-primary";
  return "text-muted-foreground";
}

export function MetricCard({ metric, index }: { metric: DashboardMetric; index: number }) {
  const isPercent = metric.label === "Savings rate";
  const displayValue = isPercent ? `${metric.value}%` : formatCurrency(metric.value);
  const trendUp = metric.delta.startsWith("+") || metric.tone === "positive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-[-0.05em]">{displayValue}</div>
          <div className={`mt-3 inline-flex items-center gap-2 text-sm ${getToneClass(metric.tone)}`}>
            {trendUp ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
            <span>{metric.delta}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
