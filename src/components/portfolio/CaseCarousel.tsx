"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
// Mobile: push neighbors fully off-screen so their text/tags don't
// collide with the active slide. No peek on narrow viewports.
const X_STEP_PERCENT_NARROW = 135;
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

  // Detect real-cursor devices so that hover-to-center doesn't fight
  // against touch swipes on mobile (synthetic pointerenter after tap
  // would otherwise queue a goTo while the user is still swiping).
  const [hoverCapable, setHoverCapable] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // On narrow viewports neighbors must be pushed off-screen — peek
  // causes their text block to overlap the active slide.
  const [isNarrow, setIsNarrow] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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

  // Hover tracking: while the mouse moves over the carousel, repeatedly
  // pull the card under the cursor into the center after a short debounce.
  // Эффект — "карусель догоняет курсор": мышь стоит на месте, а активный
  // блок постоянно подтягивается под него, пока курсор не окажется над
  // самим центром.
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingIndexRef = React.useRef<number | null>(null);
  const clearHoverTimer = React.useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    pendingIndexRef.current = null;
  }, []);
  React.useEffect(() => () => clearHoverTimer(), [clearHoverTimer]);

  const onPointerMoveCarousel = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hoverCapable || e.pointerType !== "mouse") return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>("[data-card-index]");
      if (!card) return;
      const idx = Number(card.dataset.cardIndex);
      if (Number.isNaN(idx)) return;
      if (idx === active) {
        clearHoverTimer();
        return;
      }
      if (pendingIndexRef.current === idx) return;
      clearHoverTimer();
      pendingIndexRef.current = idx;
      hoverTimerRef.current = setTimeout(() => {
        goTo(idx);
        pendingIndexRef.current = null;
        hoverTimerRef.current = null;
      }, HOVER_DELAY_MS);
    },
    [hoverCapable, active, clearHoverTimer, goTo],
  );

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
        onPointerMove={onPointerMoveCarousel}
        onPointerLeave={clearHoverTimer}
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
            const x = offset * (isNarrow ? X_STEP_PERCENT_NARROW : X_STEP_PERCENT);
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
                whileHover={
                  isActive || reduce
                    ? undefined
                    : {
                        scale: scale * 1.04,
                        opacity: 1,
                      }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
                }
                style={{
                  zIndex,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
                className="absolute inset-x-0 top-0 mx-auto h-full w-[min(86%,600px)]"
                data-card-index={i}
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

      </motion.div>

      {/* Side controls — absolute `top` values are pinned to the middle of
          the cover image, computed per breakpoint:
          mobile cover ≈ 192/460 of carousel height → center ≈ 21%,
          md cover ≈ 375/540 → center ≈ 35%,
          lg cover ≈ 375/580 → center ≈ 32%.
          Using `top` (not inset-y + my-auto + aspect-ratio) so the
          position is unambiguous and not Tailwind-arbitrary-class-fragile. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий кейс"
        className="bg-bg-elevated/70 ring-border hover:bg-bg-overlay text-text-primary absolute top-[21%] left-2 z-40 inline-flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors md:top-[35%] md:left-4 md:size-11 lg:top-[32%]"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующий кейс"
        className="bg-bg-elevated/70 ring-border hover:bg-bg-overlay text-text-primary absolute top-[21%] right-2 z-40 inline-flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors md:top-[35%] md:right-4 md:size-11 lg:top-[32%]"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots + «Все кейсы» */}
      <div className="mt-6 flex items-center justify-center gap-3">
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
