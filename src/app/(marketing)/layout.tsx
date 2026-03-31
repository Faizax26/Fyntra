import { MarketingLayout } from "@/components/marketing-layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
