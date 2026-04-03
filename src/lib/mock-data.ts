import type { DashboardSnapshot, DemoUser } from "@/lib/types";

export const demoUser: DemoUser = {
  name: "Faiza Akbar",
  email: "faiza@fyntra.id",
  plan: "free",
  notifications: [
    {
      id: "notif-budget",
      title: "Budget nearly full",
      body: "Dining budget has reached 86% of this month's limit."
    },
    {
      id: "notif-goal",
      title: "Goal progress updated",
      body: "Emergency fund is up 8% since last week."
    }
  ]
};

export const dashboardSnapshot: DashboardSnapshot = {
  metrics: [
    { label: "Total balance", value: 28750000, delta: "+8.2% vs last month", tone: "primary" },
    { label: "Income this month", value: 16800000, delta: "+1 freelance payout", tone: "positive" },
    { label: "Expense this month", value: 7420000, delta: "42% of monthly inflow", tone: "neutral" }
  ],
  wallets: [
    { id: "wallet-1", name: "BCA Payroll", balance: 16250000, type: "Bank" },
    { id: "wallet-2", name: "GoPay Daily", balance: 1250000, type: "E-wallet" },
    { id: "wallet-3", name: "Cash Reserve", balance: 750000, type: "Cash" },
    { id: "wallet-4", name: "Emergency Fund", balance: 10500000, type: "Goal wallet" }
  ],
  walletDetails: [
    {
      walletId: "wallet-1",
      trend: [
        { label: "11 Mar", income: 0, expense: 220000 },
        { label: "12 Mar", income: 14500000, expense: 0 },
        { label: "13 Mar", income: 850000, expense: 560000 },
        { label: "14 Mar", income: 0, expense: 138000 },
        { label: "15 Mar", income: 0, expense: 420000 },
        { label: "16 Mar", income: 0, expense: 489000 },
        { label: "17 Mar", income: 375000, expense: 260000 }
      ],
      transactions: [
        { id: "wallet-1-tx-1", title: "Monthly salary", date: "2025-03-12T08:00:00.000Z", amount: 14500000, type: "income" },
        { id: "wallet-1-tx-2", title: "Freelance payout", date: "2025-03-13T14:20:00.000Z", amount: 850000, type: "income" },
        { id: "wallet-1-tx-3", title: "Apartment rent", date: "2025-03-15T02:15:00.000Z", amount: 3200000, type: "expense" },
        { id: "wallet-1-tx-4", title: "Internet bill", date: "2025-03-16T13:15:00.000Z", amount: 489000, type: "expense" },
        { id: "wallet-1-tx-5", title: "Transfer to GoPay", date: "2025-03-17T10:10:00.000Z", amount: 300000, type: "transfer" }
      ]
    },
    {
      walletId: "wallet-2",
      trend: [
        { label: "11 Mar", income: 120000, expense: 54000 },
        { label: "12 Mar", income: 300000, expense: 85000 },
        { label: "13 Mar", income: 0, expense: 42000 },
        { label: "14 Mar", income: 0, expense: 138000 },
        { label: "15 Mar", income: 150000, expense: 72000 },
        { label: "16 Mar", income: 0, expense: 98000 },
        { label: "17 Mar", income: 250000, expense: 64000 }
      ],
      transactions: [
        { id: "wallet-2-tx-1", title: "Top up from BCA", date: "2025-03-12T09:40:00.000Z", amount: 300000, type: "income" },
        { id: "wallet-2-tx-2", title: "Coffee and lunch", date: "2025-03-14T05:00:00.000Z", amount: 138000, type: "expense" },
        { id: "wallet-2-tx-3", title: "Ride to office", date: "2025-03-15T00:35:00.000Z", amount: 42000, type: "expense" },
        { id: "wallet-2-tx-4", title: "Cashback rewards", date: "2025-03-17T03:15:00.000Z", amount: 250000, type: "income" },
        { id: "wallet-2-tx-5", title: "Dinner order", date: "2025-03-17T12:30:00.000Z", amount: 64000, type: "expense" }
      ]
    },
    {
      walletId: "wallet-3",
      trend: [
        { label: "11 Mar", income: 50000, expense: 0 },
        { label: "12 Mar", income: 0, expense: 35000 },
        { label: "13 Mar", income: 0, expense: 0 },
        { label: "14 Mar", income: 100000, expense: 22000 },
        { label: "15 Mar", income: 0, expense: 18000 },
        { label: "16 Mar", income: 0, expense: 0 },
        { label: "17 Mar", income: 75000, expense: 30000 }
      ],
      transactions: [
        { id: "wallet-3-tx-1", title: "Cash withdrawal", date: "2025-03-11T10:00:00.000Z", amount: 50000, type: "income" },
        { id: "wallet-3-tx-2", title: "Parking", date: "2025-03-12T12:00:00.000Z", amount: 35000, type: "expense" },
        { id: "wallet-3-tx-3", title: "Laundry", date: "2025-03-14T04:30:00.000Z", amount: 22000, type: "expense" },
        { id: "wallet-3-tx-4", title: "Family reimbursement", date: "2025-03-17T06:45:00.000Z", amount: 75000, type: "income" },
        { id: "wallet-3-tx-5", title: "Street snacks", date: "2025-03-17T13:20:00.000Z", amount: 30000, type: "expense" }
      ]
    },
    {
      walletId: "wallet-4",
      trend: [
        { label: "11 Mar", income: 500000, expense: 0 },
        { label: "12 Mar", income: 0, expense: 0 },
        { label: "13 Mar", income: 750000, expense: 0 },
        { label: "14 Mar", income: 0, expense: 0 },
        { label: "15 Mar", income: 750000, expense: 0 },
        { label: "16 Mar", income: 0, expense: 0 },
        { label: "17 Mar", income: 1000000, expense: 0 }
      ],
      transactions: [
        { id: "wallet-4-tx-1", title: "Automatic savings", date: "2025-03-11T08:10:00.000Z", amount: 500000, type: "income" },
        { id: "wallet-4-tx-2", title: "Goal transfer", date: "2025-03-13T09:15:00.000Z", amount: 750000, type: "income" },
        { id: "wallet-4-tx-3", title: "Emergency fund top up", date: "2025-03-15T10:30:00.000Z", amount: 750000, type: "income" },
        { id: "wallet-4-tx-4", title: "Monthly reserve", date: "2025-03-17T07:45:00.000Z", amount: 1000000, type: "income" },
        { id: "wallet-4-tx-5", title: "Interest adjustment", date: "2025-03-17T15:00:00.000Z", amount: 50000, type: "income" }
      ]
    }
  ],
  transactions: [
    {
      id: "trx-1",
      title: "Monthly salary",
      category: "Income",
      amount: 14500000,
      date: "2025-03-01T08:00:00.000Z",
      type: "income"
    },
    {
      id: "trx-2",
      title: "Coffee and lunch",
      category: "Dining",
      amount: 138000,
      date: "2025-03-14T05:00:00.000Z",
      type: "expense"
    },
    {
      id: "trx-3",
      title: "Emergency fund top up",
      category: "Goal transfer",
      amount: 750000,
      date: "2025-03-15T10:30:00.000Z",
      type: "transfer"
    },
    {
      id: "trx-4",
      title: "Internet bill",
      category: "Utilities",
      amount: 489000,
      date: "2025-03-16T13:15:00.000Z",
      type: "expense"
    }
  ],
  budgets: [
    { id: "budget-1", category: "Dining", spent: 1290000, limit: 1500000 },
    { id: "budget-2", category: "Transport", spent: 560000, limit: 800000 },
    { id: "budget-3", category: "Utilities", spent: 1040000, limit: 1200000 }
  ],
  goals: [
    { id: "goal-1", name: "Emergency fund", current: 10500000, target: 24000000, deadline: "2025-12-30T00:00:00.000Z" },
    { id: "goal-2", name: "Japan trip", current: 6200000, target: 18000000, deadline: "2025-10-15T00:00:00.000Z" },
    { id: "goal-3", name: "New MacBook", current: 7400000, target: 25000000, deadline: "2026-02-01T00:00:00.000Z" }
  ],
  cashflow: [
    { month: "Nov", income: 12.5, expense: 7.2 },
    { month: "Dec", income: 13.8, expense: 8.3 },
    { month: "Jan", income: 15.1, expense: 8.9 },
    { month: "Feb", income: 14.4, expense: 8.1 },
    { month: "Mar", income: 16.8, expense: 7.4 }
  ],
  quickActions: [
    { id: "add-transaction", label: "Add transaction", description: "Record today's spending or income." },
    { id: "add-wallet", label: "Add wallet", description: "Create a new account, cash, or e-wallet source." },
    { id: "set-budget", label: "Set budget", description: "Define a monthly cap for a spending category." },
    { id: "create-goal", label: "Create goal", description: "Start a savings target with a clear destination." }
  ]
};

const pageMeta = new Map<string, { title: string; subtitle: string }>([
  ["/app/dashboard", { title: "Dashboard", subtitle: "A calm view of your balances, budgets, and momentum." }],
  ["/app/wallets", { title: "Wallets", subtitle: "Keep every account, cash balance, and reserve fund in sync." }],
  ["/app/transactions", { title: "Transactions", subtitle: "Capture every inflow and outflow with better context." }],
  ["/app/budget", { title: "Budget", subtitle: "Set monthly guardrails that are easy to understand." }],
  ["/app/goals", { title: "Goals", subtitle: "Track savings targets without losing the bigger picture." }],
  ["/app/assets", { title: "Assets", subtitle: "Monitor investment and asset growth from one place." }],
  ["/app/debts", { title: "Debts", subtitle: "Stay clear on what you owe and what is owed to you." }],
  ["/app/analytics", { title: "Analytics", subtitle: "Read trends and spending patterns without clutter." }],
  ["/app/settings", { title: "Settings", subtitle: "Prepare account, notification, and theme preferences." }]
]);

export function getPageMeta(pathname: string) {
  return pageMeta.get(pathname) ?? pageMeta.get("/app/dashboard")!;
}
