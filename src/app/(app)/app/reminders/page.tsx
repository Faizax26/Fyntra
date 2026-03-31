import { RemindersView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function RemindersPage() {
  const data = await getAppData();

  return <RemindersView data={data} />;
}
