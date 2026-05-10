"use client";

import * as React from "react";

import { CaseCarousel } from "@/components/portfolio/CaseCarousel";
import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const ALL_KEY = "Все";

export function PortfolioGrid({
  cases,
  categories,
}: {
  cases: PortfolioCase[];
  categories: string[];
}) {
  const [active, setActive] = React.useState(ALL_KEY);
  const filterChips = [ALL_KEY, ...categories];
  const filtered =
    active === ALL_KEY ? cases : cases.filter((c) => c.category === active);

  return (
    <>
      <div
        role="tablist"
        aria-label="Фильтр кейсов по категории"
        className="mb-12 flex flex-wrap items-center justify-center gap-2"
      >
        {filterChips.map((chip) => (
          <button
            key={chip}
            type="button"
            role="tab"
            aria-selected={active === chip}
            onClick={() => setActive(chip)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              active === chip
                ? "bg-gradient-brand text-white shadow-brand"
                : "border-border bg-bg-elevated/40 text-text-secondary hover:bg-bg-overlay hover:text-text-primary border",
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      <CaseCarousel key={active} cases={filtered} />
    </>
  );
}
