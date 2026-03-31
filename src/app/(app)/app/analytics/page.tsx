import { AnalyticsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function AnalyticsPage() {
  const data = await getAppData();

  return <AnalyticsView data={data} />;
}
