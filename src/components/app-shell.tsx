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
      <AppSidebar user={user} />
      <div className="min-w-0">
        <Topbar notifications={notifications} user={user} />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
