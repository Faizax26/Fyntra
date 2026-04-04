import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "fyntra | Your money, orchestrated into one calm system",
  description:
    "A cinematic personal finance workspace for wallets, budgets, goals, and AI-guided decisions."
};

export default function HomePage() {
  return <LandingPage />;
}
