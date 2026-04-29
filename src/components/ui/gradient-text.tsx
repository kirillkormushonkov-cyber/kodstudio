import * as React from "react";

import { cn } from "@/lib/utils";

export type GradientTextProps = React.HTMLAttributes<HTMLSpanElement>;

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "bg-gradient-brand bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  ),
);
GradientText.displayName = "GradientText";

export { GradientText };
