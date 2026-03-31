"use client";

import Link from "next/link";
import { Check, LockKeyhole, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import type { AppData } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export function LandingPage({ data }: { data: AppData }) {
  return (
    <div className="pb-8">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
        <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.55 }} className="space-y-6 pt-2">
          <Badge variant="secondary" className="gap-2">
            <Sparkles className="size-3.5" />
            Personal finance, made clear
          </Badge>
          <div className="space-y-4">
            <p className="eyebrow">Finance OS for modern households</p>
            <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[0.97] tracking-[-0.06em] md:text-7xl">
              Uangmu, rapi dalam satu dashboard.
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Catat transaksi, atur budget, pantau asset, debt, dan goal tanpa spreadsheet yang bikin ribet.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">Mulai gratis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app/dashboard">Lihat demo app</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 18, y: 12 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative lg:pt-6">
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-lime-400/15 blur-3xl lg:block" />
          <div className="absolute -right-10 top-1/2 hidden h-40 w-40 rounded-full bg-primary/14 blur-3xl lg:block" />
          <DashboardPreview data={data} />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.landingStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.08 * index, duration: 0.4 }}
              className="flex min-h-32 flex-col items-center justify-center rounded-[26px] border border-border/60 bg-[color:var(--surface-2)] px-5 py-5 text-center shadow-sm"
            >
              <p className="font-display text-3xl font-semibold tracking-[-0.05em]">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-8 space-y-3">
          <Badge variant="secondary">Features</Badge>
          <h2 className="section-title">Fitur utama yang langsung kepakai.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Goal tracking",
              description: "Pantau progres tabungan dan target finansial langsung dari wallet atau alokasi transaksi."
            },
            {
              icon: TrendingUp,
              title: "Budget & analytics",
              description: "Lihat cashflow, kategori pengeluaran, dan budget yang hampir habis dengan cepat."
            },
            {
              icon: LockKeyhole,
              title: "Security center",
              description: "Audit log, device history, dan 2FA dibuat jelas untuk pengguna non-teknis."
            }
          ].map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardContent className="space-y-4 p-6 md:p-7">
                <div className="mb-1 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="rounded-[38px] border border-border/70 bg-linear-to-br from-[#18211a] via-[#162720] to-[#23301f] p-8 text-white shadow-[0_40px_120px_-60px_rgba(14,26,19,0.92)] md:p-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <Badge variant="warning" className="border-white/10 bg-white/10 text-white">
                Pricing
              </Badge>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.05em]">Mulai gratis, upgrade saat butuh lebih.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/72">
              Free cukup untuk mulai mencatat dan budgeting. Premium membuka AI coach, analytics mendalam, wallet tanpa batas, dan pusat keamanan yang lebih lengkap.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            {data.subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={plan.id === "premium" ? "surface-elevated border-lime-400/20 bg-white text-foreground" : "border-white/10 bg-white/6 text-white"}>
                <CardContent className="space-y-7 p-7 md:p-8">
                  <div className="space-y-3">
                    <p className={plan.id === "premium" ? "eyebrow" : "text-sm uppercase tracking-[0.22em] text-white/60"}>{plan.name}</p>
                    <div className="flex items-end gap-2">
                      <p className={plan.id === "premium" ? "font-display text-5xl font-semibold tracking-[-0.06em]" : "font-display text-4xl font-semibold tracking-[-0.05em]"}>{plan.price}</p>
                      {plan.id === "premium" ? <Badge>Popular</Badge> : null}
                    </div>
                    <p className={plan.id === "premium" ? "text-sm text-muted-foreground" : "text-sm text-white/68"}>{plan.description}</p>
                  </div>
                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <div className={plan.id === "premium" ? "flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary" : "flex size-6 items-center justify-center rounded-full bg-white/10 text-lime-300"}>
                          <Check className="size-3.5" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant={plan.id === "premium" ? "default" : "outline"}
                    className={plan.id === "premium" ? "w-full" : "w-full border-white/10 bg-white/8 text-white hover:bg-white/12 hover:text-white"}
                  >
                    <Link href={plan.id === "premium" ? "/app/upgrade" : "/register"}>{plan.id === "premium" ? "Upgrade to Premium" : "Start free"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <div className="mb-8 space-y-3 text-center">
          <Badge variant="secondary">FAQ</Badge>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.05em]">Pertanyaan yang paling sering muncul.</h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">Jawaban cepat untuk pertanyaan umum tentang penggunaan, keamanan, dan paket.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {data.faqItems.map((item) => (
            <AccordionItem value={item.question} key={item.question} className="bg-[color:var(--surface-1)]">
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

function DashboardPreview({ data }: { data: AppData }) {
  return (
    <div className="relative mx-auto w-full max-w-[760px] pt-6 lg:pt-0">
      <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-lime-400/14 blur-3xl" />
      <div className="absolute right-0 top-28 h-44 w-44 rounded-full bg-primary/16 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[700px]">
        <div className="rounded-[32px] border border-[#3c433f] bg-[#d8ddd8] px-5 pt-5 shadow-[0_48px_120px_-56px_rgba(14,22,18,0.95)]">
          <div className="overflow-hidden rounded-[22px] border border-[#29302b] bg-[#111915] text-white">
            <div className="flex items-center gap-2 border-b border-white/8 bg-[#1a221d] px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                Dashboard
              </div>
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[24px] bg-white/7 p-5">
                <p className="eyebrow text-white/58">Total balance</p>
                <p className="mt-3 font-display text-5xl font-semibold tracking-[-0.06em]">{formatCurrency(data.dashboardSummary.totalBalance)}</p>
                <p className="mt-3 text-sm text-emerald-300">+12.8% vs bulan lalu</p>
              </div>
              <div className="rounded-[24px] bg-linear-to-br from-white/10 to-white/4 p-5">
                <p className="eyebrow text-white/58">AI coach says</p>
                <p className="mt-2 text-base leading-7 text-white/90">
                  Kurangi spend transport 9% dan pindahkan freelance income ke emergency fund untuk mempercepat target 19 hari lebih awal.
                </p>
              </div>
            </div>
            <div className="grid gap-4 border-t border-white/8 p-4 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="rounded-[24px] bg-white/6 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="eyebrow text-white/58">Recent transactions</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]">Synced manually</span>
                </div>
                <div className="space-y-3">
                  {data.transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-[18px] border border-white/6 bg-black/10 px-4 py-3">
                      <div>
                        <p className="font-medium">{transaction.merchant}</p>
                        <p className="text-xs text-white/60">{transaction.notes}</p>
                      </div>
                      <p className={transaction.type === "income" ? "text-emerald-300" : "text-white"}>{formatCurrency(transaction.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] bg-white/6 p-5">
                <p className="mb-4 eyebrow text-white/58">Goals and budgets</p>
                <div className="space-y-4">
                  {data.goals.slice(0, 2).map((goal) => (
                    <div key={goal.id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>{goal.name}</span>
                        <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-lime-400" style={{ width: `${Math.round((goal.currentAmount / goal.targetAmount) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-5 w-[28%] rounded-b-[999px] bg-[#b5bcb6]" />
        </div>
      </div>

      <div className="absolute -left-2 bottom-10 hidden w-[250px] rounded-[28px] border border-[#4d5750] bg-[#cfd6d0] p-3 shadow-[0_36px_80px_-44px_rgba(16,24,19,0.9)] md:block">
        <div className="overflow-hidden rounded-[22px] border border-[#27302a] bg-[#121915] text-white">
          <div className="border-b border-white/8 px-4 py-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/55">
            Tablet view
          </div>
          <div className="space-y-3 p-4">
            <div className="rounded-[18px] bg-white/7 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">Cashflow</p>
              <div className="mt-3 flex items-end gap-2">
                {data.cashflowSeries.slice(-4).map((item, index) => (
                  <div
                    key={item.label}
                    className={`w-full rounded-full ${index % 2 === 0 ? "bg-primary/90" : "bg-lime-400/90"}`}
                    style={{ height: `${48 + index * 14}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[18px] bg-white/7 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">Upcoming</p>
              <div className="mt-3 space-y-2">
                {data.reminders.slice(0, 2).map((reminder) => (
                  <div key={reminder.id} className="rounded-[14px] bg-black/12 px-3 py-2 text-sm">
                    {reminder.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 right-0 w-[150px] rounded-[34px] border border-[#3e4741] bg-[#d4dad4] p-2.5 shadow-[0_34px_80px_-42px_rgba(10,18,14,0.95)] sm:w-[170px]">
        <div className="overflow-hidden rounded-[28px] border border-[#283029] bg-[#101713] text-white">
          <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-white/14" />
          <div className="space-y-3 p-3">
            <div className="rounded-[18px] bg-white/7 p-3">
              <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/55">Mobile</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.05em]">{formatCurrency(data.wallets[0]?.balance ?? 0)}</p>
            </div>
            <div className="rounded-[18px] bg-white/7 p-3">
              <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/55">Goal</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-lime-400" style={{ width: `${Math.round((data.goals[0].currentAmount / data.goals[0].targetAmount) * 100)}%` }} />
              </div>
              <p className="mt-2 text-xs text-white/72">{data.goals[0].name}</p>
            </div>
            <div className="rounded-[18px] bg-white/7 p-3">
              <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/55">Alert</p>
              <p className="mt-2 text-xs leading-5 text-amber-200">Budget tagihan hampir habis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GenericMarketingPage({
  badge,
  title,
  description,
  children
}: {
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary">{badge}</Badge>
        <h1 className="font-display text-5xl font-semibold tracking-[-0.05em]">{title}</h1>
        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function PricingPageContent({ data }: { data: AppData }) {
  return (
    <GenericMarketingPage
      badge="Pricing"
      title="Harga yang tumbuh bersama kebutuhan finansialmu."
      description="Mulai dengan paket gratis untuk tracking dasar, lalu naik ke Premium saat perlu insight yang lebih dalam dan kendali lintas modul."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {data.subscriptionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{plan.name}</p>
                <p className="font-display text-4xl font-semibold tracking-[-0.05em]">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
              <Button asChild className="w-full" variant={plan.id === "premium" ? "default" : "outline"}>
                <Link href={plan.id === "premium" ? "/app/upgrade" : "/register"}>{plan.id === "premium" ? "Upgrade sekarang" : "Mulai gratis"}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </GenericMarketingPage>
  );
}

export function FaqPageContent({ data }: { data: AppData }) {
  return (
    <GenericMarketingPage
      badge="FAQ"
      title="Jawaban ringkas untuk pertanyaan paling umum."
      description="Bagian ini menjelaskan keamanan, penggunaan, dan model langganan tanpa bahasa teknis yang membuat pengguna baru bingung."
    >
      <Accordion type="single" collapsible className="space-y-4">
        {data.faqItems.map((item) => (
          <AccordionItem value={item.question} key={item.question} className="bg-[color:var(--surface-1)]">
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </GenericMarketingPage>
  );
}

export function FeaturesPageContent({ data }: { data: AppData }) {
  return (
    <GenericMarketingPage
      badge="Features"
      title="Semua modul penting keuangan pribadi, terhubung dalam satu dashboard."
      description="Tidak ada lagi tools terpisah untuk mencatat pengeluaran, mengecek budget, memantau portofolio, atau melihat aktivitas keamanan."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Budget + alerts",
            description: "Limit bulanan, indikator mendekati batas, dan rekomendasi AI untuk penyesuaian kategori.",
            icon: TrendingUp
          },
          {
            title: "Goals with dedicated wallet",
            description: "Setiap target dapat terhubung ke wallet khusus agar progress terlihat otomatis setiap ada transaksi masuk.",
            icon: Target
          },
          {
            title: "Security center",
            description: "Audit log, 2FA, dan histori device disusun seperti modul produk inti, bukan halaman tersembunyi.",
            icon: ShieldCheck
          }
        ].map((feature) => (
          <Card key={feature.title}>
            <CardContent className="space-y-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold">{feature.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {data.featureHighlights.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="space-y-3 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Why it matters</p>
              <h3 className="font-display text-2xl font-semibold">{feature.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </GenericMarketingPage>
  );
}

export function LegalPageContent({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <GenericMarketingPage badge="Legal" title={title} description={description}>
      <div className="grid gap-6">
        {[
          "Frontend prototype ini menampilkan placeholder legal copy yang konsisten dengan desain produk.",
          "Kebijakan final untuk privasi, pemrosesan data, dan syarat layanan perlu ditulis ulang saat backend, auth, dan storage sudah ditetapkan.",
          "Walau masih mock, seluruh struktur halaman sudah siap untuk dipasang konten legal lengkap tanpa mengubah layout utama."
        ].map((copy) => (
          <Card key={copy}>
            <CardContent className="p-6 text-sm leading-7 text-muted-foreground">{copy}</CardContent>
          </Card>
        ))}
      </div>
    </GenericMarketingPage>
  );
}
