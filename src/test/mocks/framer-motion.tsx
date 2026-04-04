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

type MotionValue<T> = {
  get: () => T;
  on: (_event: string, _handler: (value: T) => void) => () => void;
};

function createMotionValue<T>(value: T): MotionValue<T> {
  return {
    get: () => value,
    on: (_event: string, _handler: (latest: T) => void) => {
      void _event;
      void _handler;
      return () => {};
    }
  };
}

export function useScroll() {
  return {
    scrollY: createMotionValue(0),
    scrollYProgress: createMotionValue(0)
  };
}

export function useTransform<TOutput>(_: unknown, __: unknown, output: TOutput[] | TOutput) {
  if (Array.isArray(output)) {
    return output[0];
  }

  return output;
}

export function useMotionValueEvent<T>(_: MotionValue<T>, __: string, ___: (value: T) => void) {
  void _;
  void __;
  void ___;
  return undefined;
}
