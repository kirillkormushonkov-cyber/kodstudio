import * as React from "react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import { WordsReveal } from "@/components/system/WordsReveal";

export const metadata: Metadata = {
  title: "История студии",
  description:
    "Как KodStudio прошла путь от двух разработчиков до команды из 12 человек и 120+ проектов.",
};

const MILESTONES = [
  {
    year: "2021",
    quarter: "Начало",
    title: "Старт KodStudio",
    description:
      "Двое разработчиков и один дизайнер из Нижнего Новгорода решили делать продукты серьёзно. Первые проекты — лендинги и небольшие веб-приложения. Уже тогда заложили правило: TypeScript, CI и документация с первого дня.",
    stats: [
      { label: "Человек в команде", value: "3" },
      { label: "Первых проектов", value: "11" },
    ],
    accent: "from-brand-violet to-brand-purple",
  },
  {
    year: "2022",
    quarter: "Рост",
    title: "Первый SaaS и расширение команды",
    description:
      "Взяли первый полноценный SaaS-проект — разработали продукт под ключ с нуля до продакшена. Команда выросла до 6 человек: добавили бэкенд-инженера, проджект-менеджера и QA-специалиста. Начали работать с клиентами из Москвы и Санкт-Петербурга.",
    stats: [
      { label: "Человек в команде", value: "6" },
      { label: "Проектов за год", value: "24" },
    ],
    accent: "from-brand-purple to-brand-pink",
  },
  {
    year: "2023",
    quarter: "Зрелость",
    title: "Дизайн-системы и продуктовый процесс",
    description:
      "Перестали делать только «разработку по ТЗ» — начали работать на уровне продуктовых метрик и бизнес-целей. Выстроили внутренний процесс с недельными демо, открытым бэклогом и дизайн-системами для каждого проекта.",
    stats: [
      { label: "NPS клиентов", value: "87" },
      { label: "Повторных клиентов", value: "68%" },
    ],
    accent: "from-brand-pink to-brand-magenta",
  },
  {
    year: "2024",
    quarter: "Новое направление",
    title: "Мобильная разработка",
    description:
      "Запустили mobile-направление: iOS, Android и React Native. Первые мобильные приложения ушли в AppStore и Google Play. Команда выросла до 9 человек.",
    stats: [
      { label: "Человек в команде", value: "9" },
      { label: "Мобильных приложений", value: "8" },
    ],
    accent: "from-brand-magenta to-brand-violet",
  },
  {
    year: "2025",
    quarter: "Масштаб",
    title: "100 проектов и СНГ",
    description:
      "Перевалили за 100 реализованных проектов. Начали работать с клиентами из Казахстана, Беларуси и Армении. Открыли направление технического консалтинга — помогаем командам выстраивать инженерные процессы.",
    stats: [
      { label: "Стран присутствия", value: "4" },
      { label: "Проектов", value: "100+" },
    ],
    accent: "from-brand-violet to-brand-pink",
  },
  {
    year: "2026",
    quarter: "Сегодня",
    title: "12 человек, 120+ проектов",
    description:
      "Сегодня KodStudio — это 12 инженеров и дизайнеров, которые работают с продуктовым подходом и инженерной дисциплиной. Берём проекты, которые хотим сделать хорошо — и делаем.",
    stats: [
      { label: "Человек в команде", value: "12" },
      { label: "Проектов", value: "120+" },
    ],
    accent: "from-brand-purple to-brand-violet",
  },
];

export default function CareerPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="bg-brand-violet pointer-events-none absolute -top-32 -left-24 size-[480px] rounded-full opacity-25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="bg-brand-pink pointer-events-none absolute -right-24 top-32 size-[420px] rounded-full opacity-25 blur-[120px]"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-brand-violet text-xs font-semibold tracking-[0.22em] uppercase">
              История студии
            </p>
            <h1
              className="font-heading mt-4 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
            >
              <WordsReveal
                text="Как мы к этому пришли"
                startDelay={0.15}
                fromX={-420}
                fromY={0}
                wordClassName="bg-gradient-brand bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
              />
            </h1>
            <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base md:text-lg">
              С 2021 года — от трёх человек и первых лендингов до команды из 12
              и 120+ продуктов по всей России и СНГ.
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <ScrollReveal>
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeading
              eyebrow="Путь"
              title="По годам"
              align="center"
              className="mb-16 md:mb-20"
            />
            <div className="relative mx-auto max-w-4xl">
              {/* vertical line */}
              <div
                aria-hidden="true"
                className="from-brand-violet/40 via-brand-pink/40 absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b to-transparent md:block"
              />
              <ol className="space-y-10">
                {MILESTONES.map((m) => (
                  <li
                    key={m.year}
                    className="relative flex gap-8 md:gap-12"
                  >
                    {/* dot */}
                    <div
                      className={`relative z-10 hidden size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${m.accent} shadow-brand md:flex`}
                      aria-hidden="true"
                    >
                      <span className="font-heading text-xs font-bold text-white">
                        {m.year.slice(2)}
                      </span>
                    </div>

                    {/* card */}
                    <article className="border-brand-violet/15 bg-bg-elevated/60 flex-1 rounded-2xl border p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className={`bg-gradient-to-r ${m.accent} font-heading rounded-lg px-3 py-1 text-xs font-bold text-white`}
                        >
                          {m.year}
                        </span>
                        <span className="text-text-tertiary text-xs font-medium uppercase tracking-widest">
                          {m.quarter}
                        </span>
                      </div>

                      <h3 className="font-heading text-text-primary text-xl font-semibold tracking-tight md:text-2xl">
                        {m.title}
                      </h3>
                      <p className="text-text-secondary mt-3 text-sm leading-relaxed md:text-base">
                        {m.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-6">
                        {m.stats.map((s) => (
                          <div key={s.label}>
                            <p
                              className={`font-heading bg-gradient-to-r ${m.accent} bg-clip-text text-2xl font-bold text-transparent md:text-3xl`}
                            >
                              {s.value}
                            </p>
                            <p className="text-text-tertiary mt-0.5 text-xs">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
  );
}
