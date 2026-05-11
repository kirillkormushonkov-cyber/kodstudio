"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='tab'], input, textarea, select, label, [data-cursor-hover]";

export function CustomCursor() {
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    setActive(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest(INTERACTIVE_SELECTOR)) setHovering(false);
    };

    let raf = 0;
    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          "border-brand-violet/70 pointer-events-none fixed top-0 left-0 z-[100] hidden size-9 rounded-full border-2 transition-[width,height,border-color] duration-200 lg:block",
          hovering && "border-brand-violet size-12",
        )}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="bg-brand-violet pointer-events-none fixed top-0 left-0 z-[100] hidden size-1.5 rounded-full lg:block"
      />
    </>
  );
}
