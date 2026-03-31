import { PricingPageContent } from "@/components/marketing-sections";
import { getAppData } from "@/lib/data";

export default async function PricingPage() {
  const data = await getAppData();

  return <PricingPageContent data={data} />;
}
