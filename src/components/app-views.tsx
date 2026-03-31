"use client";

import Link from "next/link";
import { ArrowRightLeft, BellRing, BrainCircuit, CheckCircle2, Clock3, Download, ShieldCheck, TriangleAlert } from "lucide-react";

import { AllocationChart, BudgetBars, CashflowChart, GoalTimeline } from "@/components/charts";
import { ChartCard } from "@/components/chart-card";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { FormDrawer } from "@/components/form-drawer";
import { InsightPanel } from "@/components/insight-panel";
import { MetricCard } from "@/components/metric-card";
import { QuickActionBar } from "@/components/quick-action-bar";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { UpgradePrompt } from "@/components/upgrade-prompt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCompactCurrency, formatCurrency, formatDate, formatDateTime, formatPercent } from "@/lib/format";
import type { AppData } from "@/lib/data";

function linkedLabel(data: AppData, categoryId: string) {
  return data.categories.find((item) => item.id === categoryId)?.name ?? "Kategori";
}

export function DashboardView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <SectionHeader
          eyebrow="Overview"
          title="Financial cockpit yang terasa jelas."
          description="Pantau saldo total, cashflow, progress goal, budget alert, dan insight AI dari satu layar yang tidak penuh noise."
          action={<FormDrawer title="Tambah transaksi" description="Catat income, expense, atau transfer demo." triggerLabel="Tambah transaksi" />}
        />
        <Card className="surface-elevated overflow-hidden border-primary/15 bg-linear-to-br from-[#1a2b23] via-[#172520] to-[#223126] text-white">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-white/58">This month in one glance</p>
                <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em]">{formatCurrency(data.dashboardSummary.totalBalance)}</p>
              </div>
              <Badge variant="warning" className="border-white/10 bg-white/10 text-white">Live snapshot</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/8 bg-white/6 p-4">
                <p className="text-sm text-white/62">Income vs expense</p>
                <p className="mt-2 text-base text-white/88">{formatCompactCurrency(data.dashboardSummary.monthlyIncome)} masuk, {formatCompactCurrency(data.dashboardSummary.monthlyExpense)} keluar.</p>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-white/6 p-4">
                <p className="text-sm text-white/62">Primary nudge</p>
                <p className="mt-2 text-base text-white/88">Pindahkan sebagian freelance income ke dana darurat untuk percepat target tahunan.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <QuickActionBar />
      <div className="grid gap-4 xl:grid-cols-4">
        <MetricCard label="Total balance" value={data.dashboardSummary.totalBalance} trend={10.8} detail="Akumulasi semua wallet aktif." />
        <MetricCard label="Income bulan ini" value={data.dashboardSummary.monthlyIncome} trend={8.4} detail="Salary + freelance." />
        <MetricCard label="Expense bulan ini" value={data.dashboardSummary.monthlyExpense} trend={-2.1} detail="Termasuk transfer ke goal." />
        <MetricCard label="Asset value" value={data.dashboardSummary.assetValue} trend={6.9} detail={`Savings rate ${formatPercent(data.dashboardSummary.savingsRate)}`} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartCard title="Cashflow 5 bulan terakhir" description="Garis income dan expense ditata untuk membaca tren secara cepat." aside={<Badge variant="secondary">Live mock</Badge>}>
          <CashflowChart data={data.cashflowSeries} />
        </ChartCard>
        <InsightPanel
          title="AI weekly digest"
          description="Insight cerdas ini hanya frontend demo, tetapi copy dan hierarchy-nya disusun seperti fitur production."
          bullets={[
            "Pengeluaran makanan naik 13% minggu ini, terutama karena meeting di luar kantor.",
            "Emergency fund akan mencapai target 12 bulan sekitar 19 hari lebih cepat jika freelance income berikutnya dialokasikan 60%.",
            "Kategori tagihan mendekati limit dan perlu review sebelum auto debit berikutnya."
          ]}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ChartCard title="Budget health" description="Kategori yang mendekati limit diberi sinyal visual yang jelas.">
          <BudgetBars data={data.budgetProgress} />
        </ChartCard>
        <ChartCard title="Goal progress" description="Setiap goal terhubung dengan wallet khusus atau alokasi transaksi.">
          <GoalTimeline data={data.goalProgress} />
        </ChartCard>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="surface-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent transactions</CardTitle>
              <CardDescription>Terhubung dengan halaman transaksi, debt, asset, dan goal.</CardDescription>
            </div>
            <Button asChild variant="ghost">
              <Link href="/app/transactions">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-3">
                <div>
                  <p className="font-medium">{transaction.merchant}</p>
                  <p className="text-sm text-muted-foreground">{transaction.notes}</p>
                </div>
                <p className={transaction.type === "income" ? "text-lime-600 dark:text-lime-300" : ""}>{formatCurrency(transaction.amount)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-linear-to-b from-amber-500/8 to-transparent">
          <CardHeader>
            <CardTitle>Alerts & reminders</CardTitle>
            <CardDescription>Warning states yang paling penting selalu dekat dengan action area.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <TriangleAlert className="size-4" />
                <p className="font-medium">Budget tagihan hampir habis</p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">Rp1.140.000 dari Rp1.200.000 sudah terpakai. Review sebelum auto debit berikutnya.</p>
            </div>
            {data.reminders.slice(0, 2).map((reminder) => (
              <div key={reminder.id} className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{reminder.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(reminder.dueDate)}</p>
                  </div>
                  <Badge variant={reminder.status === "today" ? "warning" : "secondary"}>{reminder.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function WalletsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Wallets"
        title="Semua sumber dana di satu tempat."
        description="Kelola rekening bank, e-wallet, cash reserve, dan wallet khusus goal tanpa berpindah alat."
        action={<FormDrawer title="Tambah wallet demo" description="Simulasi membuat wallet baru." triggerLabel="Tambah wallet" />}
      />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {data.wallets.map((wallet) => (
          <Card key={wallet.id} className={wallet.type === "goal" ? "border-primary/35" : ""}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Badge variant={wallet.type === "goal" ? "default" : "secondary"}>{wallet.type}</Badge>
                <StatusBadge status={wallet.changePercent > 0 ? "healthy" : "info"} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{wallet.name}</p>
                <p className="mt-2 text-3xl font-semibold">{formatCompactCurrency(wallet.balance)}</p>
              </div>
              <p className="text-sm text-muted-foreground">{wallet.changePercent > 0 ? "+" : ""}{wallet.changePercent}% vs bulan lalu</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transfer antar-wallet</CardTitle>
              <CardDescription>Mock flow untuk memindahkan saldo antar sumber dana.</CardDescription>
            </div>
            <FormDrawer title="Transfer antar-wallet" description="Simulasi transfer internal." triggerLabel="Transfer" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Pindahkan cash reserve ke emergency fund saat saldo bulanan longgar.",
              "Pisahkan daily spend dari payroll account agar budget tracking lebih akurat.",
              "Setiap transfer goal wallet otomatis dihitung ke progress target."
            ].map((note) => (
              <div key={note} className="rounded-[22px] border border-border/70 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                {note}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wallet timeline</CardTitle>
            <CardDescription>Aktivitas yang paling relevan untuk setiap sumber dana.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.transactions.slice(0, 4).map((transaction) => (
              <div key={transaction.id} className="flex gap-4">
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <ArrowRightLeft className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{transaction.merchant}</p>
                  <p className="text-sm text-muted-foreground">{transaction.notes}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(transaction.date)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TransactionsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Transactions"
        title="Pencatatan transaksi yang tetap mudah dibaca."
        description="Filter, kategorisasi, dan keterkaitan ke debt, asset, atau goal ditampilkan langsung di tabel."
        action={<FormDrawer title="Tambah transaksi" description="Expense, income, atau transfer demo." triggerLabel="Tambah transaksi" />}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="surface-elevated"><CardContent className="p-5"><p className="eyebrow">Income</p><p className="metric-figure mt-2">{formatCompactCurrency(data.dashboardSummary.monthlyIncome)}</p></CardContent></Card>
        <Card className="surface-elevated"><CardContent className="p-5"><p className="eyebrow">Expense</p><p className="metric-figure mt-2">{formatCompactCurrency(data.dashboardSummary.monthlyExpense)}</p></CardContent></Card>
        <Card className="surface-elevated"><CardContent className="p-5"><p className="eyebrow">Linked flows</p><p className="metric-figure mt-2">3</p><p className="mt-1 text-sm text-muted-foreground">Debt, asset, dan goal relation aktif.</p></CardContent></Card>
      </div>
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Transaction ledger</CardTitle>
          <CardDescription>Searchable table dengan linked entity chips.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data.transactions}
            searchPlaceholder="Cari merchant, notes, atau nominal..."
            columns={[
              {
                key: "merchant",
                label: "Merchant",
                render: (row) => (
                  <div>
                    <p className="font-medium">{row.merchant}</p>
                    <p className="text-xs text-muted-foreground">{row.notes}</p>
                  </div>
                )
              },
              {
                key: "type",
                label: "Type",
                render: (row) => <Badge variant={row.type === "income" ? "success" : row.type === "transfer" ? "secondary" : "outline"}>{row.type}</Badge>
              },
              {
                key: "amount",
                label: "Amount",
                render: (row) => formatCurrency(row.amount)
              },
              {
                key: "links",
                label: "Linked",
                render: (row) => (
                  <div className="flex flex-wrap gap-2">
                    {row.assetId ? <Badge variant="secondary">Asset</Badge> : null}
                    {row.debtId ? <Badge variant="secondary">Debt</Badge> : null}
                    {row.goalId ? <Badge variant="secondary">Goal</Badge> : null}
                    {!row.assetId && !row.debtId && !row.goalId ? <span className="text-xs text-muted-foreground">Standalone</span> : null}
                  </div>
                )
              },
              {
                key: "date",
                label: "Date",
                render: (row) => formatDateTime(row.date)
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function BudgetsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Budgets"
        title="Budget per kategori, dengan warning yang langsung kelihatan."
        description="Ideal untuk pengguna yang butuh sinyal visual cepat saat spending mendekati limit."
        action={<FormDrawer title="Tambah budget" description="Set limit kategori bulanan." triggerLabel="Tambah budget" />}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <ChartCard title="Budget progress" description="Bar progress menonjolkan kategori paling rawan overspend.">
          <BudgetBars data={data.budgetProgress} />
        </ChartCard>
        <Card className="border-amber-500/20 bg-linear-to-b from-amber-500/8 to-transparent">
          <CardHeader>
            <CardTitle>Recommended adjustments</CardTitle>
            <CardDescription>AI-style recommendations dengan konteks yang mudah dipahami.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Turunkan limit kategori Tagihan 5% jika beberapa subscription tidak lagi dipakai.",
              "Pindahkan budget makanan ke transport jika intensitas meeting di luar naik bulan ini.",
              "Buat reminder review budget mingguan setiap Jumat sore."
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4 text-sm leading-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {data.budgets.map((budget) => (
          <Card key={budget.id} className="surface-elevated">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium">{linkedLabel(data, budget.categoryId)}</p>
                <Badge variant={budget.spent / budget.amountLimit > 0.9 ? "warning" : "success"}>{Math.round((budget.spent / budget.amountLimit) * 100)}%</Badge>
              </div>
              <Progress value={(budget.spent / budget.amountLimit) * 100} />
              <p className="text-sm text-muted-foreground">
                {formatCurrency(budget.spent)} dari {formatCurrency(budget.amountLimit)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AssetsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Assets"
        title="Portofolio yang ringkas tetapi tetap informatif."
        description="Nilai aset, alokasi, dan tren pertumbuhan dirangkum agar pengguna cepat memahami posisi mereka."
        action={<FormDrawer title="Tambah asset" description="Catat investasi atau aset fisik secara manual." triggerLabel="Tambah asset" />}
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="Asset allocation" description="Komposisi aset fisik dan digital.">
          <AllocationChart data={data.assetAllocation} />
        </ChartCard>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>Table sederhana untuk nilai saat ini dan cost basis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.assets.map((asset) => (
              <div key={asset.id} className="rounded-[24px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">Cost basis {formatCurrency(asset.costBasis)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(asset.value)}</p>
                    <p className="text-sm text-lime-600 dark:text-lime-300">+{asset.trend}%</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DebtsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Debts"
        title="Utang dan piutang tidak lagi tercecer."
        description="Tampilkan kewajiban dan dana yang harus kembali dalam struktur yang jelas, lengkap dengan due date dan progress pembayaran."
        action={<FormDrawer title="Tambah debt" description="Catat utang atau piutang baru." triggerLabel="Tambah debt" />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {data.debtOverview.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} detail="Terhubung dengan alur transaksi." />
        ))}
      </div>
      <Tabs defaultValue="payable">
        <TabsList>
          <TabsTrigger value="payable">Payable</TabsTrigger>
          <TabsTrigger value="receivable">Receivable</TabsTrigger>
        </TabsList>
        {(["payable", "receivable"] as const).map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid gap-4">
              {data.debts.filter((debt) => debt.type === type).map((debt) => (
                <Card key={debt.id} className="surface-card">
                  <CardContent className="space-y-4 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">{debt.person}</p>
                        <p className="text-sm text-muted-foreground">Due {formatDate(debt.dueDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(debt.amount)}</p>
                        <p className="text-sm text-muted-foreground">Paid {formatCurrency(debt.paid)}</p>
                      </div>
                    </div>
                    <Progress value={(debt.paid / (debt.paid + debt.amount)) * 100} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export function GoalsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Goals"
        title="Tracking target finansial yang terasa memotivasi."
        description="Setiap goal punya progress, deadline, dan wallet/alokasi yang membuat perkembangannya mudah dipantau."
        action={<FormDrawer title="Tambah goal" description="Buat target finansial baru." triggerLabel="Tambah goal" />}
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Goal progress" description="Visual progress untuk target utama bulan ini.">
          <GoalTimeline data={data.goalProgress} />
        </ChartCard>
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Hal kecil yang membantu pengguna tetap bergerak.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Emergency fund sudah melewati milestone 25%.",
              "Liburan Jepang butuh tambahan Rp1,2 juta per bulan agar tepat waktu.",
              "Tambahkan auto transfer mingguan untuk menjaga konsistensi."
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4 text-sm leading-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {data.goals.map((goal) => (
          <Card key={goal.id} className="surface-elevated">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{goal.name}</p>
                  <p className="text-sm text-muted-foreground">Deadline {formatDate(goal.deadline)}</p>
                </div>
                <Badge>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</Badge>
              </div>
              <Progress value={(goal.currentAmount / goal.targetAmount) * 100} />
              <p className="text-sm text-muted-foreground">
                {formatCurrency(goal.currentAmount)} dari {formatCurrency(goal.targetAmount)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Analytics"
        title="Laporan yang cukup detail tanpa terasa seperti alat akuntansi."
        description="Cashflow, alokasi aset, savings ratio, dan trend spending digabung dalam satu pengalaman baca."
        action={<Button variant="outline"><Download className="size-4" />Export mock</Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Cashflow trend" description="Perbandingan pemasukan dan pengeluaran per bulan.">
          <CashflowChart data={data.cashflowSeries} />
        </ChartCard>
        <ChartCard title="Allocation" description="Distribusi aset dan fokus portfolio saat ini.">
          <AllocationChart data={data.assetAllocation} />
        </ChartCard>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <InsightPanel
          title="Financial pattern analysis"
          description="Panel AI-style untuk insight dan anomaly detection."
          bullets={[
            "Savings ratio stabil di 31%, di atas target minimum 25%.",
            "Expense category paling volatil: makanan dan transportasi.",
            "Tren asset tumbuh moderat, tetapi debt payoff bisa dipercepat dengan satu pembayaran ekstra bulan ini."
          ]}
        />
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Key ratios</CardTitle>
            <CardDescription>Metrix singkat untuk membaca kesehatan finansial.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <MetricCard label="Savings rate" value={31_000_000} detail="Disajikan sebagai KPI besar untuk emphasis visual." />
            <MetricCard label="Debt ratio" value={18_000_000} detail="Terkalkulasi dari total utang aktif terhadap asset + cash." />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AutomationsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Automations"
        title="Recurring flows yang siap membantu rutinitas finansial."
        description="Simulasi transaksi berulang, subscription monitoring, dan recurring reminders yang disiapkan sepenuhnya di frontend."
        action={<FormDrawer title="Buat automasi" description="Simulasi recurring transaction atau bill reminder." triggerLabel="Buat automasi" />}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Recurring bills</CardTitle>
            <CardDescription>Daftar tagihan berulang yang biasanya perlu dipantau per bulan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between rounded-[24px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                <div>
                  <p className="font-medium">{reminder.title}</p>
                  <p className="text-sm text-muted-foreground">{reminder.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{reminder.amount ? formatCurrency(reminder.amount) : "Habit"}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(reminder.dueDate)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <InsightPanel
          title="Automation suggestions"
          description="Produk dapat mempromosikan recurring setup tanpa terasa hard sell."
          bullets={[
            "Buat recurring transfer mingguan ke emergency fund setiap Senin pagi.",
            "Jadwalkan reminder review budget di pertengahan bulan.",
            "Kelompokkan subscription aktif agar category tagihan tetap rapi."
          ]}
        />
      </div>
    </div>
  );
}

export function RemindersView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Reminders"
        title="Pengingat yang membantu menjaga data tetap akurat."
        description="Bill reminder dan habit reminder dibuat sederhana, jelas, dan tidak terasa mengganggu."
        action={<FormDrawer title="Tambah reminder" description="Buat pengingat baru untuk tagihan atau kebiasaan." triggerLabel="Tambah reminder" />}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {data.reminders.map((reminder) => (
          <Card key={reminder.id} className="surface-elevated">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Badge variant={reminder.status === "today" ? "warning" : reminder.status === "done" ? "success" : "secondary"}>{reminder.status}</Badge>
                <Clock3 className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-muted-foreground">{formatDate(reminder.dueDate)}</p>
              </div>
              <p className="text-sm text-muted-foreground">{reminder.amount ? formatCurrency(reminder.amount) : "Pengingat kebiasaan harian"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <EmptyState title="Reminders archive masih kosong" description="Area ini bisa dipakai untuk reminder yang sudah selesai, di-snooze, atau diarsipkan setelah backend tersedia." actionLabel="Buat reminder baru" />
    </div>
  );
}

export function NotificationsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Notifications"
        title="Notifikasi penting, tanpa overwhelm."
        description="Pusat notifikasi memisahkan budget alerts, AI insight, dan security updates agar pengguna tahu mana yang butuh aksi."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Notification feed</CardTitle>
            <CardDescription>Seeded data dengan status unread, channel, dan message copy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.notifications.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BellRing className="size-4 text-primary" />
                    <p className="font-medium">{item.title}</p>
                  </div>
                  <Badge variant={item.unread ? "default" : "secondary"}>{item.channel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">{formatDateTime(item.createdAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Channel preferences</CardTitle>
            <CardDescription>Contoh toggle settings yang konsisten dengan halaman Settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Push alerts", checked: true },
              { label: "Email recap", checked: true },
              { label: "In-app updates", checked: true }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">Kontrol kanal notifikasi sesuai preferensi.</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AuditLogsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Audit Logs"
        title="Riwayat keamanan yang rapi dan mudah dibaca."
        description="Setiap aktivitas sensitif dikelompokkan per hari, lengkap dengan device info dan tingkat urgensi."
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Activity history</CardTitle>
            <CardDescription>Grouping per hari untuk memudahkan review device dan tindakan akun.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.auditEventGroups.map((group) => (
              <div key={group.date} className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">{group.date}</p>
                {group.items.map((item) => (
                  <div key={item.id} className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.deviceInfo}</p>
                      </div>
                      <Badge variant={item.severity === "warning" ? "warning" : "secondary"}>{item.severity}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{formatDateTime(item.timestamp)}</p>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Security center</CardTitle>
            <CardDescription>Area penguatan trust untuk fitur akun sensitif.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "2FA aktif",
                text: "Lapisan verifikasi tambahan sudah menyala untuk login baru.",
                icon: CheckCircle2
              },
              {
                title: "1 device baru diverifikasi",
                text: "Login terakhir dari MacBook Pro terkonfirmasi aman.",
                icon: ShieldCheck
              },
              {
                title: "Tidak ada anomali besar",
                text: "Tidak ada pola login mencurigakan di 7 hari terakhir.",
                icon: BrainCircuit
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="size-4" />
                  </div>
                  <p className="font-medium">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SettingsView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Settings"
        title="Seluruh kontrol akun, preferensi, dan langganan."
        description="Bagian ini merangkum profil, tema, billing, AI credits, notifikasi, keamanan, dan help references dalam satu struktur."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Profil & tema</CardTitle>
            <CardDescription>Pengaturan dasar yang paling sering dipakai.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="font-medium">{data.currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{data.currentUser.email}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Mode gelap</p>
                <p className="text-sm text-muted-foreground">Tema global dikendalikan dari toggle header dan preview di sini.</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Push notifications</p>
                <p className="text-sm text-muted-foreground">Aktifkan pengingat billing dan budget alerts.</p>
              </div>
              <Switch defaultChecked={data.currentUser.notificationSettings.push} />
            </div>
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Billing & AI credits</CardTitle>
            <CardDescription>Status plan premium dan sisa kuota fitur pintar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[24px] border border-primary/20 bg-primary/8 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <p className="font-medium">Premium plan aktif</p>
              <p className="text-sm text-muted-foreground">Unlimited wallets, advanced analytics, AI assistant.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>AI credits tersisa</span>
                <span>{data.currentUser.aiCredits}</span>
              </div>
              <Progress value={72} />
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/app/upgrade">Kelola paket</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
            <CardDescription>2FA, device checks, dan password routines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">Aktif untuk setiap login baru.</p>
              </div>
              <Switch defaultChecked={data.currentUser.twoFactorEnabled} />
            </div>
            <div className="rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4 text-sm leading-6 text-muted-foreground">
              Perubahan keamanan sensitif akan tercatat di Audit Logs dan memicu notifikasi.
            </div>
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>About fyntra.</CardTitle>
            <CardDescription>Blok informasi produk dan pusat bantuan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>fyntra. adalah dashboard finansial pribadi untuk budgeting, asset monitoring, goal tracking, dan security visibility.</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/app/help">Buka pusat bantuan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function HelpView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Help Center"
        title="Pusat bantuan yang ringkas dan mudah dipindai."
        description="Menjelaskan alur utama produk, FAQ, keamanan, serta cara memahami insight dan laporan."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          "Memulai dengan wallet pertama dan saldo awal.",
          "Menghubungkan transaksi ke goal, debt, atau asset.",
          "Memahami budget alerts, audit logs, dan AI insights."
        ].map((item) => (
          <Card key={item} className="surface-elevated">
            <CardContent className="p-6">
              <p className="font-medium">{item}</p>
              <p className="mt-3 text-sm text-muted-foreground">Konten bantuan lengkap dapat dipasang nanti tanpa mengubah struktur halaman ini.</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <UpgradePrompt />
    </div>
  );
}

export function UpgradeView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Upgrade"
        title="Premium unlock untuk kontrol finansial yang lebih lengkap."
        description="Halaman upsell yang tetap terasa relevan terhadap manfaat produk, bukan sekadar tabel harga."
      />
      <UpgradePrompt />
      <div className="grid gap-6 lg:grid-cols-2">
        {data.subscriptionPlans.map((plan) => (
          <Card key={plan.id} className={plan.id === "premium" ? "surface-elevated border-primary/20" : "surface-card"}>
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{plan.name}</p>
                <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.05em]">{plan.price}</p>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-4 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="w-full">{plan.id === "premium" ? "Lanjutkan upgrade demo" : "Tetap di Free"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function OnboardingView({ data }: { data: AppData }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Onboarding"
        title="Bantu pengguna memulai tanpa friction."
        description="Flow ini mensimulasikan pembuatan wallet pertama, saldo awal, target finansial, dan preferensi notifikasi."
        action={<Button asChild><Link href="/app/dashboard">Lewati ke dashboard</Link></Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Progress setup</CardTitle>
            <CardDescription>Step-by-step yang ringan untuk pengguna baru.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Buat wallet pertama", done: true },
              { label: "Masukkan saldo awal", done: true },
              { label: "Tetapkan goal pertama", done: false },
              { label: "Aktifkan reminder", done: false }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[22px] border border-border/70 bg-[color:var(--surface-2)] px-4 py-4">
                <div className={`flex size-10 items-center justify-center rounded-full ${item.done ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}>
                  {item.done ? <CheckCircle2 className="size-4" /> : <Clock3 className="size-4" />}
                </div>
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.done ? "Selesai" : "Menunggu"}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Setup recommendations</CardTitle>
            <CardDescription>Data awal yang sudah disiapkan agar user langsung melihat value product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[24px] border border-border/70 px-5 py-4">
              <p className="font-medium">Wallet default</p>
              <p className="mt-1 text-sm text-muted-foreground">{data.wallets[0]?.name} dengan saldo {formatCurrency(data.wallets[0]?.balance ?? 0)}</p>
            </div>
            <div className="rounded-[24px] border border-border/70 px-5 py-4">
              <p className="font-medium">Goal pertama</p>
              <p className="mt-1 text-sm text-muted-foreground">{data.goals[0]?.name} dengan target {formatCurrency(data.goals[0]?.targetAmount ?? 0)}</p>
            </div>
            <div className="rounded-[24px] border border-border/70 px-5 py-4">
              <p className="font-medium">Reminder starter pack</p>
              <p className="mt-1 text-sm text-muted-foreground">Bill reminder + habit reminder siap diaktifkan.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/app/dashboard">Masuk dashboard</Link>
              </Button>
              <FormDrawer title="Edit onboarding setup" description="Simulasi pengisian wallet, goal, dan preferensi reminder." triggerLabel="Edit setup" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
