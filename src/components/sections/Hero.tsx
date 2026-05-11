"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WordsReveal } from "@/components/system/WordsReveal";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "120+", label: "проектов" },
  { value: "5", label: "лет опыта" },
  { value: "12+", label: "стеков" },
  { value: "24/7", label: "поддержка" },
] as const;

// NOTE: no opacity:0 in `hidden` — keeps content visible on SSR if hydration
// is slow or fails. Animation still works (slide-in via y offset).
const fadeUp: Variants = {
  hidden: { y: 24 },
  show: { y: 0 },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Blobs */}
      <div
        aria-hidden="true"
        className="bg-brand-violet animate-float pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full opacity-30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-brand-pink animate-float pointer-events-none absolute -right-40 -bottom-40 size-[520px] rounded-full opacity-30 blur-[120px] [animation-delay:-3s]"
      />

      {/* Noise */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 py-24 text-center">
          {/* Status badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              tone="neutral"
              icon={
                <span className="relative inline-flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
              }
            >
              Открыты для новых проектов
            </Badge>
          </motion.div>

          {/* H1 — words reveal one-by-one on mount (≈60ms stagger). */}
          <h1
            className="font-heading text-text-primary font-semibold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
          >
            <span className="block">
              <WordsReveal
                text="Создаём цифровые"
                startDelay={0.2}
                fromX={-420}
                fromY={0}
              />
            </span>
            <span className="block">
              <WordsReveal
                text="продукты, которые"
                startDelay={0.55}
                fromX={420}
                fromY={0}
              />
            </span>
            <span className="block">
              {/* Gradient теперь на каждом слове, не на родителе — иначе
                  inline-block motion-span теряет bg-clip-text. */}
              <WordsReveal
                text="работают на бизнес"
                startDelay={0.9}
                fromX={-420}
                fromY={0}
                wordClassName="bg-gradient-brand bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
              />
              <span className="text-brand-magenta">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-text-secondary max-w-2xl text-[18px] leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            От стратегии и дизайна до запуска и поддержки. Команда инженеров
            и дизайнеров, которая собирает цифровые продукты под ключ — быстро
            и ответственно.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                )}
              >
                Обсудить проект
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </a>
            </MagneticButton>
            <a
              href="#cases"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Посмотреть кейсы
            </a>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center gap-1"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
              >
                <span className="font-heading text-text-primary text-3xl font-bold tracking-tight md:text-4xl">
                  {s.value}
                </span>
                <span className="text-text-muted text-xs tracking-[0.18em] uppercase">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
