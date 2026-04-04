"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Landmark, LockKeyhole, ShieldCheck, Smartphone, WalletCards } from "lucide-react";

import { LandingReveal } from "@/components/landing/landing-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "secure",
    question: "How secure is my data in Fyntra?",
    answer:
      "Fyntra is designed with privacy-first defaults, encrypted storage paths, audit visibility, and optional 2FA so sensitive financial context stays protected."
  },
  {
    id: "free",
    question: "Can I really start with Fyntra for free?",
    answer:
      "Yes. The free plan covers the core tracking experience so you can bring wallets, budgets, and goals into one view before deciding whether premium depth is worth it."
  },
  {
    id: "accounts",
    question: "Can I track multiple wallets and accounts?",
    answer:
      "Yes. Fyntra is built to hold bank accounts, e-wallets, cash reserves, and goal wallets as one coordinated personal finance system."
  },
  {
    id: "banks",
    question: "Do you connect directly to banks?",
    answer:
      "Fyntra is designed to support multi-account workflows while keeping control explicit. The product experience prioritizes clarity, consent, and visibility over hidden automation."
  }
] as const;

const trustSignals = [
  {
    title: "Privacy-first",
    body: "Controls are designed to minimize exposure by default.",
    icon: LockKeyhole
  },
  {
    title: "Audit logs",
    body: "Sensitive changes stay visible and reviewable.",
    icon: Landmark
  },
  {
    title: "Optional 2FA",
    body: "Extra protection is available when you want it.",
    icon: Smartphone
  },
  {
    title: "Multi-account ready",
    body: "One workspace can hold the full personal finance picture.",
    icon: WalletCards
  }
] as const;

export function FAQSection() {
  const [openId, setOpenId] = useState<string>(faqs[0].id);

  return (
    <section id="faq" className="landing-section relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <LandingReveal className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">FAQ / trust</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.065em] text-foreground sm:text-5xl">
            Calm answers for the last questions before signup.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            The product is designed to feel premium, but the operational details still matter. These are the answers
            that reduce friction without cluttering the page.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {trustSignals.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="landing-surface rounded-[1.7rem] border border-border/70 p-5"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-5 text-base font-semibold text-foreground">{signal.title}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{signal.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.9rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(56,87,255,0.12),rgba(168,85,247,0.08))] p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">Secure by design</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Fyntra is intentionally shaped around clear permissions, visible history, and a lower-noise personal
                  finance workflow.
                </p>
              </div>
            </div>
          </div>
        </LandingReveal>

        <LandingReveal delay={0.08}>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                  className={cn(
                    "landing-surface overflow-hidden rounded-[1.9rem] border transition-colors",
                    isOpen ? "border-primary/20" : "border-border/70"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? "" : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-lg font-semibold tracking-[-0.03em] text-foreground">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0"
                    >
                      <ChevronDown className="size-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <motion.div
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    initial={false}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1">
                      <div className="h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />
                      <p className="pt-5 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}
