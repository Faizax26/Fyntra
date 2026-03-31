import { BudgetsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function BudgetsPage() {
  const data = await getAppData();

  return <BudgetsView data={data} />;
}
