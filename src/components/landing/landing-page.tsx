import { Landmark, PiggyBank, ShieldCheck, Sparkles, Target, Wallet } from "lucide-react";

import { LandingCursorGlow } from "@/components/landing/landing-cursor-glow";
import { LandingDemo } from "@/components/landing/landing-demo";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingScrollProgress } from "@/components/landing/landing-scroll-progress";
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
      <LandingScrollProgress />
      <LandingCursorGlow />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(247,249,252,0))] dark:bg-[radial-gradient(circle_at_top_left,rgba(87,112,255,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_26%),linear-gradient(180deg,rgba(6,12,24,0.96),rgba(9,17,31,0))]" />
      <div className="pointer-events-none absolute left-[16%] top-16 h-96 w-96 rounded-full bg-primary/14 blur-[130px]" />
      <div className="pointer-events-none absolute right-[10%] top-28 h-[28rem] w-[28rem] rounded-full bg-sky-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-[22%] top-[26rem] h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[40rem] h-72 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)] dark:bg-[linear-gradient(180deg,transparent,rgba(80,96,255,0.1),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[78rem] h-80 bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.08),transparent_64%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.14),transparent_62%)]" />
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
