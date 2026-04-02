import type { ReactNode } from "react";

function Wrapper({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}

export const ResponsiveContainer = Wrapper;
export function AreaChart() {
  return <div />;
}
export const Area = () => <div />;
export const CartesianGrid = () => <div />;
export const Tooltip = () => <div />;
export const XAxis = () => <div />;
export const YAxis = () => <div />;
