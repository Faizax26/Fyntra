import type { ReactNode } from "react";

export const motion = {
  div: ({ children, ...props }: { children: ReactNode }) => <div {...props}>{children}</div>
};
