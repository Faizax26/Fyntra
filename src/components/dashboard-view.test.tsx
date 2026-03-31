import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardView } from "@/components/app-views";
import { getAppData } from "@/lib/data";

describe("DashboardView", () => {
  it("renders summary and transaction content", async () => {
    const data = await getAppData();

    render(<DashboardView data={data} />);

    expect(screen.getByText(/Financial cockpit/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/AI weekly digest/i)).toBeInTheDocument();
  });
});
