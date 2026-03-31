import {
  Activity,
  Bell,
  BookOpen,
  CircleDollarSign,
  CreditCard,
  Goal,
  LayoutDashboard,
  LineChart,
  Repeat,
  Settings,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

export const marketingNav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" }
];

export const appNav = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/wallets", label: "Wallets", icon: WalletCards },
  { href: "/app/transactions", label: "Transactions", icon: CircleDollarSign },
  { href: "/app/budgets", label: "Budgets", icon: CreditCard },
  { href: "/app/assets", label: "Assets", icon: LineChart },
  { href: "/app/debts", label: "Debts", icon: Activity },
  { href: "/app/goals", label: "Goals", icon: Goal },
  { href: "/app/analytics", label: "Analytics", icon: Sparkles },
  { href: "/app/automations", label: "Automations", icon: Repeat },
  { href: "/app/reminders", label: "Reminders", icon: Bell },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/audit-logs", label: "Audit Logs", icon: ShieldCheck },
  { href: "/app/settings", label: "Settings", icon: Settings },
  { href: "/app/help", label: "Help", icon: BookOpen }
];
