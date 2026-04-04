"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

type LandingScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

export function useLandingSectionProgress<T extends HTMLElement>(
  offset: LandingScrollOptions["offset"] = ["start end", "end start"]
) {
  const ref = useRef<T | null>(null);
  const scroll = useScroll({
    target: ref,
    offset
  });

  return { ref, ...scroll };
}

export function usePointerGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return { position, visible };
}
