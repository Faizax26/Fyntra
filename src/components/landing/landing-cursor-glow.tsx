"use client";

import { motion } from "framer-motion";

import { usePointerGlow } from "@/components/landing/landing-hooks";

export function LandingCursorGlow() {
  const { position, visible } = usePointerGlow();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,87,255,0.16),rgba(56,189,248,0.08),transparent_68%)] blur-3xl lg:block"
      animate={{
        x: position.x - 144,
        y: position.y - 144,
        opacity: visible ? 0.85 : 0
      }}
      transition={{
        x: { type: "spring", stiffness: 70, damping: 24, mass: 0.6 },
        y: { type: "spring", stiffness: 70, damping: 24, mass: 0.6 },
        opacity: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
      }}
    />
  );
}
