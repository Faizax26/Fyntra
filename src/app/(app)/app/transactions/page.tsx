import { TransactionsView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function TransactionsPage() {
  const data = await getAppData();

  return <TransactionsView data={data} />;
}
