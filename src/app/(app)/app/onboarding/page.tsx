import { OnboardingView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

export default async function OnboardingPage() {
  const data = await getAppData();

  return <OnboardingView data={data} />;
}
