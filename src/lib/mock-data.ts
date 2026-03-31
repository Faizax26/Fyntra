import type {
  Asset,
  AuditLog,
  Budget,
  CashflowSeries,
  Category,
  Debt,
  Goal,
  NotificationItem,
  Reminder,
  SubscriptionPlan,
  Transaction,
  User,
  Wallet
} from "@/lib/types";

export const currentUser: User = {
  id: "user_1",
  email: "faiza@fyntra.id",
  name: "Faiza Akbar",
  plan: "premium",
  twoFactorEnabled: true,
  theme: "system",
  aiCredits: 118,
  notificationSettings: {
    push: true,
    email: true,
    "in-app": true
  }
};

export const categories: Category[] = [
  { id: "cat_1", userId: "user_1", name: "Gaji", type: "income" },
  { id: "cat_2", userId: "user_1", name: "Makanan", type: "expense" },
  { id: "cat_3", userId: "user_1", name: "Transportasi", type: "expense" },
  { id: "cat_4", userId: "user_1", name: "Investasi", type: "expense" },
  { id: "cat_5", userId: "user_1", name: "Tagihan", type: "expense" },
  { id: "cat_6", userId: "user_1", name: "Freelance", type: "income" }
];

export const wallets: Wallet[] = [
  { id: "wallet_1", userId: "user_1", name: "BCA Payroll", balance: 18450000, type: "bank", changePercent: 12.8 },
  { id: "wallet_2", userId: "user_1", name: "GoPay Daily", balance: 1650000, type: "e-wallet", changePercent: -4.3 },
  { id: "wallet_3", userId: "user_1", name: "Cash Reserve", balance: 920000, type: "cash", changePercent: 3.1 },
  { id: "wallet_4", userId: "user_1", name: "Emergency Fund", balance: 8700000, type: "goal", changePercent: 18.2 }
];

export const transactions: Transaction[] = [
  {
    id: "trx_1",
    walletId: "wallet_1",
    categoryId: "cat_1",
    amount: 15000000,
    date: "2025-03-01T08:30:00.000Z",
    type: "income",
    notes: "Salary credited",
    merchant: "PT Nusantara"
  },
  {
    id: "trx_2",
    walletId: "wallet_2",
    categoryId: "cat_2",
    amount: 125000,
    date: "2025-03-08T04:40:00.000Z",
    type: "expense",
    notes: "Lunch meeting",
    merchant: "Kopi Toko Djawa"
  },
  {
    id: "trx_3",
    walletId: "wallet_1",
    categoryId: "cat_4",
    amount: 2500000,
    date: "2025-03-09T02:10:00.000Z",
    type: "expense",
    notes: "Monthly mutual fund",
    assetId: "asset_1",
    merchant: "Bibit"
  },
  {
    id: "trx_4",
    walletId: "wallet_1",
    categoryId: "cat_5",
    amount: 720000,
    date: "2025-03-11T13:20:00.000Z",
    type: "expense",
    notes: "Internet bill",
    merchant: "Biznet"
  },
  {
    id: "trx_5",
    walletId: "wallet_1",
    categoryId: "cat_6",
    amount: 3200000,
    date: "2025-03-13T10:15:00.000Z",
    type: "income",
    notes: "Landing page project",
    merchant: "Client Retainer"
  },
  {
    id: "trx_6",
    walletId: "wallet_4",
    categoryId: "cat_4",
    amount: 850000,
    date: "2025-03-14T09:20:00.000Z",
    type: "transfer",
    notes: "Emergency fund top up",
    goalId: "goal_1",
    merchant: "Internal Transfer"
  },
  {
    id: "trx_7",
    walletId: "wallet_1",
    categoryId: "cat_3",
    amount: 275000,
    date: "2025-03-15T01:10:00.000Z",
    type: "expense",
    notes: "Weekly commute",
    debtId: "debt_1",
    merchant: "Bluebird"
  }
];

export const budgets: Budget[] = [
  { id: "budget_1", categoryId: "cat_2", amountLimit: 1800000, spent: 1520000, monthYear: "2025-03" },
  { id: "budget_2", categoryId: "cat_3", amountLimit: 900000, spent: 710000, monthYear: "2025-03" },
  { id: "budget_3", categoryId: "cat_5", amountLimit: 1200000, spent: 1140000, monthYear: "2025-03" }
];

export const assets: Asset[] = [
  { id: "asset_1", userId: "user_1", name: "Reksa Dana Pasar Uang", value: 15200000, costBasis: 13800000, allocation: 34, trend: 9.8 },
  { id: "asset_2", userId: "user_1", name: "Emas Digital", value: 9800000, costBasis: 8450000, allocation: 22, trend: 12.1 },
  { id: "asset_3", userId: "user_1", name: "US Equity ETF", value: 19700000, costBasis: 18500000, allocation: 44, trend: 6.7 }
];

export const debts: Debt[] = [
  { id: "debt_1", userId: "user_1", type: "payable", amount: 1750000, person: "Kartu Kredit BCA", dueDate: "2025-03-24T00:00:00.000Z", paid: 625000 },
  { id: "debt_2", userId: "user_1", type: "receivable", amount: 2400000, person: "Raka", dueDate: "2025-03-27T00:00:00.000Z", paid: 600000 }
];

