import * as React from "react";
import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";

import { BriefForm } from "@/components/contacts/BriefForm";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { CopyEmail } from "@/components/layout/CopyEmail";
import {
  TelegramIcon,
  WhatsappIcon,
} from "@/components/layout/social-icons";
import { WhatsAppQR } from "@/components/contacts/WhatsAppQR";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import { WordsReveal } from "@/components/system/WordsReveal";

const EMAIL = "hello@kodstudio.dev";
const TELEGRAM_URL = "https://t.me/kodstudio";
const TELEGRAM_HANDLE = "@kodstudio";
const WHATSAPP_NUMBER = "+79999999999";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;
const ADDRESS = "Москва, ул. Никольская, 10, офис 312";
const HOURS = "Пн-Пт · 10:00 — 19:00 (МСК)";
const MAP_SRC =
  "https://yandex.ru/map-widget/v1/?z=15&ll=37.6234,55.7572";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Связаться с командой KodStudio — email, Telegram, WhatsApp, офис в Москве. Заполните бриф — вернёмся в течение 24 часов.",
};

export default function ContactsPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-24">
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
              Контакты
            </p>
            <h1
              className="font-heading mt-4 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
            >
              <WordsReveal
                text="Поговорим о вашем проекте"
                startDelay={0.15}
                fromX={-420}
                fromY={0}
                wordClassName="bg-gradient-brand bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
              />
            </h1>
            <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base md:text-lg">
              Заполните бриф или напишите напрямую — ответим в течение 24
              часов и предложим план следующего шага.
            </p>
          </div>
        </Container>
      </section>

      {/* Two columns */}
      <ScrollReveal>
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
            {/* Left: contact info */}
            <div className="space-y-6">
              <ContactCard
                icon={<Mail className="size-5" />}
                title="Email"
              >
                <CopyEmail email={EMAIL} className="text-base" />
              </ContactCard>

              <ContactCard
                icon={<TelegramIcon className="size-5" />}
                title="Telegram"
              >
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary text-base transition-colors"
                >
                  {TELEGRAM_HANDLE}
                </a>
              </ContactCard>

              <ContactCard
                icon={<WhatsappIcon className="size-5" />}
                title="WhatsApp"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary text-base transition-colors"
                    >
                      {WHATSAPP_NUMBER}
                    </a>
                    <p className="text-text-muted mt-2 text-xs">
                      Сканируйте QR-код для быстрого старта
                    </p>
                  </div>
                  <WhatsAppQR url={WHATSAPP_URL} />
                </div>
              </ContactCard>

              <ContactCard
                icon={<MapPin className="size-5" />}
                title="Офис"
              >
                <p className="text-text-secondary text-base">{ADDRESS}</p>
                <div className="border-border/80 mt-4 overflow-hidden rounded-xl border">
                  <iframe
                    src={MAP_SRC}
                    title="Карта офиса KodStudio"
                    width="100%"
                    height="220"
                    style={{ border: 0, filter: "grayscale(0.4) brightness(0.85)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ContactCard>

              <ContactCard
                icon={<Clock className="size-5" />}
                title="Часы работы"
              >
                <p className="text-text-secondary text-base">{HOURS}</p>
                <p className="text-text-muted mt-1 text-sm">
                  Срочные задачи — 24/7 для клиентов на поддержке
                </p>
              </ContactCard>
            </div>

            {/* Right: brief form */}
            <BriefForm />
          </div>
        </Container>
      </section>
      </ScrollReveal>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-brand-violet/15 bg-bg-elevated/50 rounded-2xl border p-6 backdrop-blur transition-colors hover:border-brand-violet/30">
      <div className="flex items-center gap-3">
        <span className="bg-gradient-brand grid size-10 place-items-center rounded-xl text-white shadow-brand">
          {icon}
        </span>
        <h2 className="font-heading text-text-primary text-base font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}
