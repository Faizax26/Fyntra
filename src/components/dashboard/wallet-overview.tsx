import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { WalletSummary } from "@/lib/types";

export function WalletOverview({ wallets }: { wallets: WalletSummary[] }) {
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Wallet balances</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {wallets.map((wallet, index) => {
          const share = totalBalance > 0 ? Math.round((wallet.balance / totalBalance) * 100) : 0;
          const isPrimary = index === 0;

          return (
            <div
              key={wallet.id}
              className={cn(
                "rounded-3xl border px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/5",
                isPrimary
                  ? "border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent shadow-sm ring-1 ring-indigo-400/20"
                  : "bg-background/55 shadow-sm"
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
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className={cn(
                      "h-1.5 rounded-full bg-indigo-300 dark:bg-indigo-300",
                      isPrimary && "bg-indigo-500 dark:bg-indigo-400"
                    )}
                    style={{ width: `${share}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3 text-sm">
                <span className="font-medium text-slate-700 dark:text-white/80">{share}% of total</span>
                {isPrimary ? (
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">Primary account</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
