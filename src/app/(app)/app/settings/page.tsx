import { SettingsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function SettingsPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const data = await getAppData();
  const resolvedSearchParams = await searchParams;

  return <SettingsView data={data} initialTab={resolvedSearchParams?.tab} />;
}
