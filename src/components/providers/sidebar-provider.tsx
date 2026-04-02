"use client";

import * as React from "react";
import type { ReactNode } from "react";

type SidebarContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
};

const STORAGE_KEY = "fyntra:sidebar-collapsed";

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    setCollapsedState(storedValue === "true");
  }, []);

  function setCollapsed(nextValue: boolean) {
    setCollapsedState(nextValue);
    window.localStorage.setItem(STORAGE_KEY, String(nextValue));
  }

  const value = { collapsed, mobileOpen, setCollapsed, setMobileOpen };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }

  return context;
}
