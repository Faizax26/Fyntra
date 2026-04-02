import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="relative p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.2),transparent_30%),radial-gradient(circle_at_right,rgba(16,185,129,0.14),transparent_30%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge className="bg-primary/12 text-primary">March workspace</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Money clarity without the spreadsheet fatigue.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Your starter dashboard combines balances, budget pressure, and recent activity in one calm daily view.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border bg-background/60 px-4 py-3 text-sm text-muted-foreground">
            <CalendarDays className="size-4 text-primary" />
            Updated for March 1 to March 31, 2025
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
