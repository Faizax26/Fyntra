"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { LandingMotionItem, LandingReveal, LandingStagger } from "@/components/landing/landing-motion";
import { LandingSectionHeading } from "@/components/landing/landing-section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is my data secure?",
    answer: "Fyntra is designed with audit logs, optional 2FA, and a privacy-first approach because financial data should never feel exposed."
  },
  {
    question: "Is this free?",
    answer: "Yes. You can start with the Free plan for core tracking, budgeting, and basic analytics, then upgrade only when you need more depth."
  },
  {
    question: "Can I track multiple accounts?",
    answer: "Yes. Fyntra supports multiple wallets so you can keep bank accounts, e-wallets, cash, and goal balances in one workspace."
  },
  {
    question: "Do you connect to banks?",
    answer: "The current experience is centered on manual tracking for clarity and control, with room for future connected workflows."
  }
];

export function LandingFaq() {
  const [openItem, setOpenItem] = useState(0);

  return (
    <section id="faq" className="landing-section scroll-mt-36">
      <div className="mx-auto max-w-4xl">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="FAQ"
            title="Answers that reduce friction before signup"
            description="Keep the decision simple with clear answers on privacy, pricing, and how the product fits real financial workflows."
          />
        </LandingReveal>
        <LandingStagger className="mt-8 grid gap-4" stagger={0.08}>
          {faqs.map((item, index) => {
            const isOpen = openItem === index;

            return (
              <LandingMotionItem key={item.question}>
                <Card className="border-border/70 bg-card/78 p-2 backdrop-blur-xl transition-all duration-200 hover:border-primary/16 hover:shadow-[0_22px_48px_-38px_rgba(56,87,255,0.18)]">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold tracking-[-0.03em] text-foreground">{item.question}</span>
                    <span
                      className={cn(
                        "relative flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200",
                        isOpen
                          ? "border-primary/24 bg-primary/12 text-primary shadow-[0_14px_28px_-18px_rgba(56,87,255,0.34)]"
                          : "border-border/70 bg-background/72 text-muted-foreground"
                      )}
                    >
                      <Plus className={cn("absolute size-4 transition-all duration-200", isOpen && "rotate-90 opacity-0")} />
                      <Minus className={cn("absolute size-4 transition-all duration-200", isOpen ? "opacity-100" : "opacity-0")} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 text-sm leading-7 text-muted-foreground">{item.answer}</div>
                    </div>
                  </div>
                </Card>
              </LandingMotionItem>
            );
          })}
        </LandingStagger>
      </div>
    </section>
  );
}
