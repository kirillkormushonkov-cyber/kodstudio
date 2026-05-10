"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CaseCard } from "@/components/portfolio/CaseCard";
import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/**
 * Compute shortest signed offset between two indices on a wrap-around list.
 * E.g. with 6 items, getOffset(0, 5) === -1, not 5.
 */
function shortestOffset(index: number, active: number, total: number): number {
  if (total <= 0) return 0;
  const direct = index - active;
  const half = total / 2;
  if (direct > half) return direct - total;
  if (direct < -half) return direct + total;
  return direct;
}

const VISIBLE_NEIGHBORS = 2; // how many cases on each side stay rendered
const ACTIVE_SCALE = 1.06;
const NEIGHBOR_SCALE = 0.74;
const FAR_SCALE = 0.58;
const X_STEP_PERCENT = 62;
const ACTIVE_OPACITY = 1;
const NEIGHBOR_OPACITY = 0.42;
const FAR_OPACITY = 0.18;
const Z_STEP = 10;
const MOUSE_COOLDOWN_MS = 950;
const EDGE_TRIGGER_PCT = 0.14;

export function CaseCarousel({ cases }: { cases: PortfolioCase[] }) {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const total = cases.length;
  const reduce = useReducedMotion();

  // Clamp when the list shrinks (e.g. when a filter changes).
  React.useEffect(() => {
    if (active >= total && total > 0) setActive(0);
  }, [active, total]);

  const goTo = React.useCallback(
    (i: number) => {
      if (total === 0) return;
      setActive(((i % total) + total) % total);
    },
    [total],
  );
  const next = React.useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = React.useCallback(() => goTo(active - 1), [active, goTo]);

  // Mouse-driven navigation: cursor in the left/right edge zone of the
  // carousel triggers prev/next with a cooldown so it doesn't jitter.
  React.useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    let lastTrigger = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTrigger < MOUSE_COOLDOWN_MS) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;
      if (pct >= 1 - EDGE_TRIGGER_PCT) {
        lastTrigger = now;
        next();
      } else if (pct <= EDGE_TRIGGER_PCT) {
        lastTrigger = now;
        prev();
      }
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduce, next, prev]);

  // Keyboard arrows when carousel is focused.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (total === 0) {
    return (
      <p className="text-text-muted py-12 text-center text-sm">
        Кейсов не нашлось.
      </p>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Кейсы"
        tabIndex={0}
        className="relative mx-auto h-[440px] w-full overflow-hidden focus:outline-none md:h-[520px] lg:h-[560px]"
      >
        {cases.map((c, i) => {
          const offset = shortestOffset(i, active, total);
          const absOffset = Math.abs(offset);
          if (absOffset > VISIBLE_NEIGHBORS) return null;

          const isActive = offset === 0;
          const x = offset * X_STEP_PERCENT;
          const scale = isActive
            ? ACTIVE_SCALE
            : absOffset === 1
              ? NEIGHBOR_SCALE
              : FAR_SCALE;
          const opacity = isActive
            ? ACTIVE_OPACITY
            : absOffset === 1
              ? NEIGHBOR_OPACITY
              : FAR_OPACITY;
          const z = Math.max(1, 30 - absOffset * Z_STEP);

          return (
            <motion.div
              key={c.slug}
              initial={false}
              animate={{ x: `${x}%`, scale, opacity }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                zIndex: z,
                pointerEvents: isActive ? "auto" : "none",
                filter: isActive ? undefined : `blur(${absOffset * 2}px)`,
              }}
              className="absolute inset-x-0 top-0 mx-auto h-full w-[min(90%,640px)]"
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} из ${total}: ${c.title}`}
            >
              <div className="h-full">
                {isActive ? (
                  <CaseCard data={c} />
                ) : (
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="pointer-events-auto block w-full text-left"
                    aria-label={`Перейти к кейсу: ${c.title}`}
                    tabIndex={-1}
                  >
                    <CaseCard data={c} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prev / Next controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Предыдущий кейс"
          className="bg-bg-elevated/80 ring-border hover:bg-bg-overlay text-text-primary inline-flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1.5" role="tablist">
          {cases.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Кейс ${i + 1}: ${c.title}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "bg-brand-violet w-8"
                  : "bg-border w-1.5 hover:bg-text-muted",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Следующий кейс"
          className="bg-bg-elevated/80 ring-border hover:bg-bg-overlay text-text-primary inline-flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors"
        >
          <ArrowRight className="size-4" />
        </button>

        <Link
          href="/portfolio"
          className="text-text-muted hover:text-text-primary ml-3 hidden text-sm transition-colors md:inline-flex"
        >
          Все кейсы →
        </Link>
      </div>
    </div>
  );
}
