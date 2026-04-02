import { BudgetProgressList } from "@/components/dashboard/budget-progress-list";
import { CashflowChart } from "@/components/dashboard/cashflow-chart";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { WalletOverview } from "@/components/dashboard/wallet-overview";
import { dashboardSnapshot } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4">
        <DashboardHeader />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardSnapshot.metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <CashflowChart data={dashboardSnapshot.cashflow} />
        <QuickActions actions={dashboardSnapshot.quickActions} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentTransactions transactions={dashboardSnapshot.transactions} />
        <BudgetProgressList budgets={dashboardSnapshot.budgets} />
      </section>
      <section className="grid gap-6">
        <WalletOverview wallets={dashboardSnapshot.wallets} />
      </section>
    </div>
  );
}
