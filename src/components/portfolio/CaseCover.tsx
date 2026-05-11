import * as React from "react";

import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function getInitials(client: string): string {
  const stripped = client
    .replace(/[«»"'`]/g, "")
    .replace(
      /\b(студия|студии|студий|агентство|агентства|компания|компании|бренд|бренда|the)\b/giu,
      "",
    )
    .replace(/\s*[/|·,]\s*/g, " ")
    .replace(/-/g, " ")
    .trim();
  const words = stripped.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "·";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// ───────────────────────────────────────────────────────────────
// Mockups per category — render INSIDE the gradient hero placeholder.
// ───────────────────────────────────────────────────────────────

function WebsiteMock({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  const domain = data.liveUrl
    ? data.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${data.slug}.studio`;
  const navItems = ["Главная", "Услуги", "Кейсы", "Контакты"];
  const tags = data.stack.slice(0, 3);

  return (
    <div className="absolute inset-x-3 inset-y-3 flex flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[2px] sm:inset-x-5 sm:inset-y-5">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/15 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-yellow-300/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/20 px-2 py-0.5 font-mono text-[10px] text-white/85">
          {domain}
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        {/* Nav row */}
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-wider text-white/70 sm:text-[10px]">
          <span className="font-heading text-base font-bold tracking-tight text-white sm:text-lg">
            {initials}
          </span>
          <div className="hidden gap-2 sm:flex">
            {navItems.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <span className="rounded-md bg-white/25 px-1.5 py-0.5 text-white/95">
            Связаться
          </span>
        </div>

        {/* Hero text */}
        <div className="mt-1 space-y-0.5">
          <p className="font-heading line-clamp-2 text-[11px] font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-sm">
            {data.title}
          </p>
        </div>

        {/* Stack chips */}
        <div className="mt-auto flex flex-wrap items-center gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-white/30 bg-white/15 px-1.5 py-0.5 font-mono text-[9px] text-white/90"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] text-white/60">
            {data.year}
          </span>
        </div>
      </div>
    </div>
  );
}

function BotMock({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  return (
    <div className="absolute inset-x-3 inset-y-3 flex flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[2px] sm:inset-x-5 sm:inset-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/15 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded-full bg-white/25">
            <span className="text-[10px] font-bold text-white">{initials}</span>
          </div>
          <div className="leading-tight">
            <span className="block text-[11px] font-semibold text-white">
              {data.client}
            </span>
            <span className="block text-[9px] font-medium text-emerald-300">
              ● online
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] text-white/60">{data.year}</span>
      </div>
      {/* Chat */}
      <div className="flex flex-1 flex-col justify-end gap-1.5 p-3 sm:p-4">
        <div className="max-w-[80%] self-start rounded-xl rounded-bl-md bg-white/20 px-2.5 py-1 text-[10px] font-medium text-white/95">
          Привет! Чем помочь?
        </div>
        <div className="max-w-[70%] self-end rounded-xl rounded-br-md bg-white/35 px-2.5 py-1 text-[10px] font-medium text-white">
          Хочу узнать о вас
        </div>
        <div className="max-w-[85%] self-start rounded-xl rounded-bl-md bg-white/20 px-2.5 py-1 text-[10px] font-medium leading-snug text-white/95">
          <span className="block">Мы команда {initials}.</span>
          <span className="block opacity-80">Расскажу за минуту 👇</span>
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 border-t border-white/15 px-3 py-1.5">
        <div className="flex-1 rounded-full bg-white/15 px-2 py-1 font-mono text-[9px] text-white/55">
          Написать сообщение…
        </div>
        <span className="font-mono text-[9px] text-white/70">↵</span>
      </div>
    </div>
  );
}

function AppMock({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  const tabs = ["Главная", "Профиль", "Ещё"];
  return (
    <div className="absolute inset-0 grid place-items-center px-4 py-3">
      {/* Phone body (dark bezel) — solid, real-looking */}
      <div className="relative h-full w-[55%] min-w-[140px] max-w-[230px] rounded-[28px] bg-zinc-950 p-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:w-[45%] sm:rounded-[32px] sm:p-[7px]">
        {/* Side buttons */}
        <span
          aria-hidden="true"
          className="absolute -left-[2px] top-[24%] h-8 w-[2px] rounded-l-md bg-zinc-700"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[2px] top-[36%] h-12 w-[2px] rounded-l-md bg-zinc-700"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[2px] top-[30%] h-14 w-[2px] rounded-r-md bg-zinc-700"
        />

        {/* Screen */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-zinc-900 sm:rounded-[26px]">
          {/* Subtle wallpaper gradient inside the screen — using case hero colors */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              data.hero,
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/30"
          />

          {/* Dynamic island (notch replacement) */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1.5 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-black sm:h-4 sm:w-16"
          />

          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-3 py-1.5">
            <span className="font-mono text-[9px] font-semibold text-white">
              9:41
            </span>
            <span className="size-3" /> {/* spacer for notch */}
            <div className="flex items-center gap-1">
              <span className="h-1 w-3 rounded-sm bg-white" />
              <span className="h-1 w-1.5 rounded-sm bg-white/85" />
              <span className="h-1 w-2 rounded-sm bg-white/85" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col gap-1.5 px-3 pb-1 pt-1">
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-xl font-bold leading-none tracking-tight text-white drop-shadow-sm sm:text-2xl">
                {initials}
              </span>
              <span className="font-mono text-[9px] text-white/80">
                {data.year}
              </span>
            </div>
            <p className="font-heading line-clamp-2 text-[10px] font-semibold leading-snug text-white">
              {data.client}
            </p>
            <div className="mt-1 space-y-1">
              <div className="rounded-md bg-white/25 px-2 py-1 text-[9px] font-medium text-white shadow-sm">
                Заказы
              </div>
              <div className="rounded-md bg-white/15 px-2 py-1 text-[9px] font-medium text-white/90">
                Каталог
              </div>
              <div className="rounded-md bg-white/15 px-2 py-1 text-[9px] font-medium text-white/90">
                Уведомления
              </div>
            </div>
            {/* Tab bar */}
            <div className="mt-auto flex justify-around border-t border-white/20 pt-1.5 text-[8px] font-medium uppercase tracking-wider text-white/75">
              {tabs.map((t, i) => (
                <span key={t} className={cn(i === 0 ? "text-white" : "text-white/55")}>
                  {t}
                </span>
              ))}
            </div>
            {/* Home indicator */}
            <div
              aria-hidden="true"
              className="mx-auto mb-1 mt-1 h-0.5 w-12 rounded-full bg-white/60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseCover({ data }: { data: PortfolioCase }) {
  // Pick a mockup by category. Default → website-style.
  switch (data.category) {
    case "Боты":
      return <BotMock data={data} />;
    case "Приложения":
      return <AppMock data={data} />;
    case "Сайты":
    default:
      return <WebsiteMock data={data} />;
  }
}
