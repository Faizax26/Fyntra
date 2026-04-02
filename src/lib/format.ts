const idrFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const shortFormatter = new Intl.NumberFormat("id-ID", {
  notation: "compact",
  maximumFractionDigits: 1
});

export function formatCurrency(value: number) {
  return idrFormatter.format(value);
}

export function formatCompactCurrency(value: number) {
  return shortFormatter.format(value);
}

export function formatTransactionDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short"
  }).format(new Date(value));
}
