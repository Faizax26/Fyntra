import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { WalletSummary } from "@/lib/types";

export function WalletOverview({ wallets }: { wallets: WalletSummary[] }) {
  return (
      <Card className="h-full">
      <CardHeader>
        <CardTitle>Wallet balances</CardTitle>
        <CardDescription>Quick view of where your money is currently stored.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="rounded-3xl border bg-background/55 px-5 py-4">
            <p className="truncate text-sm text-muted-foreground">{wallet.name}</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">{formatCurrency(wallet.balance)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
