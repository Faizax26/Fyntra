"use client";

import { Toaster } from "sonner";

import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        {children}
        <Toaster richColors position="top-right" />
      </SidebarProvider>
    </ThemeProvider>
  );
}
