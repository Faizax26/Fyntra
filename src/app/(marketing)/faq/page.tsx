import { FaqPageContent } from "@/components/marketing-sections";
import { getAppData } from "@/lib/data";

export default async function FaqPage() {
  const data = await getAppData();

  return <FaqPageContent data={data} />;
}
