"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CashflowPoint } from "@/lib/types";

type ChartPoint = {
  x: number;
  y: number;
  value: number;
  label: string;
};

function buildPoints(
  values: number[],
  labels: string[],
  width: number,
  height: number,
  paddingX: number,
  paddingY: number,
  maxValue: number
) {
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  return values.map((value, index) => ({
    label: labels[index],
    value,
    x: paddingX + (chartWidth / Math.max(values.length - 1, 1)) * index,
    y: height - paddingY - (value / maxValue) * chartHeight
  }));
}

function buildLinePath(points: ChartPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function buildAreaPath(points: ChartPoint[], baselineY: number) {
  if (!points.length) {
    return "";
  }

  return `${buildLinePath(points)} L ${points[points.length - 1]!.x} ${baselineY} L ${points[0]!.x} ${baselineY} Z`;
}

export function CashflowChart({ data }: { data: CashflowPoint[] }) {
  const [hovered, setHovered] = useState<{ index: number; series: "income" | "expense" } | null>(null);

  const width = 640;
  const height = 320;
  const paddingX = 28;
  const paddingY = 24;
  const labels = data.map((item) => item.month);
  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expense]));
  const incomeValues = data.map((item) => item.income);
  const expenseValues = data.map((item) => item.expense);
  const incomeDelta = data.length > 1 ? ((data[data.length - 1]!.income - data[data.length - 2]!.income) / data[data.length - 2]!.income) * 100 : 0;

  const { incomePoints, expensePoints, incomeLine, expenseLine, incomeArea, expenseArea } = useMemo(() => {
    const nextIncomePoints = buildPoints(incomeValues, labels, width, height, paddingX, paddingY, maxValue);
    const nextExpensePoints = buildPoints(expenseValues, labels, width, height, paddingX, paddingY, maxValue);

    return {
      incomePoints: nextIncomePoints,
      expensePoints: nextExpensePoints,
      incomeLine: buildLinePath(nextIncomePoints),
      expenseLine: buildLinePath(nextExpensePoints),
      incomeArea: buildAreaPath(nextIncomePoints, height - paddingY),
      expenseArea: buildAreaPath(nextExpensePoints, height - paddingY)
    };
  }, [expenseValues, incomeValues, labels, maxValue]);

  const activeIndex = hovered?.index ?? data.length - 1;
  const activePointX = incomePoints[activeIndex]?.x ?? paddingX;
  const activeIncome = data[activeIndex]?.income ?? 0;
  const activeExpense = data[activeIndex]?.expense ?? 0;
  const activeMonth = data[activeIndex]?.month ?? "";
  const highlightIncome = hovered?.series === "income";
  const highlightExpense = hovered?.series === "expense";

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Cashflow trend</CardTitle>
            <CardDescription>Monthly inflow versus outflow in compact millions of Rupiah.</CardDescription>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="size-3.5" />
            {`${incomeDelta >= 0 ? "+" : ""}${incomeDelta.toFixed(0)}% vs last month`}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-[1.75rem] border bg-background/55 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Income growing faster than expenses</p>
              <p className="mt-1 text-xs text-muted-foreground">The current curve shows healthier operating room than last month.</p>
            </div>
            <div className="hidden items-center gap-4 text-sm text-muted-foreground sm:flex">
              <span className="inline-flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.45)]" />
                Income
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.4)]" />
                Expense
              </span>
            </div>
          </div>
          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[320px] w-full" role="img" aria-label="Cashflow trend chart">
              <defs>
                <filter id="incomeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="expenseGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0.38" />
                  <stop offset="75%" stopColor="rgb(16 185 129)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.3" />
                  <stop offset="72%" stopColor="rgb(99 102 241)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((index) => {
                const y = paddingY + ((height - paddingY * 2) / 3) * index;

                return (
                  <line
                    key={index}
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="rgba(148,163,184,0.16)"
                    strokeDasharray="4 8"
                  />
                );
              })}

              <path d={incomeArea} fill="url(#incomeGradient)" className="cashflow-area cashflow-area-delay-1" />
              <path d={expenseArea} fill="url(#expenseGradient)" className="cashflow-area cashflow-area-delay-2" />

              {highlightIncome ? (
                <path d={incomeLine} fill="none" stroke="rgba(52,211,153,0.22)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
              {highlightExpense ? (
                <path d={expenseLine} fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}

              <path
                d={incomeLine}
                fill="none"
                stroke="rgba(52,211,153,0.34)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#incomeGlow)"
                className="cashflow-line-shadow cashflow-line-delay-1"
              />
              <path
                d={expenseLine}
                fill="none"
                stroke="rgba(129,140,248,0.28)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#expenseGlow)"
                className="cashflow-line-shadow cashflow-line-delay-2"
              />
              <path
                d={incomeLine}
                fill="none"
                stroke="rgb(52 211 153)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cashflow-line cashflow-line-delay-1"
              />
              <path
                d={expenseLine}
                fill="none"
                stroke="rgb(129 140 248)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cashflow-line cashflow-line-delay-2"
              />

              <line x1={activePointX} y1={paddingY} x2={activePointX} y2={height - paddingY} stroke="rgba(148,163,184,0.2)" strokeDasharray="4 8" />

              {incomePoints.map((point, index) => (
                <g key={`income-${point.label}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hovered?.index === index ? 10 : 0}
                    fill="rgba(52,211,153,0.18)"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hovered?.index === index ? 4.8 : 3}
                    fill="rgb(52 211 153)"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={16}
                    fill="transparent"
                    onMouseEnter={() => setHovered({ index, series: "income" })}
                    onMouseLeave={() => setHovered(null)}
                  />
                </g>
              ))}

              {expensePoints.map((point, index) => (
                <g key={`expense-${point.label}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hovered?.index === index ? 10 : 0}
                    fill="rgba(129,140,248,0.18)"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hovered?.index === index ? 4.8 : 3}
                    fill="rgb(129 140 248)"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={16}
                    fill="transparent"
                    onMouseEnter={() => setHovered({ index, series: "expense" })}
                    onMouseLeave={() => setHovered(null)}
                  />
                </g>
              ))}

              {data.map((item, index) => {
                const x = paddingX + ((width - paddingX * 2) / Math.max(data.length - 1, 1)) * index;

                return (
                  <text key={item.month} x={x} y={height - 4} textAnchor="middle" fontSize="12" fill="var(--color-muted-foreground)">
                    {item.month}
                  </text>
                );
              })}
            </svg>

            <div className="pointer-events-none absolute right-4 top-4 rounded-2xl border border-border/70 bg-background/92 px-3 py-2 shadow-[0_18px_38px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-200 ease-out">
              <p className="text-xs font-medium text-muted-foreground">{activeMonth}</p>
              <div className="mt-2 grid gap-1.5 text-sm">
                <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.45)]" />
                  {formatCompactCurrency(activeIncome)}
                </span>
                <span className="inline-flex items-center gap-2 text-indigo-500 dark:text-indigo-300">
                  <span className="size-2 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.42)]" />
                  {formatCompactCurrency(activeExpense)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground sm:hidden">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.45)]" />
              Income
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.4)]" />
              Expense
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
