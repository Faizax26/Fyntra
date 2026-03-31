import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status
}: {
  status: "healthy" | "warning" | "info";
}) {
  if (status === "healthy") {
    return <Badge variant="success">On Track</Badge>;
  }

  if (status === "warning") {
    return <Badge variant="warning">Needs Attention</Badge>;
  }

  return <Badge variant="secondary">Info</Badge>;
}
