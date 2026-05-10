import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseCard } from "@/components/portfolio/CaseCard";
import { CaseGallery } from "@/components/portfolio/CaseGallery";
import { CTASection } from "@/components/sections/CTASection";
import {
  getAllCases,
  getCaseBySlug,
  getOtherCases,
  type PortfolioCase,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.task,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const others = getOtherCases(slug, 3);

  return (
    <main className="flex-1">
      <CaseHero data={item} />
      <CaseContext data={item} />
      {item.gallery.length > 0 && <CaseGallerySection data={item} />}
      {item.metrics.length > 0 && <CaseMetrics data={item} />}
      {item.stack.length > 0 && <CaseStack data={item} />}
      {others.length > 0 && <OtherCases items={others} />}
      <CTASection />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────

function CaseHero({ data }: { data: PortfolioCase }) {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24">
      <Container>
        <Link
          href="/portfolio"
          className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" />
          Все кейсы
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
          <Badge tone="violet">{data.category}</Badge>
          <span className="text-text-muted">{data.client}</span>
          <span className="text-text-muted opacity-50">·</span>
          <span className="text-text-muted">{data.year}</span>
        </div>

        <h1
          className="font-heading text-text-primary mt-5 font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
        >
          {data.title}
        </h1>

        <div
          className={cn(
            "border-brand-violet/15 relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl border shadow-glow",
          )}
        >
          {data.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={data.cover}
              alt={`Превью сайта ${data.client}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                className={cn("absolute inset-0 bg-gradient-to-br", data.hero)}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-overlay opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.35), transparent 55%)",
                }}
              />
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
              >
                <filter id={`hero-noise-${data.slug}`}>
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.85"
                    numOctaves="2"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter={`url(#hero-noise-${data.slug})`}
                />
              </svg>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Context — Task / Solution / Result
// ─────────────────────────────────────────────────────────────────

function ContextColumn({
  label,
  body,
  index,
}: {
  label: string;
  body: string;
  index: number;
}) {
  return (
    <div>
      <p className="text-brand-violet font-mono text-xs tracking-wider">
        0{index}
      </p>
      <h3 className="font-heading text-text-primary mt-3 text-lg font-semibold tracking-tight">
        {label}
      </h3>
      <p className="text-text-secondary mt-3 text-sm leading-relaxed md:text-base">
        {body}
      </p>
    </div>
  );
}

function CaseContext({ data }: { data: PortfolioCase }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <ContextColumn label="Задача" body={data.task} index={1} />
          <ContextColumn label="Решение" body={data.solution} index={2} />
          <ContextColumn label="Результат" body={data.result} index={3} />
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Gallery
// ─────────────────────────────────────────────────────────────────

function CaseGallerySection({ data }: { data: PortfolioCase }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Галерея"
          title="Скриншоты проекта"
          className="mb-10 md:mb-12"
        />
        <CaseGallery items={data.gallery} />
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Metrics
// ─────────────────────────────────────────────────────────────────

function CaseMetrics({ data }: { data: PortfolioCase }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Результаты"
          title="Метрики после релиза"
          className="mb-10 md:mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((m, i) => (
            <article
              key={i}
              className="border-brand-violet/15 bg-bg-elevated/60 rounded-2xl border p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow"
            >
              <p className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                <GradientText>{m.value}</GradientText>
              </p>
              <p className="text-text-muted mt-2 text-xs uppercase tracking-wider">
                {m.label}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Tech stack
// ─────────────────────────────────────────────────────────────────

function CaseStack({ data }: { data: PortfolioCase }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Стек"
          title="С чем работали"
          className="mb-8 md:mb-10"
        />
        <div className="flex flex-wrap gap-2">
          {data.stack.map((tag) => (
            <span
              key={tag}
              className="border-border bg-bg-elevated/40 text-text-primary inline-flex items-center rounded-full border px-4 py-1.5 text-sm backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Other cases
// ─────────────────────────────────────────────────────────────────

function OtherCases({ items }: { items: PortfolioCase[] }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <SectionHeading eyebrow="Ещё" title="Другие кейсы" />
          <Link
            href="/portfolio"
            className="group/all text-text-primary hover:text-brand-violet inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Все кейсы
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CaseCard key={c.slug} data={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
