import { AiInsight } from "@/components/dashboard/ai-insight";
import { BudgetProgressList } from "@/components/dashboard/budget-progress-list";
import { CashflowChart } from "@/components/dashboard/cashflow-chart";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FloatingActionFab } from "@/components/dashboard/floating-action-fab";
import { GoalsOverview } from "@/components/dashboard/goals-overview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { WalletOverview } from "@/components/dashboard/wallet-overview";
import { dashboardSnapshot } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4">
        <DashboardHeader />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.35fr_0.82fr_0.82fr]">
          {dashboardSnapshot.metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} featured={metric.label === "Total balance"} />
          ))}
        </div>
      </section>
      <section>
        <WalletOverview wallets={dashboardSnapshot.wallets} details={dashboardSnapshot.walletDetails} />
      </section>
      <section className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0">
          <CashflowChart data={dashboardSnapshot.cashflow} />
        </div>
        <div className="min-w-0">
          <AiInsight />
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <BudgetProgressList budgets={dashboardSnapshot.budgets} />
        <GoalsOverview goals={dashboardSnapshot.goals} />
      </section>
      <section>
        <RecentTransactions transactions={dashboardSnapshot.transactions} />
      </section>
      <FloatingActionFab />
    </div>
  );
}
