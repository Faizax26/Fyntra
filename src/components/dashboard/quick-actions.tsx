"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuickAction } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
        <CardDescription>Presentational shortcuts for the next feature phase.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const isPrimary = action.id === "add-transaction";

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => toast.info(`${action.label} is part of the next feature phase.`)}
              className={cn(
                "group cursor-pointer rounded-3xl border p-5 text-left transition-all duration-200 ease-out hover:scale-[1.01] hover:bg-background hover:shadow-lg hover:shadow-primary/10",
                isPrimary
                  ? "border-primary/25 bg-gradient-to-br from-primary/12 via-primary/6 to-background/80 ring-1 ring-primary/15 hover:border-primary/40"
                  : "bg-background/55 hover:border-primary/25"
              )}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-105 group-hover:brightness-110",
                    isPrimary
                      ? "bg-gradient-to-br from-primary/25 to-primary/10 text-primary shadow-[0_16px_34px_-22px_rgba(56,87,255,0.6)]"
                      : "bg-gradient-to-br from-primary/14 to-primary/8 text-primary shadow-[0_14px_28px_-22px_rgba(56,87,255,0.42)]"
                  )}
                >
                  <Plus className="size-4" />
                </span>
                <div>
                  <p className={cn("font-medium", isPrimary && "text-foreground")}>{action.label}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
        <Button
          variant="outline"
          className="md:col-span-2 xl:col-span-4 rounded-2xl border-border/70 bg-background/70 hover:scale-[1.01] hover:border-primary/25 hover:bg-gradient-to-r hover:from-primary/8 hover:to-background transition-all duration-200 ease-out"
        >
          Explore financial workflow
        </Button>
      </CardContent>
    </Card>
  );
}
