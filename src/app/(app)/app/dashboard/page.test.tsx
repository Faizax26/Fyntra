import React from "react";
import userEvent from "@testing-library/user-event";
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
    expect(screen.getByText("Recent transactions")).toBeInTheDocument();
  });

  it("opens the wallet detail panel when a wallet card is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <DashboardPage />
      </Providers>
    );

    await user.click(screen.getByRole("button", { name: /bca payroll/i }));

    expect(screen.getByText("Current balance")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add transaction/i })).toBeInTheDocument();
  });
});
