"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ compact = true, className }: { compact?: boolean; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size={compact ? "icon" : "default"}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "theme-toggle-surface border-border/70 bg-background/72 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.34)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/25 hover:bg-background/88 hover:shadow-[0_18px_34px_-22px_rgba(56,87,255,0.32)]",
        compact ? "size-11 rounded-full" : "h-11 rounded-full px-4",
        className
      )}
    >
      {mounted ? (isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />) : <Moon className="size-4" />}
      {!compact ? <span className="text-sm">{mounted ? (isDark ? "Dark" : "Light") : "Theme"}</span> : null}
    </Button>
  );
}
