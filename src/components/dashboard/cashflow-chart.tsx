import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CashflowPoint } from "@/lib/types";

function buildLinePath(
  values: number[],
  width: number,
  height: number,
  paddingX: number,
  paddingY: number,
  maxValue: number
) {
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  return values
    .map((value, index) => {
      const x = paddingX + (chartWidth / Math.max(values.length - 1, 1)) * index;
      const y = height - paddingY - (value / maxValue) * chartHeight;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(
  values: number[],
  width: number,
  height: number,
  paddingX: number,
  paddingY: number,
  maxValue: number
) {
  const chartWidth = width - paddingX * 2;
  const baselineY = height - paddingY;
  const line = values.map((value, index) => {
    const x = paddingX + (chartWidth / Math.max(values.length - 1, 1)) * index;
    const y = baselineY - (value / maxValue) * (height - paddingY * 2);

    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  });

  const lastX = paddingX + chartWidth;

  return `${line.join(" ")} L ${lastX} ${baselineY} L ${paddingX} ${baselineY} Z`;
}

export function CashflowChart({ data }: { data: CashflowPoint[] }) {
  const width = 640;
  const height = 320;
  const paddingX = 28;
  const paddingY = 24;
  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expense]));
  const incomeValues = data.map((item) => item.income);
  const expenseValues = data.map((item) => item.expense);
  const incomeLine = buildLinePath(incomeValues, width, height, paddingX, paddingY, maxValue);
  const expenseLine = buildLinePath(expenseValues, width, height, paddingX, paddingY, maxValue);
  const incomeArea = buildAreaPath(incomeValues, width, height, paddingX, paddingY, maxValue);
  const expenseArea = buildAreaPath(expenseValues, width, height, paddingX, paddingY, maxValue);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cashflow trend</CardTitle>
        <CardDescription>Monthly inflow versus outflow in compact millions of Rupiah.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-[1.75rem] border bg-background/55 p-4">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-[320px] w-full" role="img" aria-label="Cashflow trend chart">
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.24" />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((index) => {
              const y = paddingY + ((height - paddingY * 2) / 3) * index;

              return <line key={index} x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(148,163,184,0.18)" strokeDasharray="4 6" />;
            })}

            <path d={incomeArea} fill="url(#incomeGradient)" />
            <path d={expenseArea} fill="url(#expenseGradient)" />
            <path d={incomeLine} fill="none" stroke="var(--chart-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d={expenseLine} fill="none" stroke="var(--chart-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {data.map((item, index) => {
              const x = paddingX + ((width - paddingX * 2) / Math.max(data.length - 1, 1)) * index;

              return (
                <g key={item.month}>
                  <text x={x} y={height - 4} textAnchor="middle" fontSize="12" fill="var(--color-muted-foreground)">
                    {item.month}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--chart-2)]" />
              Income
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--chart-1)]" />
              Expense
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
