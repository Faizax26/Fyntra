import { LandingPage } from "@/components/marketing-sections";
import { getAppData } from "@/lib/data";

export default async function HomePage() {
  const data = await getAppData();

  return <LandingPage data={data} />;
}
