import { WalletsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function WalletsPage() {
  const data = await getAppData();

  return <WalletsView data={data} />;
}
