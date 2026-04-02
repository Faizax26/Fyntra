import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { BudgetSummary } from "@/lib/types";

export function BudgetProgressList({ budgets }: { budgets: BudgetSummary[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget health</CardTitle>
        <CardDescription>Keep high-spend categories visible before they drift too far.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const progress = Math.round((budget.spent / budget.limit) * 100);

          return (
            <div key={budget.id} className="rounded-3xl border bg-background/55 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-medium">{budget.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
                {progress >= 80 ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="size-4" />
                    {progress}%
                  </span>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
                )}
              </div>
              <div className="mt-4 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-emerald-500"
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
