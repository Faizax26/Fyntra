import { FeaturesPageContent } from "@/components/marketing-sections";
import { getAppData } from "@/lib/data";

export default async function FeaturesPage() {
  const data = await getAppData();

  return <FeaturesPageContent data={data} />;
}
