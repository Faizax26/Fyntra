import {
  ArrowRightLeft,
  ChartNoAxesCombined,
  Goal,
  LayoutDashboard,
  PiggyBank,
  Receipt,
  Scale,
  Settings,
  Wallet
} from "lucide-react";

import type { AppNavItem } from "@/lib/types";

export const appNavigation: AppNavItem[] = [
  {
    href: "/app/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Track balances, cashflow, and key financial health signals."
  },
  {
    href: "/app/wallets",
    label: "Wallets",
    icon: Wallet,
    description: "Manage all sources of funds in one organized place."
  },
  {
    href: "/app/transactions",
    label: "Transactions",
    icon: ArrowRightLeft,
    description: "Review manual income, expense, and transfer activity."
  },
  {
    href: "/app/budget",
    label: "Budget",
    icon: Receipt,
    description: "Set spending limits and watch category performance."
  },
  {
    href: "/app/goals",
    label: "Goals",
    icon: Goal,
    description: "Follow progress for savings milestones and target dates."
  },
  {
    href: "/app/assets",
    label: "Assets",
    icon: PiggyBank,
    description: "Monitor the value of long-term holdings and investments."
  },
  {
    href: "/app/debts",
    label: "Debts",
    icon: Scale,
    description: "Keep payable and receivable balances visible."
  },
  {
    href: "/app/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
    description: "Understand trends across cashflow, savings, and budgets."
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: Settings,
    description: "Tune notifications, theme, and account preferences."
  }
];
