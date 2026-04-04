"use client";

import { motion, useScroll } from "framer-motion";

export function LandingScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px bg-white/4">
      <motion.div className="h-full origin-left bg-gradient-to-r from-primary via-sky-400 to-violet-400" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
