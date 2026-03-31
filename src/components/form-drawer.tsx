"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function FormDrawer({
  title,
  description,
  triggerLabel
}: {
  title: string;
  description: string;
  triggerLabel: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{triggerLabel}</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            toast.success("Aksi demo berhasil", {
              description: "Perubahan hanya disimulasikan di frontend."
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="drawer-name">Nama</Label>
            <Input id="drawer-name" placeholder="Contoh: Dana darurat" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="drawer-amount">Nominal</Label>
            <Input id="drawer-amount" type="number" placeholder="1500000" />
          </div>
          <div className="space-y-2">
            <Label>Tipe</Label>
            <Select defaultValue="income">
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-[24px] border border-dashed border-border bg-[color:var(--surface-2)] p-4 text-sm leading-6 text-muted-foreground">
            Form ini dipakai ulang untuk wallet, transaction, goal, dan subscription mock agar alur produk tetap terasa nyata tanpa backend.
          </div>
          <Button type="submit" className="w-full">
            Simpan simulasi
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
