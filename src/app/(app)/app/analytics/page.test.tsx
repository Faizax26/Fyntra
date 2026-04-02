import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AnalyticsPage from "@/app/(app)/app/analytics/page";

describe("AnalyticsPage", () => {
  it("renders the placeholder page content", () => {
    render(<AnalyticsPage />);

    expect(screen.getByText("Analytics reporting")).toBeInTheDocument();
    expect(screen.getByText(/advanced charts, spending insights/i)).toBeInTheDocument();
  });
});
