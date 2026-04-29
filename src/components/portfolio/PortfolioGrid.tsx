"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CaseCard } from "@/components/portfolio/CaseCard";
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

      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((c) => (
            <motion.div
              key={c.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CaseCard data={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-text-muted mt-8 text-center text-sm">
          Кейсов в этой категории пока нет.
        </p>
      )}
    </>
  );
}
