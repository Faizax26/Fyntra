import { AppShell } from "@/components/app-shell";
import { getAppData } from "@/lib/data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getAppData();

  return (
    <AppShell user={data.currentUser} notifications={data.notifications}>
      {children}
    </AppShell>
  );
}
