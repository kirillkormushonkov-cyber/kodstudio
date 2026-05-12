"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "проектов" },
  { value: 5, label: "лет на рынке" },
  { value: 47, label: "клиентов" },
  { value: 98, suffix: "%", label: "повторных" },
];

function useCounter(target: number, duration: number, start: boolean) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    if (duration <= 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

function StatItem({ value, suffix, label }: Stat) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const display = useCounter(value, reduce ? 0 : 1500, inView);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 py-6 md:px-4 md:py-2"
    >
      <GradientText
        className="font-heading block font-semibold leading-none"
        style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
      >
        {display}
        {suffix ?? ""}
      </GradientText>
      <span className="text-text-muted text-sm uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
