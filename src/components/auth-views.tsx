"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const copyMap = {
  login: {
    title: "Masuk ke workspace finansialmu.",
    description: "Akses dashboard, audit log, budget alerts, dan insight AI dari satu tempat.",
    cta: "Masuk demo",
    footer: "Belum punya akun?",
    footerLink: "/register",
    footerLabel: "Daftar gratis",
    route: "/app/dashboard"
  },
  register: {
    title: "Mulai gratis, setup wallet pertama dalam hitungan menit.",
    description: "Daftar untuk mencoba onboarding, dashboard, dan modul finansial lengkap dengan data mock realistis.",
    cta: "Buat akun demo",
    footer: "Sudah punya akun?",
    footerLink: "/login",
    footerLabel: "Login",
    route: "/app/onboarding"
  },
  forgot: {
    title: "Reset akses dengan alur yang terasa aman.",
    description: "Simulasi alur reset password, notifikasi email, dan verifikasi perangkat.",
    cta: "Kirim link reset",
    footer: "Kembali ke login",
    footerLink: "/login",
    footerLabel: "Masuk",
    route: "/verify-2fa"
  },
  verify: {
    title: "Verifikasi 2FA sebelum membuka dashboard.",
    description: "Halaman ini mensimulasikan checkpoint keamanan tambahan untuk akun sensitif.",
    cta: "Verifikasi demo",
    footer: "Butuh ulangi login?",
    footerLink: "/login",
    footerLabel: "Kembali",
    route: "/app/dashboard"
  }
} as const;

export function AuthPage({ mode }: { mode: keyof typeof copyMap }) {
  const router = useRouter();
  const content = copyMap[mode];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.15),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.18),transparent_26%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="hidden flex-col justify-between rounded-[40px] border border-border/70 bg-[#172118] p-8 text-white lg:flex">
          <Logo className="[&_span:last-child]:text-white/60 [&>div:last-child]:text-white" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs">
              <Sparkles className="size-3.5" />
              Premium-feel onboarding
            </div>
            <h2 className="font-display text-5xl font-semibold leading-tight">Keamanan, budgeting, dan insight AI dalam alur yang tidak mengintimidasi.</h2>
            <div className="grid gap-4">
              {[
                "Sidebar SaaS yang bisa dikolaps dan tetap nyaman di mobile.",
                "Budget, asset, debt, goal, dan audit logs terhubung ke data mock yang sama.",
                "Upgrade prompts hadir natural tanpa mengganggu task utama pengguna."
              ].map((item) => (
                <div key={item} className="rounded-[24px] bg-white/6 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="rounded-[28px] bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-lime-400/15 text-lime-300">
                <LockKeyhole className="size-5" />
              </div>
              <div>
                <p className="font-medium">Security checkpoint</p>
                <p className="text-sm text-white/65">2FA, device verification, dan audit log siap ditampilkan di frontend.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-xl">
            <CardContent className="space-y-8 p-8">
              <div className="space-y-3">
                <Logo className="lg:hidden" />
                <h1 className="font-display text-4xl font-semibold tracking-tight">{content.title}</h1>
                <p className="text-sm leading-6 text-muted-foreground">{content.description}</p>
              </div>
              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  toast.success("Aksi auth demo berhasil", {
                    description: "Tidak ada backend auth. Kamu akan diarahkan ke flow frontend."
                  });
                  router.push(content.route);
                }}
              >
                {mode !== "verify" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@fyntra.id" />
                  </div>
                ) : null}
                {mode === "register" ? (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" placeholder="Faiza Akbar" />
                  </div>
                ) : null}
                {mode !== "forgot" && mode !== "verify" ? (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                ) : null}
                {mode === "verify" ? (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Kode 2FA</Label>
                    <Input id="otp" placeholder="123456" />
                  </div>
                ) : null}
                <Button type="submit" className="w-full">
                  {content.cta}
                  <ArrowRight className="size-4" />
                </Button>
              </form>
              <div className="flex items-center justify-between gap-3 text-sm">
                <Link href={mode === "login" ? "/forgot-password" : "/login"} className="text-muted-foreground hover:text-foreground">
                  {mode === "login" ? "Lupa password?" : content.footer}
                </Link>
                <Link href={content.footerLink} className="font-medium text-primary hover:text-primary/80">
                  {content.footerLabel}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
