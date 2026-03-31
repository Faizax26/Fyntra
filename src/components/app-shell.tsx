import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import type { NotificationItem, User } from "@/lib/types";

export function AppShell({
  children,
  user,
  notifications
}: {
  children: React.ReactNode;
  user: User;
  notifications: NotificationItem[];
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-workspace-wash),transparent_28%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))] lg:grid lg:grid-cols-[auto_1fr]">
      <AppSidebar />
      <div className="min-w-0">
        <Topbar notifications={notifications} user={user} />
        <main className="w-full px-4 py-6 lg:px-4 lg:py-8 xl:px-6">{children}</main>
      </div>
    </div>
  );
}
