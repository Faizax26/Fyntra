import { GoalsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function GoalsPage() {
  const data = await getAppData();

  return <GoalsView data={data} />;
}
