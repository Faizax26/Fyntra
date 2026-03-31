import { SettingsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function SettingsPage() {
  const data = await getAppData();

  return <SettingsView data={data} />;
}
