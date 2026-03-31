import { Crown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { UserPlan } from "@/lib/types";

export function PlanBadge({ plan }: { plan: UserPlan }) {
  if (plan === "premium") {
    return (
      <Badge variant="warning" className="gap-1">
        <Crown className="size-3" />
        Premium
      </Badge>
    );
  }

  return <Badge variant="outline">Free</Badge>;
}
