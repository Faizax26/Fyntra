import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Logo href="/" />
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        <Card className="mt-10 border-white/70 bg-white/78 p-8 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Terms</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground">Simple terms for a financial workspace</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>Fyntra is intended to help users organize, understand, and act on their financial data in a clear and responsible way.</p>
            <p>Users remain in control of the data they record, the plans they choose, and the actions they take based on the product&apos;s summaries or AI guidance.</p>
            <p>As premium features expand, the terms will continue to focus on transparency, user trust, and clear expectations around security and access.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
