import { UpgradeView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function UpgradePage() {
  const data = await getAppData();

  return <UpgradeView data={data} />;
}
