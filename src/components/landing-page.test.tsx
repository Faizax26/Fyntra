import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "@/components/marketing-sections";
import { getAppData } from "@/lib/data";

describe("LandingPage", () => {
  it("renders hero and pricing content", async () => {
    const data = await getAppData();

    render(<LandingPage data={data} />);

    expect(screen.getByText(/Manage money with the calm of an editorial product/i)).toBeInTheDocument();
    expect(screen.getByText(/Mulai gratis, upgrade saat butuh lebih/i)).toBeInTheDocument();
    expect(screen.getByText(/Pertanyaan yang paling sering muncul/i)).toBeInTheDocument();
  });
});
