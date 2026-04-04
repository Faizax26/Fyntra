import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import type { GoalSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatGoalDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function getGoalStatus(progress: number) {
  if (progress >= 80) {
    return { label: "Almost there", className: "text-primary/80 dark:text-primary/75" };
  }

  if (progress >= 45) {
    return { label: "On pace", className: "text-emerald-700 dark:text-emerald-300" };
  }

  return { label: "Needs boost", className: "text-amber-700 dark:text-amber-300" };
}

function formatGoalGap(value: number) {
  if (value <= 0) {
    return "Target reached";
  }

  return `Rp ${formatCompactCurrency(value)} to go`;
}

export function GoalsOverview({ goals }: { goals: GoalSummary[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Goals</CardTitle>
        <CardDescription>Track progress across your main savings targets at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const progress = Math.round((goal.current / goal.target) * 100);
          const remaining = Math.max(goal.target - goal.current, 0);
          const status = getGoalStatus(progress);

          return (
            <div
              key={goal.id}
              className="rounded-3xl border border-border/80 bg-background/55 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_24px_42px_-34px_rgba(56,87,255,0.22)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground">{goal.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground/90">Target date {formatGoalDate(goal.deadline)}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-semibold tracking-[-0.01em] text-primary">{progress}%</span>
                  <p className={cn("mt-1 text-[11px] font-medium", status.className)}>{status.label}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-sm text-muted-foreground/90">
                  {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                </p>
                <p className="text-xs font-medium text-muted-foreground/80">{formatGoalGap(remaining)}</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted/90">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300 transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
