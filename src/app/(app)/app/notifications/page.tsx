import { redirect } from "next/navigation";

export default function NotificationsPage() {
  redirect("/app/settings?tab=notification");
}
