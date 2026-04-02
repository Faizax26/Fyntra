import { Landmark, WalletCards } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { WalletSummary } from "@/lib/types";

export function WalletOverview({ wallets }: { wallets: WalletSummary[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Wallet balances</CardTitle>
        <CardDescription>Track where money lives across bank, cash, and dedicated goal reserves.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="flex items-center justify-between gap-3 rounded-3xl border bg-background/55 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {wallet.type === "Bank" ? <Landmark className="size-4" /> : <WalletCards className="size-4" />}
              </span>
              <div>
                <p className="font-medium">{wallet.name}</p>
                <p className="text-sm text-muted-foreground">{wallet.type}</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{formatCurrency(wallet.balance)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
