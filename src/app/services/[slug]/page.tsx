import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import {
  getAllServiceSlugs,
  getService,
  type Service,
  type ServiceTariff,
} from "@/lib/services";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="flex-1">
      <ServiceHero service={service} />
      <ScrollReveal>
        <ServiceFeatures service={service} />
      </ScrollReveal>
      <ScrollReveal>
        <ServiceTechRow service={service} />
      </ScrollReveal>
      <ScrollReveal>
        <ServiceProcessAccordion service={service} />
      </ScrollReveal>
      <ScrollReveal>
        <ServicePricing service={service} />
      </ScrollReveal>
      <ScrollReveal>
        <ServiceFaq service={service} />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────

function ServiceHero({ service }: { service: Service }) {
  return (
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
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge tone="violet">{service.category}</Badge>

          <h1
            className="font-heading text-text-primary mt-6 font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            <GradientText className="animate-gradient bg-[length:200%_200%]">
              {service.title}
            </GradientText>
          </h1>

          <p className="text-text-secondary mt-5 max-w-2xl text-base md:text-lg">
            {service.description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Обсудить проект
              <ArrowRight />
            </a>
            <a
              href="#pricing"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Посмотреть тарифы
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Features (bento)
// ─────────────────────────────────────────────────────────────────

function ServiceFeatures({ service }: { service: Service }) {
  return (
    <section id="features" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Что входит"
          title="Полный цикл работ"
          align="center"
          className="mb-12 md:mb-16"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((f) => (
            <article
              key={f.title}
              className="group border-brand-violet/15 bg-bg-elevated/60 rounded-2xl border p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow"
            >
              <div className="bg-gradient-brand shadow-brand grid size-12 place-items-center rounded-xl">
                <f.icon className="size-5 text-white" />
              </div>
              <h3 className="font-heading text-text-primary mt-5 text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Tech row
// ─────────────────────────────────────────────────────────────────

function ServiceTechRow({ service }: { service: Service }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Стек"
          title="Технологии"
          align="center"
          className="mb-10 md:mb-12"
        />
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {service.tech.map((t) => (
            <div
              key={t.name}
              className="border-border bg-bg-elevated/50 hover:border-brand-violet/40 flex items-center gap-2.5 rounded-full border px-3.5 py-2 backdrop-blur transition-colors"
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-md bg-gradient-to-br shadow-sm",
                  t.color,
                )}
                aria-hidden="true"
              >
                <span className="font-heading text-[11px] leading-none font-bold text-white">
                  {t.abbr}
                </span>
              </span>
              <span className="text-text-primary text-sm font-medium">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Process (accordion)
// ─────────────────────────────────────────────────────────────────

function ServiceProcessAccordion({ service }: { service: Service }) {
  return (
    <section id="process" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Процесс"
          title="Как мы работаем"
          align="center"
          className="mb-10 md:mb-12"
        />

        <Accordion className="border-border/80 mx-auto w-full max-w-3xl rounded-2xl border bg-bg-elevated/40 px-6 backdrop-blur md:px-8">
          {service.process.map((s, i) => (
            <AccordionItem key={s.step} value={`step-${i}`}>
              <AccordionTrigger className="py-5 text-base md:text-lg">
                <span className="flex items-baseline gap-4">
                  <span className="font-heading text-brand-violet font-mono text-xs tracking-wider">
                    {s.step}
                  </span>
                  <span>{s.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary text-sm md:text-base leading-relaxed">
                {s.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────────────────────────

function PricingCard({ tariff }: { tariff: ServiceTariff }) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
        tariff.popular
          ? "border-brand-violet/60 bg-bg-elevated"
          : "border-brand-violet/15 bg-bg-elevated/60",
      )}
    >
      {tariff.popular && (
        <span className="bg-gradient-brand shadow-brand absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium text-white">
          Популярный
        </span>
      )}
      <h3 className="font-heading text-text-primary text-xl font-bold tracking-tight">
        {tariff.name}
      </h3>
      <p className="text-text-secondary mt-1 text-sm leading-relaxed">
        {tariff.description}
      </p>

      <p className="font-heading mt-6 text-3xl font-bold tracking-tight md:text-4xl">
        {tariff.popular ? (
          <GradientText>{tariff.price}</GradientText>
        ) : (
          <span className="text-text-primary">{tariff.price}</span>
        )}
      </p>

      <ul className="mt-6 space-y-3">
        {tariff.features.map((f) => (
          <li
            key={f}
            className="text-text-secondary flex items-start gap-2.5 text-sm"
          >
            <Check className="text-brand-magenta mt-0.5 size-4 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={cn(
          buttonVariants({
            variant: tariff.popular ? "primary" : "ghost",
            size: "md",
          }),
          "mt-8 w-full",
        )}
      >
        {tariff.cta}
      </a>
    </article>
  );
}

function ServicePricing({ service }: { service: Service }) {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Цены"
          title="Тарифы"
          align="center"
          className="mb-12 md:mb-16"
        />
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {service.tariffs.map((t) => (
            <PricingCard key={t.name} tariff={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────

function ServiceFaq({ service }: { service: Service }) {
  return (
    <section id="faq" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          align="center"
          className="mb-10 md:mb-12"
        />
        <Accordion className="border-border/80 mx-auto w-full max-w-3xl rounded-2xl border bg-bg-elevated/40 px-6 backdrop-blur md:px-8">
          {service.faq.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="py-5 text-base md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary text-sm md:text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
