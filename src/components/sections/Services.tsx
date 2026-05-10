import * as React from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  Globe,
  Smartphone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const cardBase =
  "group relative overflow-hidden rounded-3xl border border-brand-violet/15 bg-bg-elevated/60 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow";

const iconWrap =
  "grid size-16 place-items-center rounded-2xl bg-gradient-brand shadow-brand";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="text-text-secondary flex items-start gap-2.5 text-sm">
    <CheckCircle
      className="text-brand-magenta mt-0.5 size-4 shrink-0"
      aria-hidden="true"
    />
    <span>{children}</span>
  </li>
);

const MoreLink = ({ href, label = "Подробнее" }: { href: string; label?: string }) => (
  <a
    href={href}
    className="group/cta text-text-primary hover:text-brand-violet inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
  >
    {label}
    <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
  </a>
);

// ────────────────────────────────────────────────────────────────
// Decorative visuals
// ────────────────────────────────────────────────────────────────

function BrowserMockup() {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-bg-overlay absolute -right-8 -bottom-12 hidden w-72 rotate-3 select-none rounded-xl border shadow-2xl transition-transform duration-500 group-hover:rotate-2 group-hover:-translate-y-2 md:block"
    >
      <div className="border-border flex items-center gap-1.5 border-b px-3 py-2.5">
        <span className="size-2 rounded-full bg-red-500/70" />
        <span className="size-2 rounded-full bg-yellow-500/70" />
        <span className="size-2 rounded-full bg-emerald-500/70" />
        <div className="bg-bg-base/60 ml-3 h-3 flex-1 rounded" />
      </div>
      <div className="space-y-2 p-3">
        <div className="bg-gradient-brand h-5 w-3/4 rounded opacity-60" />
        <div className="bg-bg-base/60 h-2 w-full rounded" />
        <div className="bg-bg-base/60 h-2 w-5/6 rounded" />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="bg-brand-violet/25 aspect-square rounded" />
          <div className="bg-brand-purple/25 aspect-square rounded" />
          <div className="bg-brand-pink/25 aspect-square rounded" />
        </div>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-6 bottom-8 hidden w-56 flex-col gap-2.5 md:flex"
    >
      <div className="bg-bg-overlay border-border text-text-secondary self-start rounded-2xl rounded-bl-md border px-3 py-2 text-xs">
        Привет! Хочу автоматизировать заказы 👋
      </div>
      <div className="bg-gradient-brand shadow-brand self-end rounded-2xl rounded-br-md px-3 py-2 text-xs text-white">
        Готово. Соберём бот за 7 дней ✨
      </div>
      <div className="bg-bg-overlay border-border self-start rounded-2xl rounded-bl-md border px-3 py-2">
        <span className="bg-text-muted/60 inline-block size-1.5 animate-bounce rounded-full" />
        <span className="bg-text-muted/60 mx-0.5 inline-block size-1.5 animate-bounce rounded-full [animation-delay:120ms]" />
        <span className="bg-text-muted/60 inline-block size-1.5 animate-bounce rounded-full [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-border bg-bg-overlay/85 relative shrink-0 rounded-[28px] border-2 p-2 shadow-2xl",
        className,
      )}
    >
      <div className="bg-black/70 mx-auto h-3 w-12 rounded-b-xl" />
      <div className="mt-3 space-y-1.5 px-1">
        <div className="bg-gradient-brand h-3 w-3/4 rounded opacity-60" />
        <div className="bg-bg-base/60 h-1.5 w-full rounded" />
        <div className="bg-bg-base/60 h-1.5 w-5/6 rounded" />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="bg-brand-violet/25 aspect-square rounded" />
          <div className="bg-brand-pink/25 aspect-square rounded" />
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Services section
// ────────────────────────────────────────────────────────────────

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card 1 — Сайты под ключ (большая, col-span-2, h-480) */}
          <article
            className={cn(cardBase, "h-[480px] lg:col-span-2")}
            id="services-dev"
          >
            <div className="relative z-10 flex h-full max-w-md flex-col">
              <div className={iconWrap}>
                <Globe className="size-7 text-white" aria-hidden="true" />
              </div>

              <h3 className="font-heading text-text-primary mt-6 text-2xl font-bold tracking-tight md:text-3xl">
                Сайты под ключ
              </h3>

              <p className="text-text-secondary mt-3 text-sm leading-relaxed md:text-base">
                Лендинги, корпоративные сайты, e-commerce и веб-приложения.
                Дизайн, разработка, контент и аналитика — собираем под задачу.
              </p>

              <ul className="mt-6 grid gap-2.5">
                <FeatureItem>Next.js, React, TypeScript</FeatureItem>
                <FeatureItem>SEO, Core Web Vitals 90+</FeatureItem>
                <FeatureItem>CMS под редактуру без разработчика</FeatureItem>
                <FeatureItem>Аналитика и A/B-тесты</FeatureItem>
              </ul>

              <div className="mt-auto pt-6">
                <MoreLink href="#contact" />
              </div>
            </div>

            <BrowserMockup />
          </article>

          {/* Card 2 — Telegram-боты (1 col, h-480) */}
          <article className={cn(cardBase, "h-[480px]")} id="services-bots">
            <div className="relative z-10 flex h-full max-w-md flex-col">
              <div className={iconWrap}>
                <Bot className="size-7 text-white" aria-hidden="true" />
              </div>

              <h3 className="font-heading text-text-primary mt-6 text-2xl font-bold tracking-tight md:text-3xl">
                Telegram-боты
              </h3>

              <p className="text-text-secondary mt-3 text-sm leading-relaxed md:text-base">
                Автоматизация продаж, рассылок и поддержки. Интеграция с CRM,
                платежами и любыми API.
              </p>

              <ul className="mt-6 grid gap-2.5">
                <FeatureItem>Прием заявок и оплаты</FeatureItem>
                <FeatureItem>CRM-интеграции (amoCRM, Bitrix)</FeatureItem>
                <FeatureItem>Mini Apps на Telegram WebApp</FeatureItem>
                <FeatureItem>Аналитика воронок</FeatureItem>
              </ul>

              <div className="mt-auto pt-6">
                <MoreLink href="#contact" />
              </div>
            </div>

            <ChatMockup />
          </article>

          {/* Card 3 — Mobile (full width, h-320, horizontal) */}
          <article
            className={cn(cardBase, "h-[320px] lg:col-span-3")}
            id="services-mobile"
          >
            <div className="flex h-full items-center gap-8">
              <div className="relative z-10 flex h-full max-w-xl flex-col justify-center">
                <div className="flex items-center gap-4">
                  <div className={cn(iconWrap, "size-14")}>
                    <Smartphone
                      className="size-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading text-text-primary text-2xl font-bold tracking-tight md:text-3xl">
                    Мобильные приложения <span className="text-text-secondary font-medium">iOS / Android</span>
                  </h3>
                </div>

                <p className="text-text-secondary mt-4 text-sm leading-relaxed md:text-base">
                  Нативные и кросс-платформенные приложения на React Native и
                  Swift / Kotlin. От MVP до продукта в сторах.
                </p>

                <div className="mt-5">
                  <MoreLink href="#contact" />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="ml-auto hidden h-full items-end gap-3 pr-4 md:flex"
              >
                <PhoneMockup className="-mb-6 h-[230px] w-[120px] -rotate-6" />
                <PhoneMockup className="-mb-2 h-[260px] w-[130px] rotate-3" />
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
