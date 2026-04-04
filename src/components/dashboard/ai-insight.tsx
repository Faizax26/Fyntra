"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AiInsight() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-primary/10 shadow-[0_22px_48px_-30px_rgba(56,87,255,0.28)]">
      <CardHeader className="relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.24),transparent_58%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_54%),linear-gradient(180deg,rgba(56,87,255,0.07),transparent_78%)]" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <CardTitle>AI Insight</CardTitle>
            <CardDescription className="mt-2">
              A quick premium-style insight preview based on this month&apos;s placeholder activity.
            </CardDescription>
          </div>
          <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_14px_28px_-20px_rgba(56,87,255,0.42)]">
            <BrainCircuit className="size-5" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-3xl border border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_48%),linear-gradient(180deg,rgba(56,87,255,0.06),transparent_100%)] p-5 shadow-[0_18px_38px_-26px_rgba(56,87,255,0.22)]">
          <Badge className="border border-primary/15 bg-primary/12 text-primary shadow-[0_10px_24px_-18px_rgba(56,87,255,0.45)]">Top signal</Badge>
          <p className="mt-4 text-lg font-semibold leading-8 tracking-tight">
            Spending on dining and subscriptions is climbing faster than income growth this month.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            If this pace continues, your flexible spending will outgrow planned buffers by the third week.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4 transition hover:bg-background/70">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/12 bg-emerald-500/12 text-emerald-600 shadow-[0_14px_28px_-22px_rgba(16,185,129,0.42)] dark:text-emerald-400">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Possible savings</p>
              <p className="mt-1 text-sm text-muted-foreground">Reduce dining by Rp300.000 to land closer to your 50% savings target.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4 transition hover:bg-background/70">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-amber-500/12 bg-amber-500/12 text-amber-600 shadow-[0_14px_28px_-22px_rgba(245,158,11,0.36)] dark:text-amber-400">
              <TrendingDown className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Watch category</p>
              <p className="mt-1 text-sm text-muted-foreground">Utilities is already at 87% of its monthly budget and needs attention soon.</p>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </motion.div>
  );
}
