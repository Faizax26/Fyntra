import { AuditLogsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function AuditLogsPage() {
  const data = await getAppData();

  return <AuditLogsView data={data} />;
}
