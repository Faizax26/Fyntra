"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuickAction } from "@/lib/types";

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
        <CardDescription>Presentational shortcuts for the next feature phase.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => toast.info(`${action.label} is part of the next feature phase.`)}
            className="rounded-3xl border bg-background/55 p-4 text-left transition hover:border-primary/35 hover:bg-background"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Plus className="size-4" />
              </span>
              <div>
                <p className="font-medium">{action.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
        <Button variant="secondary" className="sm:col-span-2">
          View full workflow plan
        </Button>
      </CardContent>
    </Card>
  );
}
