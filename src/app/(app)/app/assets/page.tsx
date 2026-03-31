import { AssetsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function AssetsPage() {
  const data = await getAppData();

  return <AssetsView data={data} />;
}
