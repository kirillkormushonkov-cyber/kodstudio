import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-medium tracking-tight whitespace-nowrap select-none outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand bg-[length:200%_200%] bg-[position:0%_50%] text-white shadow-brand hover:bg-[position:100%_50%] hover:shadow-glow active:scale-[0.98]",
        ghost:
          "border border-border bg-transparent text-text-primary hover:border-brand-purple/40 hover:bg-bg-elevated active:scale-[0.98]",
        outline:
          "border-2 border-brand-violet bg-transparent text-brand-violet hover:bg-brand-violet/10 active:scale-[0.98]",
        link: "text-brand-violet underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-5 text-base [&_svg]:size-4",
        lg: "h-14 px-7 text-lg [&_svg]:size-5",
      },
    },
    compoundVariants: [
      { variant: "link", className: "h-auto rounded-md p-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="inline-flex" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {children}
        {!loading && rightIcon ? (
          <span className="inline-flex" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
