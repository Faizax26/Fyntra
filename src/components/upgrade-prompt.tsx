import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UpgradePrompt() {
  return (
    <Card className="overflow-hidden bg-linear-to-r from-primary to-lime-500 text-white">
      <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            <Crown className="size-3" />
            Premium unlock
          </div>
          <h3 className="font-display text-2xl font-semibold">Buka AI coach, wallet tanpa batas, dan laporan yang lebih tajam.</h3>
          <p className="max-w-2xl text-sm text-white/80">
            Premium cocok untuk pengguna yang sudah aktif budgeting dan ingin insight lintas wallet, asset, debt, dan goal.
          </p>
        </div>
        <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
          <Link href="/app/upgrade">
            <Sparkles className="size-4" />
            Lihat paket premium
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
