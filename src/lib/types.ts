export type ThemeMode = "light" | "dark" | "system";
export type UserPlan = "free" | "premium";
export type CategoryType = "income" | "expense";
export type TransactionType = "income" | "expense" | "transfer";
export type DebtType = "payable" | "receivable";
export type NotificationChannel = "push" | "email" | "in-app";
export type ReminderStatus = "today" | "upcoming" | "done";

export interface User {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  twoFactorEnabled: boolean;
  theme: ThemeMode;
  aiCredits: number;
  notificationSettings: Record<NotificationChannel, boolean>;
}

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  balance: number;
  type: "bank" | "e-wallet" | "cash" | "goal";
  changePercent: number;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
}

export interface Transaction {
  id: string;
  walletId: string;
  categoryId: string;
  amount: number;
  date: string;
  type: TransactionType;
  notes: string;
  debtId?: string;
  assetId?: string;
  goalId?: string;
  merchant: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  amountLimit: number;
  spent: number;
  monthYear: string;
}

export interface Asset {
  id: string;
  userId: string;
  name: string;
  value: number;
  costBasis: number;
  allocation: number;
  trend: number;
}

export interface Debt {
  id: string;
  userId: string;
  type: DebtType;
  amount: number;
  person: string;
  dueDate: string;
  paid: number;
}

export interface Goal {
  id: string;
  userId: string;
  walletId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  deviceInfo: string;
  severity: "info" | "warning";
}

export interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: ReminderStatus;
  category: string;
}

export interface SubscriptionPlan {
  id: UserPlan;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  unread: boolean;
  channel: NotificationChannel;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
  assetValue: number;
  debtValue: number;
}

export interface CashflowSeries {
  label: string;
  income: number;
  expense: number;
}

export interface BudgetProgress {
  name: string;
  spent: number;
  limit: number;
}

export interface AssetAllocation {
  name: string;
  value: number;
  fill: string;
}

export interface GoalProgress {
  name: string;
  current: number;
  target: number;
  deadline: string;
}

export interface DebtOverview {
  label: string;
  value: number;
}

export interface AuditEventGroup {
  date: string;
  items: AuditLog[];
}
