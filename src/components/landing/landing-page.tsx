import { FAQSection } from "@/components/landing/faq-section";
import { FeatureMosaicSection } from "@/components/landing/feature-mosaic-section";
import { FloatingRevealSection } from "@/components/landing/floating-reveal-section";
import { HeroFilmSection } from "@/components/landing/hero-film-section";
import { LandingCursorGlow } from "@/components/landing/landing-cursor-glow";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingScrollProgress } from "@/components/landing/landing-scroll-progress";
import { PricingRevealSection } from "@/components/landing/pricing-reveal-section";
import { StorySequenceSection } from "@/components/landing/story-sequence-section";

export function LandingPage() {
  return (
    <div className="landing-shell relative min-h-screen overflow-x-clip bg-background">
      <LandingScrollProgress />
      <LandingCursorGlow />
      <div className="landing-film-grain pointer-events-none fixed inset-0 z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[52rem] bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.34),rgba(247,249,252,0))] dark:bg-[radial-gradient(circle_at_top_left,rgba(87,112,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_24%),linear-gradient(180deg,rgba(4,10,22,0.98),rgba(9,17,31,0))]" />
      <div className="pointer-events-none absolute left-[12%] top-10 h-[28rem] w-[28rem] rounded-full bg-primary/14 blur-[140px]" />
      <div className="pointer-events-none absolute right-[10%] top-36 h-[30rem] w-[30rem] rounded-full bg-sky-400/12 blur-[160px]" />
      <div className="pointer-events-none absolute left-[36%] top-[64rem] h-[22rem] w-[22rem] rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-[18%] top-[140rem] h-[26rem] w-[26rem] rounded-full bg-primary/12 blur-[150px]" />
      <LandingNavbar />
      <main className="relative z-10">
        <HeroFilmSection />
        <FloatingRevealSection />
        <StorySequenceSection />
        <FeatureMosaicSection />
        <PricingRevealSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
