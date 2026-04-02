import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatTransactionDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TransactionSummary } from "@/lib/types";

function TransactionIcon({ type }: { type: TransactionSummary["type"] }) {
  if (type === "income") {
    return <ArrowUpRight className="size-4" />;
  }

  if (type === "transfer") {
    return <Repeat className="size-4" />;
  }

  return <ArrowDownLeft className="size-4" />;
}

export function RecentTransactions({ transactions }: { transactions: TransactionSummary[] }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Recent transactions</CardTitle>
          <CardDescription>Readable activity for the manual-first experience described in the PRD.</CardDescription>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="/app/transactions">See details</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between gap-4 rounded-3xl border bg-background/55 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-2xl",
                  transaction.type === "income" && "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
                  transaction.type === "expense" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  transaction.type === "transfer" && "bg-primary/10 text-primary"
                )}
              >
                <TransactionIcon type={transaction.type} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium">{transaction.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {transaction.category} • {formatTransactionDate(transaction.date)}
                </p>
              </div>
            </div>
            <div
              className={cn(
                "shrink-0 text-sm font-semibold",
                transaction.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
              )}
            >
              {transaction.type === "income" ? "+" : transaction.type === "expense" ? "-" : ""}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
