"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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
    <section id="faq" className="scroll-mt-28 px-4 py-18 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <LandingSectionHeading
          eyebrow="FAQ"
          title="Answers that reduce friction before signup"
          description="Keep the decision simple with clear answers on privacy, pricing, and how the product fits real financial workflows."
        />
        <div className="mt-10 grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openItem === index;

            return (
              <Card key={item.question} className="border-border/70 bg-card/78 p-2 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold tracking-[-0.03em] text-foreground">{item.question}</span>
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                      isOpen ? "border-primary/20 bg-primary/10 text-primary" : "border-border/70 bg-background/72 text-muted-foreground"
                    )}
                  >
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                {isOpen ? <div className="px-5 pb-5 pt-1 text-sm leading-7 text-muted-foreground">{item.answer}</div> : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
