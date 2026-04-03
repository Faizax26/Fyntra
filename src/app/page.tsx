import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "fyntra | Take control of your money in one place",
  description:
    "Track wallets, budgets, goals, and AI-powered insights in one calm personal finance workspace."
};

export default function HomePage() {
  return <LandingPage />;
}
