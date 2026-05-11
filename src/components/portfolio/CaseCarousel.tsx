"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CaseCard } from "@/components/portfolio/CaseCard";
import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function shortestOffset(index: number, active: number, total: number): number {
  if (total <= 0) return 0;
  const direct = index - active;
  const half = total / 2;
  if (direct > half) return direct - total;
  if (direct < -half) return direct + total;
  return direct;
}

// Карусель «обнимает невидимый шар»: каждая карточка получает translateZ
// (глубина) + rotateY (поворот в сторону центра) + translateX (разнос).
const VISIBLE_NEIGHBORS = 2;
const X_STEP_PERCENT = 80;
const Z_STEP_PX = 200;
const ROT_STEP_DEG = 40;
const SCALE_STEP = 0.08;
const ACTIVE_OPACITY = 1;
const NEIGHBOR_OPACITY = 0.5;
const FAR_OPACITY = 0.18;

// Drag threshold: смещение или скорость свайпа, после которых считаем
// переключение состоявшимся. На каждый жест — ровно один шаг.
const DRAG_OFFSET_THRESHOLD = 80;
const DRAG_VELOCITY_THRESHOLD = 400;

export function CaseCarousel({ cases }: { cases: PortfolioCase[] }) {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const total = cases.length;
  const reduce = useReducedMotion();

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

  // Keyboard arrows
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

  // Drag / swipe — ровно на один соседний блок.
  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const isSwipe =
      Math.abs(offset) > DRAG_OFFSET_THRESHOLD ||
      Math.abs(velocity) > DRAG_VELOCITY_THRESHOLD;
    if (!isSwipe) return;
    if (offset < 0 || velocity < 0) next();
    else prev();
  };

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
        data-lenis-prevent
        style={{ perspective: "1600px" }}
        className="relative mx-auto h-[460px] w-full overflow-hidden focus:outline-none md:h-[540px] lg:h-[580px]"
      >
        <motion.div
          drag="x"
          dragElastic={0.12}
          dragMomentum={false}
          dragSnapToOrigin
          onDragEnd={onDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            touchAction: "pan-y",
            transformStyle: "preserve-3d",
          }}
        >
          {cases.map((c, i) => {
            const offset = shortestOffset(i, active, total);
            const absOffset = Math.abs(offset);
            if (absOffset > VISIBLE_NEIGHBORS) return null;

            const isActive = offset === 0;
            const x = offset * X_STEP_PERCENT;
            const z = -absOffset * Z_STEP_PX;
            const rotY = -offset * ROT_STEP_DEG;
            const scale = 1 - absOffset * SCALE_STEP;
            const opacity = isActive
              ? ACTIVE_OPACITY
              : absOffset === 1
                ? NEIGHBOR_OPACITY
                : FAR_OPACITY;
            const zIndex = Math.max(1, 30 - absOffset * 10);

            return (
              <motion.div
                key={c.slug}
                initial={false}
                animate={{
                  x: `${x}%`,
                  z,
                  rotateY: rotY,
                  scale,
                  opacity,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
                }
                style={{
                  zIndex,
                  pointerEvents: isActive ? "auto" : "none",
                  filter: isActive ? undefined : `blur(${absOffset * 2}px)`,
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
                className="absolute inset-x-0 top-0 mx-auto h-full w-[min(86%,600px)]"
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
        </motion.div>
      </div>

      {/* Prev / Next + dots */}
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
