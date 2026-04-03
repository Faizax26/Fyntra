import { Landmark, PiggyBank, ShieldCheck, Sparkles, Target, Wallet } from "lucide-react";

import { LandingDemo } from "@/components/landing/landing-demo";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingStats } from "@/components/landing/landing-stats";

const features = [
  {
    icon: PiggyBank,
    title: "Budgeting made simple",
    description: "Set category limits, catch budget drift early, and stay on top of your monthly plan."
  },
  {
    icon: Wallet,
    title: "Track all your wallets",
    description: "See bank accounts, e-wallets, cash, and goal balances together without the mess."
  },
  {
    icon: Sparkles,
    title: "Smart insights",
    description: "Spot patterns, rising categories, and savings opportunities with clear AI guidance."
  },
  {
    icon: Target,
    title: "Goals that stay visible",
    description: "Turn long-term savings targets into a daily habit with live progress and milestones."
  },
  {
    icon: Landmark,
    title: "Assets and debts in one flow",
    description: "Keep obligations, investments, and transfers connected to the rest of your money picture."
  },
  {
    icon: ShieldCheck,
    title: "Secure and private",
    description: "Built with audit logs, optional 2FA, and a privacy-first approach to financial data."
  }
];

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.26),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(247,249,252,0))]" />
      <div className="pointer-events-none absolute left-1/2 top-80 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingStats />
        <LandingDemo />
        <LandingFeatures items={features} />
        <LandingPricing />
        <LandingFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
