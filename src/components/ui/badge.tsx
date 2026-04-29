import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide whitespace-nowrap ring-1 backdrop-blur-sm [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        violet: "bg-brand-violet/12 text-brand-violet ring-brand-violet/25",
        purple: "bg-brand-purple/12 text-brand-purple ring-brand-purple/25",
        magenta:
          "bg-brand-magenta/12 text-brand-magenta ring-brand-magenta/25",
        pink: "bg-brand-pink/12 text-brand-pink ring-brand-pink/25",
        neutral: "bg-bg-elevated/60 text-text-secondary ring-border",
      },
    },
    defaultVariants: { tone: "violet" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode;
  };

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ tone }), className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
