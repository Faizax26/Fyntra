import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DashboardPage from "@/app/(app)/app/dashboard/page";
import { Providers } from "@/app/providers";

describe("DashboardPage", () => {
  it("renders the metric cards and recent transactions", () => {
    render(
      <Providers>
        <DashboardPage />
      </Providers>
    );

    expect(screen.getByText("Total balance")).toBeInTheDocument();
    expect(screen.getByText("Income this month")).toBeInTheDocument();
    expect(screen.getByText("Expense this month")).toBeInTheDocument();
    expect(screen.getByText("Savings rate")).toBeInTheDocument();
    expect(screen.getByText("Recent transactions")).toBeInTheDocument();
  });
});
