import { delay } from "@/lib/utils";
import {
  assets,
  auditLogs,
  budgets,
  cashflowSeries,
  categories,
  currentUser,
  debts,
  faqItems,
  featureHighlights,
  goals,
  landingStats,
  notifications,
  reminders,
  subscriptionPlans,
  transactions,
  wallets
} from "@/lib/mock-data";
import type {
  AssetAllocation,
  AuditEventGroup,
  BudgetProgress,
  DashboardSummary,
  DebtOverview,
  GoalProgress
} from "@/lib/types";

export async function getAppData() {
  await delay();

  const dashboardSummary: DashboardSummary = {
    totalBalance: wallets.reduce((sum, wallet) => sum + wallet.balance, 0),
    monthlyIncome: transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0),
    monthlyExpense: transactions.filter((item) => item.type !== "income").reduce((sum, item) => sum + item.amount, 0),
    savingsRate: 31,
    assetValue: assets.reduce((sum, item) => sum + item.value, 0),
    debtValue: debts.reduce((sum, item) => sum + item.amount, 0)
  };

  const budgetProgress: BudgetProgress[] = budgets.map((budget) => ({
    name: categories.find((category) => category.id === budget.categoryId)?.name ?? "Kategori",
    spent: budget.spent,
    limit: budget.amountLimit
  }));

  const goalProgress: GoalProgress[] = goals.map((goal) => ({
    name: goal.name,
    current: goal.currentAmount,
    target: goal.targetAmount,
    deadline: goal.deadline
  }));

  const assetAllocation: AssetAllocation[] = assets.map((asset, index) => ({
    name: asset.name,
    value: asset.value,
    fill: ["#0d9488", "#84cc16", "#f59e0b"][index % 3]
  }));

  const debtOverview: DebtOverview[] = [
    {
      label: "Utang berjalan",
      value: debts.filter((item) => item.type === "payable").reduce((sum, item) => sum + item.amount, 0)
    },
    {
      label: "Piutang aktif",
      value: debts.filter((item) => item.type === "receivable").reduce((sum, item) => sum + item.amount, 0)
    }
  ];

  const auditEventGroups: AuditEventGroup[] = auditLogs.reduce<AuditEventGroup[]>((groups, log) => {
    const date = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(new Date(log.timestamp));
    const group = groups.find((item) => item.date === date);

    if (group) {
      group.items.push(log);
      return groups;
    }

    return [...groups, { date, items: [log] }];
  }, []);

  return {
    currentUser,
    wallets,
    categories,
    transactions,
    budgets,
    assets,
    debts,
    goals,
    reminders,
    notifications,
    auditLogs,
    subscriptionPlans,
    cashflowSeries,
    dashboardSummary,
    budgetProgress,
    goalProgress,
    assetAllocation,
    debtOverview,
    auditEventGroups,
    landingStats,
    featureHighlights,
    faqItems
  };
}

export type AppData = Awaited<ReturnType<typeof getAppData>>;
