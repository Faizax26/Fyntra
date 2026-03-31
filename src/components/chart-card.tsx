import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ChartCard({
  title,
  description,
  children,
  aside
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Card className="surface-card overflow-hidden">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="mt-1 max-w-xl">{description}</CardDescription>
        </div>
        {aside}
      </CardHeader>
      <CardContent className="rounded-t-[1.6rem] border-t border-border/60 bg-[color:var(--surface-2)] pt-6">{children}</CardContent>
    </Card>
  );
}
