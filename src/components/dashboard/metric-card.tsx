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

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden",
          featured &&
            "border-primary/20 bg-[linear-gradient(135deg,rgba(56,87,255,0.16),rgba(125,211,252,0.08)_45%,rgba(16,185,129,0.08))] shadow-[0_30px_80px_-38px_rgba(56,87,255,0.45)]"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary",
                featured && "size-11 bg-primary text-primary-foreground shadow-[0_16px_34px_-18px_rgba(56,87,255,0.8)]"
              )}
            >
              <Sparkles className="size-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "font-semibold tracking-[-0.05em]",
              featured ? "text-[2.8rem] leading-none sm:text-[3.35rem]" : "text-2xl sm:text-3xl"
            )}
          >
            {displayValue}
          </div>
          <div className={cn("mt-4 inline-flex items-center gap-2 text-sm", getToneClass(metric.tone))}>
            {trendUp ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
            <span>{metric.delta}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
