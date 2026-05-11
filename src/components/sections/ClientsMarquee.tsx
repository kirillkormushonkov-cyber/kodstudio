import * as React from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type MarkProps = { className?: string };

const MARKS: ReadonlyArray<React.ComponentType<MarkProps>> = [
  // 0 — circle ring with inner dot, breathing animation
  ({ className }: MarkProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        className="animate-breathe-ring"
      />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="currentColor"
        className="animate-breathe-dot"
      />
    </svg>
  ),
  // 1 — 4-dot cluster
  ({ className }: MarkProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
    </svg>
  ),
  // 2 — triangle
  ({ className }: MarkProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3 L21 20 L3 20 Z" />
    </svg>
  ),
  // 3 — rotated square
  ({ className }: MarkProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
    </svg>
  ),
  // 4 — hexagon ring
  ({ className }: MarkProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
    </svg>
  ),
  // 5 — wave / arc
  ({ className }: MarkProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 16 Q 8 7, 12 12 T 21 8" />
    </svg>
  ),
];

const CLIENTS: ReadonlyArray<{
  name: string;
  mark: number;
  color: string;
}> = [
  { name: "Acme", mark: 0, color: "text-brand-violet" },
  { name: "Nimbus", mark: 1, color: "text-brand-purple" },
  { name: "Vortex", mark: 2, color: "text-brand-pink" },
  { name: "Lumen", mark: 3, color: "text-brand-magenta" },
  { name: "Halo", mark: 4, color: "text-brand-violet" },
  { name: "Pulse", mark: 5, color: "text-brand-purple" },
  { name: "Quanta", mark: 0, color: "text-brand-pink" },
  { name: "Strata", mark: 1, color: "text-brand-magenta" },
  { name: "Noir", mark: 2, color: "text-brand-violet" },
  { name: "Aero", mark: 3, color: "text-brand-purple" },
  { name: "Kindred", mark: 4, color: "text-brand-pink" },
  { name: "Ecliptic", mark: 5, color: "text-brand-magenta" },
];

export function ClientsMarquee() {
  // Duplicate the list so translateX(-50%) loops seamlessly.
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-16 md:py-20" aria-labelledby="clients-eyebrow">
      <Container>
        <p
          id="clients-eyebrow"
          className="text-text-muted text-center text-xs font-semibold tracking-[0.22em] uppercase"
        >
          Нам доверяют
        </p>

        <div
          className={cn(
            "group/marquee relative mt-10 overflow-hidden",
            "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
          )}
        >
          <div className="flex w-max animate-marquee gap-14 group-hover/marquee:[animation-play-state:paused]">
            {items.map((c, i) => {
              const Mark = MARKS[c.mark];
              return (
                <div
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= CLIENTS.length || undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0",
                    c.color,
                  )}
                >
                  <Mark className="size-7" />
                  <span className="font-heading text-text-primary text-lg font-semibold tracking-tight">
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
