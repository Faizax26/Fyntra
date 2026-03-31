"use client";

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { AssetAllocation, BudgetProgress, CashflowSeries, GoalProgress } from "@/lib/types";

const tooltipStyle = {
  borderRadius: 16,
  border: "1px solid rgba(120, 120, 120, 0.2)",
  backgroundColor: "rgba(255, 250, 242, 0.95)",
  backdropFilter: "blur(12px)"
};

export function CashflowChart({ data }: { data: CashflowSeries[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="label" stroke="currentColor" className="text-xs text-muted-foreground" />
          <YAxis stroke="currentColor" className="text-xs text-muted-foreground" />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="income" stroke="var(--chart-1)" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="expense" stroke="var(--chart-3)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AllocationChart({ data }: { data: AssetAllocation[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={68} outerRadius={104} paddingAngle={4}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetBars({ data }: { data: BudgetProgress[] }) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{item.name}</span>
            <span className="text-muted-foreground">{Math.round((item.spent / item.limit) * 100)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-lime-500"
              style={{ width: `${Math.min((item.spent / item.limit) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GoalTimeline({ data }: { data: GoalProgress[] }) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name} className="rounded-[24px] border border-border/70 bg-background/70 p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">Deadline {new Date(item.deadline).toLocaleDateString("id-ID")}</p>
            </div>
            <p className="text-sm font-medium">{Math.round((item.current / item.target) * 100)}%</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-linear-to-r from-lime-500 to-primary" style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
