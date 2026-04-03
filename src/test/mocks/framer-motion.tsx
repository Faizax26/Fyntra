import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MotionDivProps = ComponentPropsWithoutRef<"div"> & {
  animate?: unknown;
  exit?: unknown;
  initial?: unknown;
  layout?: unknown;
  transition?: unknown;
  variants?: unknown;
  viewport?: unknown;
  whileHover?: unknown;
  whileInView?: unknown;
  whileTap?: unknown;
};

function MockMotionDiv({
  children,
  animate: _animate,
  exit: _exit,
  initial: _initial,
  layout: _layout,
  transition: _transition,
  variants: _variants,
  viewport: _viewport,
  whileHover: _whileHover,
  whileInView: _whileInView,
  whileTap: _whileTap,
  ...props
}: MotionDivProps & { children: ReactNode }) {
  void _animate;
  void _exit;
  void _initial;
  void _layout;
  void _transition;
  void _variants;
  void _viewport;
  void _whileHover;
  void _whileInView;
  void _whileTap;

  return <div {...props}>{children}</div>;
}

export const motion = {
  div: MockMotionDiv
};
