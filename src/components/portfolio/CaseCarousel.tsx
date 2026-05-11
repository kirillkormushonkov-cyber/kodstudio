"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
const X_STEP_PERCENT = 78;
const Z_STEP_PX = 180;
const ROT_STEP_DEG = 45;
const SCALE_STEP = 0.08;
const ACTIVE_OPACITY = 1;
const NEIGHBOR_OPACITY = 0.5;
const FAR_OPACITY = 0.18;

// Pan threshold: смещение или скорость свайпа, после которых считаем
// переключение состоявшимся. На каждый жест — ровно один шаг.
const PAN_OFFSET_THRESHOLD = 60;
const PAN_VELOCITY_THRESHOLD = 350;
// Hover-триггер: после задержки наведение на соседнюю карточку
// центрирует её. Задержка не даёт скакать при быстром пролёте курсора.
const HOVER_DELAY_MS = 220;

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

  // Hover-таймер: при наведении на боковую карточку — переключение
  // после короткой паузы.
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHoverTimer = React.useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);
  React.useEffect(() => () => clearHoverTimer(), [clearHoverTimer]);

  // Pan gesture — detect swipe без визуального drag (чтобы клик по
  // активной карточке не ломался). Ровно на один соседний блок.
  const triggeredRef = React.useRef(false);
  const onPanStart = () => {
    triggeredRef.current = false;
  };
  const onPanEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (triggeredRef.current) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const isSwipe =
      Math.abs(offset) > PAN_OFFSET_THRESHOLD ||
      Math.abs(velocity) > PAN_VELOCITY_THRESHOLD;
    if (!isSwipe) return;
    triggeredRef.current = true;
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
      <motion.div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Кейсы"
        tabIndex={0}
        data-lenis-prevent
        onPanStart={onPanStart}
        onPanEnd={onPanEnd}
        style={{
          perspective: "1100px",
          touchAction: "pan-y",
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto h-[460px] w-full overflow-hidden focus:outline-none md:h-[540px] lg:h-[580px]"
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
                  filter: isActive ? "blur(0px)" : `blur(${absOffset * 2}px)`,
                }}
                whileHover={
                  isActive || reduce
                    ? undefined
                    : {
                        scale: scale * 1.04,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
                }
                style={{
                  zIndex,
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
                      onPointerEnter={() => {
                        clearHoverTimer();
                        hoverTimerRef.current = setTimeout(
                          () => goTo(i),
                          HOVER_DELAY_MS,
                        );
                      }}
                      onPointerLeave={clearHoverTimer}
                      className="block w-full cursor-pointer text-left"
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

        {/* Mobile swipe affordance — мягко пульсирующие стрелки по бокам */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden="true"
              className="bg-bg-base/40 text-text-primary pointer-events-none absolute top-1/2 left-2 z-40 -translate-y-1/2 rounded-full p-1.5 backdrop-blur md:hidden"
              initial={{ opacity: 0.5 }}
              animate={{ x: [0, -4, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronLeft className="size-4" />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="bg-bg-base/40 text-text-primary pointer-events-none absolute top-1/2 right-2 z-40 -translate-y-1/2 rounded-full p-1.5 backdrop-blur md:hidden"
              initial={{ opacity: 0.5 }}
              animate={{ x: [0, 4, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="size-4" />
            </motion.div>
          </>
        )}
      </motion.div>

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
