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
  const showInfoPanel = mode === "register";
  const cardWidth =
    mode === "register"
      ? "max-w-[680px]"
      : mode === "login"
        ? "max-w-[560px]"
        : "max-w-[520px]";
  const contentWidth = mode === "register" ? "max-w-[470px]" : "max-w-[420px]";

  return (
    <div className="h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(123,179,26,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(13,122,112,0.18),transparent_26%)]">
      <div className={`mx-auto grid h-full max-w-7xl gap-6 px-4 py-4 lg:gap-8 lg:px-8 lg:py-6 ${showInfoPanel ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-1"}`}>
        <div className={`h-full max-h-[calc(100svh-3rem)] flex-col justify-between rounded-[42px] border border-border/70 bg-linear-to-br from-[#162019] via-[#17231d] to-[#233024] p-8 text-white shadow-[0_44px_120px_-56px_rgba(10,18,13,0.92)] xl:p-10 ${showInfoPanel ? "hidden lg:flex" : "hidden"}`}>
          <Logo className="[&_span:last-child]:text-white/60 [&>div:last-child]:text-white" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
              <Sparkles className="size-3.5" />
              Premium-feel onboarding
            </div>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] xl:text-[2.8rem]">Keamanan, budgeting, dan insight AI dalam alur yang tidak mengintimidasi.</h2>
            <div className="grid gap-3">
              {[
                "Sidebar SaaS yang bisa dikolaps dan tetap nyaman di mobile.",
                "Budget, asset, debt, goal, dan audit logs terhubung ke data mock yang sama.",
                "Upgrade prompts hadir natural tanpa mengganggu task utama pengguna."
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-white/8 bg-white/6 px-4 py-3 text-sm leading-6 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="rounded-[28px] border border-white/8 bg-white/5 p-5">
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
        <div className="flex h-full items-center justify-center">
          <Card className={`surface-elevated w-full max-h-[calc(100svh-3rem)] overflow-hidden ${cardWidth}`}>
            <CardContent className="flex h-full items-center p-6 md:p-8 lg:p-10 xl:p-12">
              <div className={`mx-auto w-full ${contentWidth} space-y-6 md:space-y-7`}>
                <div className="space-y-3">
                  <Logo className={showInfoPanel ? "lg:hidden" : ""} />
                  <div className="space-y-2.5">
                    <p className="eyebrow">Secure access</p>
                    <h1 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] md:text-[2.35rem]">
                      {content.title}
                    </h1>
                    <p className="text-sm leading-6 text-muted-foreground md:text-[0.96rem]">{content.description}</p>
                  </div>
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
                  {mode === "register" ? (
                    <div className="space-y-2.5">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" placeholder="Faiza Akbar" className="h-11 md:h-12" />
                    </div>
                  ) : null}
                  {mode !== "verify" ? (
                    <div className="space-y-2.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="nama@fyntra.id" className="h-11 md:h-12" />
                    </div>
                  ) : null}
                  {mode !== "forgot" && mode !== "verify" ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-4">
                        <Label htmlFor="password">Password</Label>
                        {mode === "login" ? (
                          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                            Lupa password?
                          </Link>
                        ) : null}
                      </div>
                      <Input id="password" type="password" placeholder="••••••••" className="h-11 md:h-12" />
                    </div>
                  ) : null}
                  {mode === "verify" ? (
                    <div className="space-y-2.5">
                      <Label htmlFor="otp">Kode 2FA</Label>
                      <Input id="otp" placeholder="123456" className="h-11 text-center tracking-[0.4em] md:h-12" />
                    </div>
                  ) : null}
                  <Button type="submit" className="h-11 w-full md:h-12">
                    {content.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                  {mode === "login" || mode === "register" ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/70" />
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">gunakan metode lain</span>
                        <div className="h-px flex-1 bg-border/70" />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full md:h-12"
                        onClick={() =>
                          toast.success("Google sign-in demo", {
                            description: "Autentikasi Google masih berupa simulasi frontend."
                          })
                        }
                      >
                        <span className="text-base font-semibold">G</span>
                        Lanjutkan dengan Google
                      </Button>
                    </>
                  ) : null}
                </form>
                <div className="border-t border-border/60 pt-5 text-center text-sm">
                  {mode === "login" ? (
                    <p className="text-muted-foreground">
                      Belum memiliki akun?{" "}
                      <Link href="/register" className="font-medium text-primary hover:text-primary/80">
                        Daftar Gratis
                      </Link>
                    </p>
                  ) : null}
                  {mode === "register" ? (
                    <p className="text-muted-foreground">
                      Sudah punya akun?{" "}
                      <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                        Masuk
                      </Link>
                    </p>
                  ) : null}
                  {mode === "forgot" || mode === "verify" ? (
                    <p className="text-muted-foreground">
                      {content.footer}{" "}
                      <Link href={content.footerLink} className="font-medium text-primary hover:text-primary/80">
                        {content.footerLabel}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
