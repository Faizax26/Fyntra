import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { GoalSummary } from "@/lib/types";

function formatGoalDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
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

          return (
            <div key={goal.id} className="rounded-3xl border bg-background/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-medium">{goal.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Target date {formatGoalDate(goal.deadline)}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{progress}%</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
              </p>
              <div className="mt-4 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400"
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
