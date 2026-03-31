import { Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InsightPanel({
  title,
  description,
  bullets
}: {
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <Card className="overflow-hidden border-primary/15 bg-linear-to-br from-[#15322d] via-[#102520] to-[#1a2f1f] text-white shadow-[0_30px_90px_-46px_rgba(8,18,13,0.9)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-lime-300">
            <Sparkles className="size-5" />
          </div>
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-white/65">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/82">
              {bullet}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
