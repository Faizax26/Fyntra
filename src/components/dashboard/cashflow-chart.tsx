"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CashflowPoint } from "@/lib/types";

type RangeMode = "6M" | "12M";

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

function buildSmoothLinePath(points: ChartPoint[]) {
  if (points.length < 2) {
    return points.length === 1 ? `M ${points[0]!.x} ${points[0]!.y}` : "";
  }

  const first = points[0]!;
  const commands = [`M ${first.x} ${first.y}`];

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]!;
    const next = points[index + 1]!;
    const previous = points[index - 1] ?? current;
    const following = points[index + 2] ?? next;

    const controlPoint1X = current.x + (next.x - previous.x) / 6;
    const controlPoint1Y = current.y + (next.y - previous.y) / 6;
    const controlPoint2X = next.x - (following.x - current.x) / 6;
    const controlPoint2Y = next.y - (following.y - current.y) / 6;

    commands.push(
      `C ${controlPoint1X.toFixed(2)} ${controlPoint1Y.toFixed(2)} ${controlPoint2X.toFixed(2)} ${controlPoint2Y.toFixed(2)} ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
    );
  }

  return commands.join(" ");
}

function buildAreaPath(points: ChartPoint[], baselineY: number) {
  if (!points.length) {
    return "";
  }

  return `${buildSmoothLinePath(points)} L ${points[points.length - 1]!.x} ${baselineY} L ${points[0]!.x} ${baselineY} Z`;
}

export function CashflowChart({ data }: { data: CashflowPoint[] }) {
  const [range, setRange] = useState<RangeMode>("12M");
  const [hovered, setHovered] = useState<{ index: number; series: "income" | "expense" } | null>(null);
  const [focusedSeries, setFocusedSeries] = useState<"income" | "expense" | null>(null);

  const visibleData = useMemo(() => (range === "6M" ? data.slice(-6) : data), [data, range]);

  useEffect(() => {
    setHovered(null);
    setFocusedSeries(null);
  }, [range]);

  const width = 640;
  const height = 320;
  const paddingX = range === "12M" ? 22 : 28;
  const paddingY = 18;
  const labels = visibleData.map((item) => item.month);
  const maxValue = Math.max(...visibleData.flatMap((item) => [item.income, item.expense]));
  const incomeValues = visibleData.map((item) => item.income);
  const expenseValues = visibleData.map((item) => item.expense);
  const incomeDelta =
    visibleData.length > 1
      ? ((visibleData[visibleData.length - 1]!.income - visibleData[visibleData.length - 2]!.income) /
          visibleData[visibleData.length - 2]!.income) *
        100
      : 0;

  const { incomePoints, expensePoints, incomeLine, expenseLine, incomeArea, expenseArea } = useMemo(() => {
    const nextIncomePoints = buildPoints(incomeValues, labels, width, height, paddingX, paddingY, maxValue);
    const nextExpensePoints = buildPoints(expenseValues, labels, width, height, paddingX, paddingY, maxValue);

    return {
      incomePoints: nextIncomePoints,
      expensePoints: nextExpensePoints,
      incomeLine: buildSmoothLinePath(nextIncomePoints),
      expenseLine: buildSmoothLinePath(nextExpensePoints),
      incomeArea: buildAreaPath(nextIncomePoints, height - paddingY),
      expenseArea: buildAreaPath(nextExpensePoints, height - paddingY)
    };
  }, [expenseValues, incomeValues, labels, maxValue, paddingX]);

  const activeIndex = hovered?.index ?? visibleData.length - 1;
  const activeIncome = visibleData[activeIndex]?.income ?? 0;
  const activeExpense = visibleData[activeIndex]?.expense ?? 0;
  const activeMonth = visibleData[activeIndex]?.month ?? "";
  const activePointX = incomePoints[activeIndex]?.x ?? paddingX;
  const activeSeries = hovered?.series ?? focusedSeries;
  const activePointY =
    activeSeries === "expense"
      ? expensePoints[activeIndex]?.y ?? height - paddingY
      : incomePoints[activeIndex]?.y ?? height - paddingY;
  const highlightIncome = activeSeries === "income";
  const highlightExpense = activeSeries === "expense";
  const tooltipLeft = Math.min(Math.max((activePointX / width) * 100, 14), 86);
  const tooltipTop = Math.min(Math.max((activePointY / height) * 100, 20), 88);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Cashflow trend</CardTitle>
          <div className="flex items-center gap-2.5">
            <div className="inline-flex h-8 items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="size-3.5" />
              {`${incomeDelta >= 0 ? "+" : ""}${incomeDelta.toFixed(0)}% vs previous month`}
            </div>
            <div className="relative inline-grid h-8 w-[112px] grid-cols-2 items-center rounded-full border border-border/70 bg-background/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-1 top-1 w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-primary to-indigo-500 shadow-[0_12px_24px_-18px_rgba(56,87,255,0.52)] transition-transform duration-300 ease-out"
                style={{
                  transform: range === "12M" ? "translateX(calc(100% + 4px))" : "translateX(0)"
                }}
              />
              {(["6M", "12M"] as RangeMode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={cn(
                    "relative flex h-full w-full items-center justify-center rounded-full px-0 py-1 text-xs font-medium transition-all duration-200",
                    range === option
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-[1.75rem] border bg-background/55 p-4">
          <div className="mb-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div />
            <div className="flex items-start gap-3 self-start lg:min-w-[220px] lg:justify-end">
              <div className="hidden flex-col gap-3 text-sm text-muted-foreground sm:flex">
                <button
                  type="button"
                  onMouseEnter={() => setFocusedSeries("income")}
                  onMouseLeave={() => setFocusedSeries(null)}
                  className={cn(
                    "inline-flex items-center gap-2 text-left transition-all duration-200",
                    highlightExpense && "opacity-55"
                  )}
                >
                  <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.45)]" />
                  Income
                </button>
                <button
                  type="button"
                  onMouseEnter={() => setFocusedSeries("expense")}
                  onMouseLeave={() => setFocusedSeries(null)}
                  className={cn(
                    "inline-flex items-center gap-2 text-left transition-all duration-200",
                    highlightIncome && "opacity-55"
                  )}
                >
                  <span className="size-2.5 rounded-full bg-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.4)]" />
                  Expense
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <svg key={range} viewBox={`0 0 ${width} ${height}`} className="h-[284px] w-full" role="img" aria-label="Cashflow trend chart">
              <defs>
                <filter id="incomeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="expenseGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="rgb(16 185 129)" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.24" />
                  <stop offset="72%" stopColor="rgb(99 102 241)" stopOpacity="0.07" />
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
                    stroke="rgba(148,163,184,0.1)"
                    strokeDasharray="4 8"
                  />
                );
              })}

              <path d={incomeArea} fill="url(#incomeGradient)" className="cashflow-area cashflow-area-delay-1" />
              <path d={expenseArea} fill="url(#expenseGradient)" className="cashflow-area cashflow-area-delay-2" />

              {highlightIncome ? (
                <path d={incomeLine} fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
              {highlightExpense ? (
                <path d={expenseLine} fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}

              <path
                d={incomeLine}
                fill="none"
                stroke="rgba(52,211,153,0.18)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#incomeGlow)"
                className={cn(
                  "cashflow-line-shadow cashflow-line-delay-1 transition-all duration-200",
                  highlightIncome && "opacity-100",
                  hovered && !highlightIncome && "opacity-35"
                )}
              />
              <path
                d={expenseLine}
                fill="none"
                stroke="rgba(129,140,248,0.16)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#expenseGlow)"
                className={cn(
                  "cashflow-line-shadow cashflow-line-delay-2 transition-all duration-200",
                  highlightExpense && "opacity-100",
                  hovered && !highlightExpense && "opacity-35"
                )}
              />
              <path
                d={incomeLine}
                fill="none"
                stroke="rgb(52 211 153)"
                strokeWidth={highlightIncome ? "3.8" : "3"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "cashflow-line cashflow-line-delay-1 transition-all duration-200",
                  activeSeries && !highlightIncome && "opacity-40"
                )}
              />
              <path
                d={expenseLine}
                fill="none"
                stroke="rgb(129 140 248)"
                strokeWidth={highlightExpense ? "3.8" : "3"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "cashflow-line cashflow-line-delay-2 transition-all duration-200",
                  activeSeries && !highlightExpense && "opacity-40"
                )}
              />

              <line
                x1={activePointX}
                y1={paddingY}
                x2={activePointX}
                y2={height - paddingY}
                stroke="rgba(148,163,184,0.18)"
                strokeDasharray="4 8"
              />

              {incomePoints.map((point, index) => (
                <g key={`income-${point.label}`}>
                  <circle cx={point.x} cy={point.y} r={hovered?.index === index ? 12 : 0} fill="rgba(52,211,153,0.16)" className="transition-all duration-200" />
                  <circle cx={point.x} cy={point.y} r={hovered?.index === index ? 5.8 : 3} fill="rgb(52 211 153)" className="transition-all duration-200" />
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
                  <circle cx={point.x} cy={point.y} r={hovered?.index === index ? 12 : 0} fill="rgba(129,140,248,0.16)" className="transition-all duration-200" />
                  <circle cx={point.x} cy={point.y} r={hovered?.index === index ? 5.8 : 3} fill="rgb(129 140 248)" className="transition-all duration-200" />
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

              {visibleData.map((item, index) => {
                const x = paddingX + ((width - paddingX * 2) / Math.max(visibleData.length - 1, 1)) * index;

                return (
                  <text
                    key={item.month}
                    x={x}
                    y={height - 4}
                    textAnchor="middle"
                    fontSize={range === "12M" ? "11" : "12"}
                    fill="var(--color-muted-foreground)"
                  >
                    {item.month}
                  </text>
                );
              })}
            </svg>

            <div
              className={cn(
                "cashflow-tooltip pointer-events-none absolute z-10 min-w-[128px] rounded-2xl border border-border/70 bg-background/94 px-3 py-2.5 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-200",
                hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{
                left: `${tooltipLeft}%`,
                top: `${tooltipTop}%`,
                transform: "translate(-50%, calc(-100% - 14px))"
              }}
            >
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

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground sm:hidden">
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
