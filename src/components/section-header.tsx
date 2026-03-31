import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  action
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>
      {action ? action : actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  );
}
