"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { LandingMotionItem, LandingStagger } from "@/components/landing/landing-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-18 lg:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        <div className="landing-ribbon landing-ribbon-primary absolute left-[-8%] top-6 h-56 w-[42rem] rotate-[10deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-secondary absolute right-[-6%] top-20 h-64 w-[34rem] -rotate-[18deg] rounded-full blur-3xl" />
        <div className="landing-ribbon landing-ribbon-accent absolute left-[18%] top-48 h-40 w-[26rem] rotate-[6deg] rounded-full blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          className="relative z-10 max-w-2xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <LandingMotionItem y={14}>
            <Badge className="rounded-full border border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.16),rgba(168,85,247,0.1))] px-4 py-2 text-primary shadow-[0_18px_34px_-24px_rgba(56,87,255,0.48)]">
              Personal finance, without the spreadsheet chaos
            </Badge>
          </LandingMotionItem>

          <LandingMotionItem y={18}>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.085em] text-foreground sm:text-6xl lg:text-[5.35rem] lg:leading-[0.95]">
              Take control of your money in one place
            </h1>
          </LandingMotionItem>

          <LandingMotionItem y={20}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-[1.22rem]">
              Fyntra brings budgeting, wallet tracking, and smart financial insights into a calm workspace that helps
              you make better decisions faster.
            </p>
          </LandingMotionItem>

          <LandingMotionItem y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="landing-cta-primary h-12 rounded-full px-6 text-sm text-primary-foreground sm:text-base">
                <Link href="/app/dashboard">
                  Get Started for Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="landing-cta-secondary h-12 rounded-full border-border/70 bg-background/72 px-6 text-sm shadow-[0_14px_34px_-26px_rgba(15,23,42,0.26)] backdrop-blur-xl sm:text-base"
              >
                <Link href="#demo">
                  <Play className="size-4" />
                  See how it works
                </Link>
              </Button>
            </div>
          </LandingMotionItem>

          <LandingStagger className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.08} delay={0.18}>
            {[
              "Budgets that stay calm",
              "Signals that drive action",
              "One workspace for the full picture"
            ].map((item) => (
              <LandingMotionItem key={item} y={12}>
                <div className="rounded-2xl border border-border/70 bg-card/68 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-xl">
                  {item}
                </div>
              </LandingMotionItem>
            ))}
          </LandingStagger>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative hidden min-h-[30rem] lg:block"
        >
          <div className="absolute inset-0 rounded-[3rem] border border-white/6 bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.16),transparent_48%)]" />
          <div className="absolute left-[10%] top-[14%] h-40 w-[28rem] rounded-full bg-[linear-gradient(90deg,rgba(56,87,255,0.24),rgba(168,85,247,0.18),rgba(56,189,248,0.16))] blur-3xl" />
          <div className="absolute right-[8%] top-[38%] h-44 w-[24rem] rounded-full bg-[linear-gradient(90deg,rgba(56,189,248,0.18),rgba(236,72,153,0.12),rgba(56,87,255,0.18))] blur-3xl" />
          <div className="absolute left-[18%] top-[22%] h-[18rem] w-[18rem] rounded-full border border-white/8 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_center,rgba(56,87,255,0.22),transparent_66%)] backdrop-blur-2xl" />
          <div className="absolute right-[15%] top-[18%] h-[11rem] w-[11rem] rounded-[2.5rem] border border-white/10 bg-card/40 backdrop-blur-2xl" />
          <div className="absolute left-[28%] top-[48%] h-[9rem] w-[18rem] rounded-[2rem] border border-white/10 bg-card/34 backdrop-blur-2xl" />
          <div className="absolute right-[18%] top-[52%] h-[12rem] w-[12rem] rounded-[2.75rem] border border-primary/16 bg-[linear-gradient(180deg,rgba(56,87,255,0.22),rgba(56,87,255,0.04))] backdrop-blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
