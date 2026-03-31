import { DebtsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function DebtsPage() {
  const data = await getAppData();

  return <DebtsView data={data} />;
}
