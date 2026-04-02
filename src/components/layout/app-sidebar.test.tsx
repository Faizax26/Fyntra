import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/app/providers";

const pathnameState = { value: "/app/dashboard" };

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameState.value
}));

describe("AppShell navigation", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pathnameState.value = "/app/dashboard";
  });

  it("shows all sidebar navigation items", () => {
    render(
      <Providers>
        <AppShell>
          <div>content</div>
        </AppShell>
      </Providers>
    );

    ["Dashboard", "Wallets", "Transactions", "Budget", "Goals", "Assets", "Debts", "Analytics", "Settings"].forEach((label) => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  it("marks the current navigation item as active", () => {
    pathnameState.value = "/app/settings";

    render(
      <Providers>
        <AppShell>
          <div>content</div>
        </AppShell>
      </Providers>
    );

    expect(screen.getAllByRole("link", { current: "page" })[0]).toHaveTextContent("Settings");
  });

  it("opens mobile navigation from the topbar menu button", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <AppShell>
          <div>content</div>
        </AppShell>
      </Providers>
    );

    await user.click(screen.getByLabelText("Open navigation"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("persists the collapse toggle in localStorage", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <AppShell>
          <div>content</div>
        </AppShell>
      </Providers>
    );

    await user.click(screen.getByLabelText("Collapse sidebar"));

    expect(window.localStorage.getItem("fyntra:sidebar-collapsed")).toBe("true");
  });
});
