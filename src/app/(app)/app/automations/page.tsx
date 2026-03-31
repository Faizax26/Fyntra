import { AutomationsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function AutomationsPage() {
  const data = await getAppData();

  return <AutomationsView data={data} />;
}
