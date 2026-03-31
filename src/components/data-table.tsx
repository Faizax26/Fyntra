"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "Cari data..."
}: {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder={searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.render(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
