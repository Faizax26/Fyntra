"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, SendHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { formatCompactCurrency, formatCurrency, formatTransactionDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { WalletActivity, WalletDetail, WalletSummary, WalletTrendPoint } from "@/lib/types";

function buildLinePath(points: number[], width: number, height: number, padding: number) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = Math.max(max - min, 1);

  return points
    .map((point, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(points.length - 1, 1);
      const y = height - padding - ((point - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function WalletTrendChart({ trend }: { trend: WalletTrendPoint[] }) {
  const incomeValues = trend.map((point) => point.income);
  const expenseValues = trend.map((point) => point.expense);
  const width = 320;
  const height = 180;
  const padding = 18;

  const incomePath = buildLinePath(incomeValues, width, height, padding);
  const expensePath = buildLinePath(expenseValues, width, height, padding);

  return (
    <div className="rounded-2xl border border-gray-200 bg-background/60 p-5 shadow-sm dark:border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Wallet activity</p>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            Income
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500" />
            Expense
          </span>
        </div>
      </div>
      <div className="mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full overflow-visible">
          <defs>
            <linearGradient id="wallet-income-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="rgb(52 211 153)" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="wallet-expense-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.88" />
              <stop offset="100%" stopColor="rgb(248 113 113)" stopOpacity="0.58" />
            </linearGradient>
          </defs>
          <path
            d={incomePath}
            fill="none"
            stroke="url(#wallet-income-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="wallet-chart-line"
          />
          <path
            d={expensePath}
            fill="none"
            stroke="url(#wallet-expense-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="wallet-chart-line wallet-chart-line-delay"
          />
        </svg>
        <div className="mt-2 grid grid-cols-7 text-[11px] text-muted-foreground">
          {trend.map((point) => (
            <span key={point.label} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletSummaryStat({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "positive" | "negative" | "neutral" }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-background/60 p-4 shadow-sm dark:border-white/10 dark:bg-background/45">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-3 text-xl font-semibold tracking-tight",
          tone === "positive" && "text-emerald-600 dark:text-emerald-400",
          tone === "negative" && "text-red-600 dark:text-red-400",
          tone === "neutral" && "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function WalletTransactionItem({ transaction }: { transaction: WalletActivity }) {
  const isPositive = transaction.type === "income";
  const isNegative = transaction.type === "expense";

  return (
    <div className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-background/55 px-4 py-3.5 transition-all duration-200 hover:bg-black/[0.035] dark:border-white/10 dark:hover:bg-white/[0.06]">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{transaction.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{formatTransactionDate(transaction.date)}</p>
      </div>
      <p
        className={cn(
          "shrink-0 text-sm font-semibold tracking-tight",
          isPositive && "text-emerald-600 dark:text-emerald-400",
          isNegative && "text-red-600 dark:text-red-400",
          !isPositive && !isNegative && "text-foreground"
        )}
      >
        {isPositive ? "+" : isNegative ? "-" : ""}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

export function WalletOverview({
  wallets,
  details
}: {
  wallets: WalletSummary[];
  details: WalletDetail[];
}) {
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  const selectedWallet = useMemo(
    () => wallets.find((wallet) => wallet.id === selectedWalletId) ?? null,
    [selectedWalletId, wallets]
  );
  const selectedDetail = useMemo(
    () => details.find((detail) => detail.walletId === selectedWalletId) ?? null,
    [details, selectedWalletId]
  );

  const totals = useMemo(() => {
    if (!selectedDetail) {
      return { income: 0, expense: 0, net: 0 };
    }

    const income = selectedDetail.transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = selectedDetail.transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { income, expense, net: income - expense };
  }, [selectedDetail]);

  return (
    <>
      <Card className="h-full border-slate-200/70 shadow-sm">
        <CardHeader>
          <CardTitle>Wallet balances</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {wallets.map((wallet, index) => {
            const share = totalBalance > 0 ? Math.round((wallet.balance / totalBalance) * 100) : 0;
            const isPrimary = index === 0;

            return (
              <button
                key={wallet.id}
                type="button"
                onClick={() => setSelectedWalletId(wallet.id)}
                className={cn(
                  "rounded-3xl border px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:bg-white/5 dark:hover:shadow-indigo-500/10",
                  isPrimary
                    ? "border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-400/20"
                    : "bg-background/55"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "truncate text-sm text-muted-foreground",
                        isPrimary && "font-medium text-foreground"
                      )}
                    >
                      {wallet.name}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">{formatCurrency(wallet.balance)}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
                      isPrimary && "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                    )}
                  >
                    {wallet.type}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/5">
                    <div
                      className={cn(
                        "h-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200",
                        isPrimary && "from-indigo-500 via-indigo-400 to-indigo-300"
                      )}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3 text-sm">
                  <span className="font-medium text-slate-700 dark:text-white/80">{share}% of total</span>
                  {isPrimary ? (
                    <span className="text-xs font-medium text-indigo-600/80 dark:text-indigo-300/80">Primary account</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>
      <Sheet open={Boolean(selectedWalletId)} onOpenChange={(open) => !open && setSelectedWalletId(null)}>
      <SheetContent
          side="right"
          className="w-[94vw] max-w-[540px] overflow-y-auto border-l border-border/70 bg-background/95 backdrop-blur-xl sm:rounded-l-2xl"
        >
          {selectedWallet && selectedDetail ? (
            <div className="flex min-h-full flex-col">
              <div className="border-b border-gray-200 px-7 pb-8 pt-7 dark:border-white/10">
                <SheetTitle className="text-2xl font-semibold tracking-tight text-foreground">{selectedWallet.name}</SheetTitle>
                <SheetDescription className="sr-only">
                  Wallet detail panel with balance summary, activity chart, transactions, and actions.
                </SheetDescription>
                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground/75">Current balance</p>
                    <p className="mt-4 text-[2.5rem] font-semibold tracking-tight text-foreground">
                      {formatCurrency(selectedWallet.balance)}
                    </p>
                  </div>
                  <Badge variant="neutral" className="border border-border/60 bg-muted/45 text-muted-foreground">
                    {selectedWallet.type}
                  </Badge>
                </div>
              </div>
              <div className="flex-1 space-y-8 px-7 py-7">
                <WalletTrendChart trend={selectedDetail.trend} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <WalletSummaryStat label="Total income" value={formatCompactCurrency(totals.income)} tone="positive" />
                  <WalletSummaryStat label="Total expense" value={formatCompactCurrency(totals.expense)} tone="negative" />
                  <WalletSummaryStat
                    label="Net change"
                    value={`${totals.net >= 0 ? "+" : "-"}${formatCompactCurrency(Math.abs(totals.net))}`}
                    tone={totals.net >= 0 ? "positive" : "negative"}
                  />
                </div>
                <div className="rounded-2xl border border-gray-200 bg-background/60 p-5 shadow-sm dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Recent transactions</p>
                      <p className="text-xs text-muted-foreground">Latest activity for this wallet</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {Math.min(selectedDetail.transactions.length, 10)} items
                    </span>
                  </div>
                  <div className="mt-5 space-y-3.5">
                    {selectedDetail.transactions.slice(0, 6).map((transaction) => (
                      <WalletTransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-background/60 p-5 shadow-sm dark:border-white/10">
                  <p className="text-sm font-medium text-foreground">Actions</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <Button
                      type="button"
                      className="justify-start rounded-2xl transition duration-200 hover:scale-[1.02] hover:brightness-105"
                    >
                      <Plus className="size-4" />
                      Add transaction
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start rounded-2xl transition duration-200 hover:scale-[1.02] hover:brightness-105"
                    >
                      <SendHorizontal className="size-4" />
                      Transfer
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start rounded-2xl transition duration-200 hover:scale-[1.02] hover:brightness-105"
                    >
                      <Pencil className="size-4" />
                      Edit wallet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
