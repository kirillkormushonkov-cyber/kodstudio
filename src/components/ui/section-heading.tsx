import * as React from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h2" | "h3" | "h4";

export type SectionHeadingProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  as?: HeadingLevel;
};

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      eyebrow,
      title,
      subtitle,
      align = "left",
      as = "h2",
      className,
      ...props
    },
    ref,
  ) => {
    const TitleTag = as as React.ElementType;

    return (
      <div
        ref={ref}
        className={cn(
          "flex max-w-3xl flex-col gap-4",
          align === "center" && "mx-auto items-center text-center",
          className,
        )}
        {...props}
      >
        {eyebrow ? (
          <span className="text-brand-violet text-xs font-semibold tracking-[0.22em] uppercase">
            {eyebrow}
          </span>
        ) : null}

        <TitleTag className="text-text-primary text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl">
          {title}
        </TitleTag>

        {subtitle ? (
          <p className="text-text-secondary text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    );
  },
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
