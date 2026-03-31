"use client";

import { Plus, Repeat, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function QuickActionBar() {
  return (
    <Card className="surface-elevated">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
        <Button
          className="flex-1 justify-between"
          onClick={() => toast.success("Demo transaksi baru dibuka", { description: "Form ini tidak menyimpan data permanen." })}
        >
          <span className="inline-flex items-center gap-2"><Plus className="size-4" />Tambah transaksi</span>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.16em] sm:inline-flex">Quick add</span>
        </Button>
        <Button
          variant="outline"
          className="flex-1 justify-between"
          onClick={() => toast("Reminder bulanan dijadwalkan", { description: "Simulasi automasi berhasil dibuat." })}
        >
          <span className="inline-flex items-center gap-2"><Repeat className="size-4" />Buat automasi</span>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.16em] sm:inline-flex">Recurring</span>
        </Button>
        <Button
          variant="secondary"
          className="flex-1 justify-between"
          onClick={() => toast.info("Insight AI direfresh", { description: "fynta. menemukan 3 pola penghematan baru." })}
        >
          <span className="inline-flex items-center gap-2"><Sparkles className="size-4" />Minta insight AI</span>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.16em] sm:inline-flex">Coach</span>
        </Button>
      </CardContent>
    </Card>
  );
}
