import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  actionLabel
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <Card className="surface-elevated border-dashed">
      <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-2)] text-secondary-foreground">
          <Inbox className="size-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
        {actionLabel ? <Button variant="outline">{actionLabel}</Button> : null}
      </CardContent>
    </Card>
  );
}
