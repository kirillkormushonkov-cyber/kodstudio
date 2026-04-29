"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = { n: number; title: string; desc: string };

const STEPS: Step[] = [
  { n: 1, title: "Бриф", desc: "Узнаём задачу, цели и аудиторию." },
  { n: 2, title: "Дизайн", desc: "UX-ресёрч и UI-макеты." },
  { n: 3, title: "Разработка", desc: "Frontend, backend и интеграции." },
  { n: 4, title: "Тесты", desc: "QA, юзабилити и метрики качества." },
  { n: 5, title: "Запуск", desc: "Деплой, аналитика и поддержка." },
];

const circleClass =
  "size-14 rounded-full bg-gradient-brand text-white font-heading font-semibold flex items-center justify-center text-lg shadow-brand z-10 shrink-0";

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section id="process" ref={ref} className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Процесс"
          title="Как мы работаем"
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Desktop — horizontal stepper */}
        <div className="hidden md:block">
          <div className="relative grid grid-cols-5 gap-4">
            {/* Background line — between first and last circle centers */}
            <div
              aria-hidden="true"
              className="bg-border absolute top-7 left-[10%] right-[10%] h-0.5 -translate-y-1/2"
            />
            {/* Foreground gradient — scaled X by scroll progress */}
            <div
              aria-hidden="true"
              className="absolute top-7 left-[10%] right-[10%] -translate-y-1/2"
            >
              <motion.div
                className="bg-gradient-brand h-0.5 origin-left"
                style={{ scaleX: progress }}
              />
            </div>

            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="relative flex flex-col items-center px-2 text-center"
              >
                <div className={circleClass}>{s.n}</div>
                <h4 className="font-heading text-text-primary mt-5 text-base font-semibold tracking-tight md:text-lg">
                  {s.title}
                </h4>
                <p className="text-text-muted mt-1.5 max-w-[18ch] text-sm">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Background line — left of circle centers (left-7 = 28px) */}
            <div
              aria-hidden="true"
              className="bg-border absolute top-7 bottom-7 left-7 w-0.5 -translate-x-1/2"
            />
            <div
              aria-hidden="true"
              className="absolute top-7 bottom-7 left-7 -translate-x-1/2"
            >
              <motion.div
                className="bg-gradient-brand h-full w-0.5 origin-top"
                style={{ scaleY: progress }}
              />
            </div>

            <ol className="space-y-8">
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                  className="relative flex items-start gap-5"
                >
                  <div className={circleClass}>{s.n}</div>
                  <div className="pt-2">
                    <h4 className="font-heading text-text-primary text-base font-semibold tracking-tight">
                      {s.title}
                    </h4>
                    <p className="text-text-muted mt-1 text-sm">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
