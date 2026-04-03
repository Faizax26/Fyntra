import type { LucideIcon } from "lucide-react";

export type AppNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export type DashboardMetric = {
  label: string;
  value: number;
  delta: string;
  tone: "primary" | "positive" | "neutral";
};

export type WalletSummary = {
  id: string;
  name: string;
  balance: number;
  type: string;
};

export type WalletTrendPoint = {
  label: string;
  income: number;
  expense: number;
};

export type WalletActivity = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "income" | "expense" | "transfer";
};

export type WalletDetail = {
  walletId: string;
  trend: WalletTrendPoint[];
  transactions: WalletActivity[];
};

export type TransactionSummary = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense" | "transfer";
};

export type BudgetSummary = {
  id: string;
  category: string;
  spent: number;
  limit: number;
};

export type GoalSummary = {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
};

export type CashflowPoint = {
  month: string;
  income: number;
  expense: number;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
};

export type DashboardSnapshot = {
  metrics: DashboardMetric[];
  wallets: WalletSummary[];
  walletDetails: WalletDetail[];
  transactions: TransactionSummary[];
  budgets: BudgetSummary[];
  goals: GoalSummary[];
  cashflow: CashflowPoint[];
  quickActions: QuickAction[];
};

export type DemoUser = {
  name: string;
  email: string;
  plan: "free" | "premium";
  notifications: {
    id: string;
    title: string;
    body: string;
  }[];
};
