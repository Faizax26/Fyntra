"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, CreditCard, Plus } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

type FabAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  primary?: boolean;
};

const fabActions: FabAction[] = [
  { id: "add-transaction", label: "Add transaction", icon: Plus, primary: true },
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
  { id: "add-wallet", label: "Add wallet", icon: CreditCard }
];

export function FloatingActionFab() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function handleAction(label: string) {
    setOpen(false);
    toast.info(`${label} is part of the next feature phase.`);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close quick actions"
        tabIndex={open ? 0 : -1}
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/6 backdrop-blur-[0.6px] transition-opacity duration-200 ease-out",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div ref={containerRef} className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
        <div className="flex flex-col items-end gap-3">
          {fabActions.map((action, index) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                tabIndex={open ? 0 : -1}
                aria-hidden={!open}
                onClick={() => handleAction(action.label)}
                style={{ transitionDelay: open ? `${index * 70}ms` : "0ms" }}
                className={cn(
                  "group flex cursor-pointer items-center gap-4 rounded-full border border-border/70 bg-background/82 px-3.5 py-2.5 pr-6 text-left shadow-[0_16px_34px_-24px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-background/95 hover:shadow-[0_20px_42px_-24px_rgba(56,87,255,0.18)] dark:border-white/10 dark:bg-slate-950/70 dark:hover:bg-slate-950/85",
                  action.primary &&
                    "scale-[1.02] border-primary/20 bg-background/90 brightness-[1.02] shadow-[0_20px_40px_-24px_rgba(56,87,255,0.28)] dark:border-primary/20 dark:bg-slate-950/84",
                  !action.primary && "text-foreground/72 dark:text-white/70",
                  open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
                )}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/75 text-muted-foreground transition-all duration-200 group-hover:scale-105 group-hover:brightness-105 dark:border-white/10 dark:bg-white/5 dark:text-white/72",
                    action.primary &&
                      "border-primary/15 bg-gradient-to-br from-primary to-indigo-500 text-primary-foreground shadow-[0_16px_28px_-18px_rgba(56,87,255,0.46)] dark:from-primary dark:to-indigo-500"
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "pr-1 text-sm font-medium",
                    action.primary ? "text-foreground dark:text-white" : "text-foreground/72 dark:text-white/68"
                  )}
                >
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border border-white/8 bg-background/72 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_14px_28px_-24px_rgba(15,23,42,0.26)] backdrop-blur-xl transition-all duration-200",
              open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100"
            )}
          >
            Quick actions
          </span>
          <button
            type="button"
            aria-label="Open quick actions"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "flex size-[48px] cursor-pointer items-center justify-center rounded-full outline-none transition duration-200 ease-out hover:scale-[1.02] active:scale-[0.97]",
              open
                ? "bg-slate-900/80 text-white shadow-[0_14px_28px_-20px_rgba(15,23,42,0.28)] ring-1 ring-white/10 hover:bg-slate-900/90 dark:bg-slate-900/80"
                : "bg-gradient-to-br from-primary/92 to-indigo-500/92 text-primary-foreground shadow-[0_14px_24px_-20px_rgba(56,87,255,0.24)] ring-1 ring-primary/10 hover:brightness-[1.02]"
            )}
          >
            <span className={cn("transition-transform duration-200 ease-out", open && "rotate-45")}>
              <Plus className="size-5" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
