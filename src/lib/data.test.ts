import { describe, expect, it } from "vitest";

import { getAppData } from "@/lib/data";

describe("getAppData", () => {
  it("returns seeded entities with linked references", async () => {
    const data = await getAppData();

    expect(data.wallets.length).toBeGreaterThan(0);
    expect(data.transactions.length).toBeGreaterThan(0);
    expect(data.goals.every((goal) => data.wallets.some((wallet) => wallet.id === goal.walletId))).toBe(true);
    expect(data.dashboardSummary.totalBalance).toBeGreaterThan(0);
  });
});
