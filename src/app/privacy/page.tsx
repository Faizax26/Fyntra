import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Logo href="/" />
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        <Card className="mt-10 border-border/70 bg-card/80 p-8 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground">Your financial data stays yours</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>Fyntra is built for sensitive information, so privacy is treated as a product requirement instead of a footer afterthought.</p>
            <p>Account activity, security events, and permission-sensitive changes are designed to be logged clearly so users can understand what happened and when.</p>
            <p>As the platform evolves, privacy controls will continue to prioritize visibility, user choice, and careful handling of financial data.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
