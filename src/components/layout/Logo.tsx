import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type LogoProps = {
  className?: string;
  href?: string;
  showWordmark?: boolean;
};

export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="KodStudio — на главную"
      className={cn(
        "group/logo flex items-center gap-2.5 outline-none",
        className,
      )}
    >
      <span className="bg-gradient-brand shadow-brand grid h-9 w-9 place-items-center rounded-[10px] transition-transform duration-200 group-hover/logo:scale-[1.06] group-focus-visible/logo:ring-2 group-focus-visible/logo:ring-brand-violet/60 group-focus-visible/logo:ring-offset-2 group-focus-visible/logo:ring-offset-bg-base">
        <span className="font-heading text-lg leading-none font-bold text-white">
          K
        </span>
      </span>
      {showWordmark && (
        <span className="font-heading text-text-primary text-base font-bold tracking-tight">
          KodStudio
        </span>
      )}
    </Link>
  );
}
