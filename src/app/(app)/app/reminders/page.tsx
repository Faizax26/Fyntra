import { redirect } from "next/navigation";

export default function RemindersPage() {
  redirect("/app/settings?tab=notification");
}
