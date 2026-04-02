import { CalendarDays } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Dashboard</h2>
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground">
        <CalendarDays className="size-4 text-primary" />
        Updated for March 1 to March 31, 2025
      </div>
    </div>
  );
}
