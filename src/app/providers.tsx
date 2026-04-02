"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </ThemeProvider>
  );
}
