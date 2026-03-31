import { redirect } from "next/navigation";

export default function AuditLogsPage() {
  redirect("/app/settings?tab=auditlog");
}