export const goals: Goal[] = [
  { id: "goal_1", userId: "user_1", walletId: "wallet_4", name: "Dana Darurat 12 Bulan", targetAmount: 24000000, currentAmount: 8700000, deadline: "2025-12-30T00:00:00.000Z" },
  { id: "goal_2", userId: "user_1", walletId: "wallet_1", name: "Liburan Jepang", targetAmount: 18000000, currentAmount: 5400000, deadline: "2025-10-15T00:00:00.000Z" }
];

export const cashflowSeries: CashflowSeries[] = [
  { label: "Nov", income: 14.2, expense: 9.8 },
  { label: "Des", income: 15.7, expense: 10.3 },
  { label: "Jan", income: 17.3, expense: 11.5 },
  { label: "Feb", income: 16.4, expense: 10.9 },
  { label: "Mar", income: 18.2, expense: 12.4 }
];

export const reminders: Reminder[] = [
  { id: "rem_1", title: "Tagihan listrik rumah", amount: 465000, dueDate: "2025-03-19T00:00:00.000Z", status: "today", category: "Utilities" },
  { id: "rem_2", title: "Netflix family plan", amount: 186000, dueDate: "2025-03-22T00:00:00.000Z", status: "upcoming", category: "Subscription" },
  { id: "rem_3", title: "Input cash spending harian", amount: 0, dueDate: "2025-03-16T00:00:00.000Z", status: "done", category: "Habit" }
];

export const notifications: NotificationItem[] = [
  { id: "notif_1", title: "Budget hampir habis", body: "Budget kategori Tagihan sudah terpakai 95%.", createdAt: "2025-03-16T03:12:00.000Z", unread: true, channel: "in-app" },
  { id: "notif_2", title: "AI insight ready", body: "Ada 3 peluang penghematan berdasarkan pola minggu ini.", createdAt: "2025-03-15T12:02:00.000Z", unread: true, channel: "push" },
  { id: "notif_3", title: "2FA aktif", body: "Perangkat baru berhasil diverifikasi dengan aman.", createdAt: "2025-03-14T09:10:00.000Z", unread: false, channel: "email" }
];

export const auditLogs: AuditLog[] = [
  { id: "audit_1", userId: "user_1", action: "LOGIN_SUCCESS", timestamp: "2025-03-16T07:40:00.000Z", deviceInfo: "MacBook Pro, Chrome 134, Jakarta", severity: "info" },
  { id: "audit_2", userId: "user_1", action: "UPDATE_TRANSACTION", timestamp: "2025-03-15T11:22:00.000Z", deviceInfo: "iPhone 15, Safari, Jakarta", severity: "info" },
  { id: "audit_3", userId: "user_1", action: "NEW_DEVICE_VERIFIED", timestamp: "2025-03-14T09:09:00.000Z", deviceInfo: "MacBook Pro, Chrome 134, Jakarta", severity: "warning" }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "Rp0",
    description: "Untuk mulai rapikan cashflow tanpa hambatan.",
    features: ["3 wallets", "Budget dasar", "Laporan bulanan", "Reminder standar"]
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rp79.000/bulan",
    description: "Untuk pengguna yang butuh insight, AI, dan kontrol penuh.",
    features: ["Unlimited wallets", "Advanced analytics", "AI assistant", "Priority support", "Audit & security center"]
  }
];

export const landingStats = [
  { label: "Transaksi dicatat", value: "2.4M+" },
  { label: "Dana terkelola", value: "Rp148B" },
  { label: "Goal tercapai", value: "38K+" },
  { label: "Retention 90 hari", value: "81%" }
];

export const featureHighlights = [
  {
    title: "Budgeting yang terasa ringan",
    description: "Pantau kategori yang hampir overspend, atur limit bulanan, dan lihat saran penyesuaian secara instan."
  },
  {
    title: "Asset, debt, dan goal di satu alur",
    description: "Setiap transaksi bisa langsung menggerakkan progres tabungan, portofolio, dan utang tanpa spreadsheet terpisah."
  },
  {
    title: "Security center yang jelas",
    description: "Audit log, device history, dan 2FA dibuat mudah dipahami pengguna awam tanpa jargon teknis."
  }
];

export const faqItems = [
  {
    question: "Apakah data saya aman?",
    answer: "Desain produk ini menempatkan audit log, 2FA, dan kontrol perangkat sebagai bagian inti pengalaman, bukan fitur tambahan."
  },
  {
    question: "Apakah fyntra. cocok untuk pemula?",
    answer: "Ya. Semua modul memakai bahasa sederhana, indikator visual, dan quick actions agar pengguna non-akuntan tetap nyaman."
  },
  {
    question: "Apa bedanya Free dan Premium?",
    answer: "Premium membuka wallet tanpa batas, analitik mendalam, AI insights, dan pengelolaan finansial lintas modul yang lebih lengkap."
  }
];
