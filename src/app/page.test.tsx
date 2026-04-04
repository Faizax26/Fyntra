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

    expect(screen.getByRole("heading", { name: /your money,\s*orchestrated\s*into one calm system/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started for free/i })).toHaveAttribute("href", "/app/dashboard");
    expect(screen.getByRole("heading", { name: /the product assembles itself in layers/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Premium" })).toBeInTheDocument();
  });
});
