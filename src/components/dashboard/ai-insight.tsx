import { BrainCircuit, Sparkles, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AiInsight() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.2),transparent_58%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_52%)]" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <CardTitle>AI Insight</CardTitle>
            <CardDescription className="mt-2">
              A quick premium-style insight preview based on this month&apos;s placeholder activity.
            </CardDescription>
          </div>
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BrainCircuit className="size-5" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-3xl border bg-background/55 p-4">
          <Badge className="bg-primary/12 text-primary">Top signal</Badge>
          <p className="mt-3 text-base font-medium leading-7">
            Spending on dining and subscriptions is climbing faster than income growth this month.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Possible savings</p>
              <p className="mt-1 text-sm text-muted-foreground">Reduce dining by Rp300.000 to land closer to your 50% savings target.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-600 dark:text-amber-400">
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
  );
}
