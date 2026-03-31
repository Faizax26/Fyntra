import { NotificationsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function NotificationsPage() {
  const data = await getAppData();

  return <NotificationsView data={data} />;
}
