import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ModulePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="relative">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-r from-primary/16 via-emerald-500/12 to-sky-400/14" />
          <div className="relative">
            <p className="eyebrow">Next phase</p>
            <CardTitle className="mt-2 text-3xl tracking-[-0.05em]">{title}</CardTitle>
            <CardDescription className="mt-3 max-w-2xl text-base">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border bg-background/55 p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">Scaffold ready</h3>
                <p className="text-sm text-muted-foreground">This module already lives inside the full shell and navigation flow.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border bg-background/55 p-5">
            <h3 className="font-semibold">Planned next</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Data forms, empty states, status indicators, and full business logic will land in the next implementation phase.
            </p>
            <Button variant="secondary" className="mt-4">
              Planned feature set
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
