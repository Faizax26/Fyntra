import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { BudgetSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

function getBudgetTone(progress: number) {
  if (progress >= 80) {
    return {
      cardClass:
        "border-amber-500/20 bg-[linear-gradient(180deg,rgba(245,158,11,0.05),rgba(255,255,255,0)_34%)] ring-1 ring-amber-400/8 hover:border-amber-400/30 hover:shadow-[0_24px_44px_-34px_rgba(245,158,11,0.3)] dark:bg-[linear-gradient(180deg,rgba(245,158,11,0.08),rgba(255,255,255,0)_34%)]",
      percentClass: "text-amber-700 dark:text-amber-300",
      meterClass: "bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400",
      badgeClass:
        "border border-amber-500/20 bg-amber-500/10 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-200",
      showRiskBadge: true
    };
  }

  if (progress >= 60) {
    return {
      cardClass:
        "border-cyan-500/15 ring-1 ring-cyan-400/6 hover:border-cyan-400/28 hover:shadow-[0_24px_42px_-34px_rgba(20,184,166,0.26)]",
      percentClass: "text-cyan-700 dark:text-cyan-300",
      meterClass: "bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400",
      badgeClass: "",
      showRiskBadge: false
    };
  }

  return {
    cardClass: "border-border/80 hover:border-primary/18 hover:shadow-[0_24px_42px_-34px_rgba(56,87,255,0.22)]",
    percentClass: "text-muted-foreground",
    meterClass: "bg-gradient-to-r from-primary via-sky-400 to-cyan-300",
    badgeClass: "",
    showRiskBadge: false
  };
}

export function BudgetProgressList({ budgets }: { budgets: BudgetSummary[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Keep each spending category within its planned monthly guardrail.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const progress = Math.round((budget.spent / budget.limit) * 100);
          const tone = getBudgetTone(progress);

          return (
            <div
              key={budget.id}
              className={cn(
                "rounded-3xl border bg-background/55 p-4 transition-all duration-200 hover:-translate-y-0.5",
                tone.cardClass
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground">{budget.category}</h4>
                  <p className="mt-1 text-sm text-muted-foreground/90">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                  <span className={cn("text-sm font-semibold tracking-[-0.01em]", tone.percentClass)}>{progress}%</span>
                  {tone.showRiskBadge ? (
                    <span className={cn("rounded-full px-2 py-0.5", tone.badgeClass)}>At risk</span>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted/90">
                <div
                  className={cn("h-full rounded-full transition-[width] duration-200 ease-out", tone.meterClass)}
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
