import { describe, expect, it, vi } from "vitest";

const redirect = vi.fn();

vi.mock("next/navigation", () => ({
  redirect
}));

describe("HomePage", () => {
  it("redirects to /app/dashboard", async () => {
    const { default: HomePage } = await import("@/app/page");

    HomePage();

    expect(redirect).toHaveBeenCalledWith("/app/dashboard");
  });
});
