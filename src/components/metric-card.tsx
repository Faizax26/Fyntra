import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  trend,
  detail
}: {
  label: string;
  value: number;
  trend?: number;
  detail?: string;
}) {
  const positive = (trend ?? 0) >= 0;

  return (
    <Card className="surface-elevated overflow-hidden">
      <CardContent className="space-y-5 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow">{label}</p>
            <p className="metric-figure">{formatCompactCurrency(value)}</p>
          </div>
          {trend !== undefined ? (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.18em] uppercase",
                positive
                  ? "border-lime-500/15 bg-lime-500/10 text-lime-700 dark:text-lime-300"
                  : "border-amber-500/15 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              )}
            >
              {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {Math.abs(trend).toFixed(1)}%
            </div>
          ) : null}
        </div>
        {detail ? <p className="text-sm leading-6 text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
