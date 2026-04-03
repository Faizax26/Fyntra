import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { Providers } from "@/app/providers";

describe("HomePage", () => {
  it("renders the landing page content", () => {
    render(
      <Providers>
        <HomePage />
      </Providers>
    );

    expect(screen.getByRole("heading", { name: /take control of your money in one place/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started for free/i })).toHaveAttribute("href", "/app/dashboard");
    expect(screen.getByText("50,000+")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Premium" })).toBeInTheDocument();
  });
});
