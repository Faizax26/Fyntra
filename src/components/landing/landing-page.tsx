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
    description: "Know exactly where spending is drifting before the month gets away from you."
  },
  {
    icon: Wallet,
    title: "Track all your wallets",
    description: "Keep every account, reserve, and e-wallet visible without juggling tabs or notes."
  },
  {
    icon: Sparkles,
    title: "Smart insights",
    description: "See the next best move faster with signals that turn raw activity into decisions."
  },
  {
    icon: Target,
    title: "Goals that stay visible",
    description: "Make long-term savings feel tangible with progress that stays in your daily view."
  },
  {
    icon: Landmark,
    title: "Assets and debts in one flow",
    description: "Understand your full position, not just your cash balance, in one connected workspace."
  },
  {
    icon: ShieldCheck,
    title: "Secure and private",
    description: "Build trust with privacy-first controls, optional 2FA, and visible account activity."
  }
];

export function LandingPage() {
  return (
    <div className="landing-shell relative min-h-screen overflow-x-clip bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(247,249,252,0))] dark:bg-[radial-gradient(circle_at_top_left,rgba(87,112,255,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(9,17,31,0.68),rgba(9,17,31,0))]" />
      <div className="pointer-events-none absolute left-[22%] top-28 h-72 w-72 rounded-full bg-primary/12 blur-[110px]" />
      <div className="pointer-events-none absolute right-[14%] top-44 h-80 w-80 rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[32rem] h-64 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.35),transparent)] dark:bg-[linear-gradient(180deg,transparent,rgba(148,163,184,0.08),transparent)]" />
      <LandingNavbar />
      <main className="relative z-10 pt-2">
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
