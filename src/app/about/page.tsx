import * as React from "react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import { WordsReveal } from "@/components/system/WordsReveal";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "KodStudio — команда инженеров и дизайнеров, которая собирает цифровые продукты под ключ с 2021 года.",
};

const VALUES = [
  {
    title: "Инженерная зрелость",
    description:
      "Не делаем «на коленке». Каждый проект — это TS, тесты, CI и документация с первого дня.",
  },
  {
    title: "Прозрачность",
    description:
      "Доступ к репозиторию и системам с самого начала. Еженедельные демо, открытый бэклог.",
  },
  {
    title: "Продуктовое мышление",
    description:
      "Не отгружаем макеты «по ТЗ» — задаём вопросы про метрики, аудиторию и цели бизнеса.",
  },
  {
    title: "Ответственность",
    description:
      "Если что-то сломалось — фиксим. Не прячемся за SLA, а решаем проблему.",
  },
];

const TEAM = [
  {
    name: "Кирилл",
    role: "Founder · Engineering Lead",
    description: "10+ лет в продуктах. Строит инженерные процессы и команду.",
    color: "from-brand-violet to-brand-purple",
  },
  {
    name: "Мария",
    role: "Design Lead",
    description: "Бренды, дизайн-системы, UX-исследования.",
    color: "from-brand-pink to-brand-magenta",
  },
  {
    name: "Денис",
    role: "Senior Engineer",
    description: "Backend, инфраструктура, перформанс. Любит ClickHouse.",
    color: "from-brand-purple to-brand-violet",
  },
  {
    name: "Анна",
    role: "Project Manager",
    description: "Держит сроки и коммуникацию с клиентом. Без неё хаос.",
    color: "from-brand-magenta to-brand-pink",
  },
  {
    name: "Игорь",
    role: "Mobile Engineer",
    description: "iOS, Android, React Native. Запускает приложения в сторы.",
    color: "from-brand-violet to-brand-pink",
  },
  {
    name: "Светлана",
    role: "QA Lead",
    description: "Делает так, чтобы вы не нашли багов — мы нашли их раньше.",
    color: "from-brand-purple to-brand-magenta",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Старт KodStudio",
    description: "Двое разработчиков и один дизайнер. Первые проекты — лендинги.",
  },
  {
    year: "2022",
    title: "Первый SaaS",
    description: "Команда выросла до 6 человек. Запустили первый продукт под ключ.",
  },
  {
    year: "2024",
    title: "Mobile-направление",
    description: "Добавили нативную и кросс-платформенную мобильную разработку.",
  },
  {
    year: "2026",
    title: "120+ проектов",
    description: "Команда из 12 человек. Работаем с клиентами по всей России и СНГ.",
  },
];

export default function AboutPage() {
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
              О студии
            </p>
            <h1
              className="font-heading mt-4 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
            >
              <WordsReveal
                text="Команда, которая делает продукты"
                startDelay={0.15}
                fromX={-420}
                fromY={0}
                wordClassName="bg-gradient-brand bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
              />
            </h1>
            <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base md:text-lg">
              KodStudio — это 12 инженеров и дизайнеров, которые собрали
              120+ продуктов с 2021 года. Работаем с продуктовым подходом
              и инженерной дисциплиной.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <ScrollReveal>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Принципы"
            title="Что для нас важно"
            align="center"
            className="mb-12 md:mb-16"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="border-brand-violet/15 bg-bg-elevated/60 rounded-2xl border p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow"
              >
                <h3 className="font-heading text-text-primary text-lg font-semibold tracking-tight md:text-xl">
                  {v.title}
                </h3>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed md:text-base">
                  {v.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      </ScrollReveal>

      {/* Team */}
      <ScrollReveal>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Команда"
            title="Кто будет работать с вами"
            align="center"
            className="mb-12 md:mb-16"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <article
                key={m.name}
                className="border-brand-violet/15 bg-bg-elevated/60 rounded-2xl border p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow"
              >
                <div
                  className={`bg-gradient-to-br ${m.color} font-heading shadow-brand grid size-14 place-items-center rounded-2xl text-xl font-bold text-white`}
                  aria-hidden="true"
                >
                  {m.name[0]}
                </div>
                <h3 className="font-heading text-text-primary mt-5 text-lg font-semibold tracking-tight">
                  {m.name}
                </h3>
                <p className="text-brand-violet text-xs font-semibold tracking-wider uppercase">
                  {m.role}
                </p>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                  {m.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      </ScrollReveal>

      {/* Timeline / story */}
      <ScrollReveal>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="История"
            title="Как мы росли"
            align="center"
            className="mb-12 md:mb-16"
          />
          <ol className="mx-auto max-w-3xl space-y-6">
            {TIMELINE.map((step) => (
              <li
                key={step.year}
                className="border-brand-violet/15 bg-bg-elevated/40 flex gap-5 rounded-2xl border p-6 backdrop-blur"
              >
                <p className="font-heading text-brand-violet w-16 shrink-0 text-2xl font-bold">
                  {step.year}
                </p>
                <div>
                  <h3 className="font-heading text-text-primary text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
  );
}
