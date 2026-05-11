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
    <div className="absolute inset-x-3 inset-y-3 flex flex-col overflow-hidden rounded-xl bg-zinc-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:inset-x-5 sm:inset-y-5">
      {/* Browser title bar (macOS-like) */}
      <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-2 border-b border-black/40">
        <span className="size-2.5 rounded-full bg-red-500 shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)]" />
        <span className="size-2.5 rounded-full bg-yellow-400 shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)]" />
        <span className="size-2.5 rounded-full bg-emerald-500 shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)]" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-md bg-zinc-800/90 px-2 py-0.5 font-mono text-[10px] text-zinc-300 ring-1 ring-white/10">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {domain}
        </div>
      </div>

      {/* Page body — solid gradient like real screenshot */}
      <div
        className={cn(
          "relative flex flex-1 flex-col bg-gradient-to-br p-3 sm:p-4",
          data.hero,
        )}
      >
        {/* Top nav */}
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-wider text-white/80 sm:text-[10px]">
          <span className="font-heading text-base font-bold tracking-tight text-white drop-shadow-sm sm:text-lg">
            {initials}
          </span>
          <div className="hidden gap-2 sm:flex">
            {navItems.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold text-zinc-900 shadow-sm sm:text-[10px]">
            Связаться
          </span>
        </div>

        {/* Hero text */}
        <div className="mt-2 space-y-0.5">
          <p className="font-heading line-clamp-2 text-[11px] font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-sm">
            {data.title}
          </p>
        </div>

        {/* Stack chips */}
        <div className="mt-auto flex flex-wrap items-center gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-black/30 px-1.5 py-0.5 font-mono text-[9px] text-white shadow-sm ring-1 ring-white/20"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] text-white/80">
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
    <div className="absolute inset-x-3 inset-y-3 flex flex-col overflow-hidden rounded-xl bg-zinc-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:inset-x-5 sm:inset-y-5">
      {/* Header — sky-blue like Telegram */}
      <div className="flex items-center justify-between bg-gradient-to-b from-sky-700 to-sky-800 px-3 py-2 shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "grid size-7 place-items-center rounded-full bg-gradient-to-br shadow-sm",
              data.hero,
            )}
          >
            <span className="text-[10px] font-bold text-white drop-shadow-sm">
              {initials}
            </span>
          </div>
          <div className="leading-tight">
            <span className="block text-[11px] font-semibold text-white">
              {data.client}
            </span>
            <span className="block text-[9px] font-medium text-emerald-300">
              ● в сети
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] text-white/70">{data.year}</span>
      </div>

      {/* Chat area — dark wallpaper with subtle hero-gradient glow */}
      <div className="relative flex flex-1 flex-col justify-end gap-1.5 bg-zinc-900 p-3 sm:p-4">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-15",
            data.hero,
          )}
        />
        <div className="relative max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-zinc-700 px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Привет! Чем помочь?
        </div>
        <div className="relative max-w-[70%] self-end rounded-2xl rounded-br-sm bg-sky-600 px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Хочу узнать о вас
          <span className="ml-1 font-mono text-[8px] text-sky-200">9:41</span>
        </div>
        <div className="relative max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-zinc-700 px-2.5 py-1 text-[10px] font-medium leading-snug text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="block">Мы команда {initials}.</span>
          <span className="block text-white/85">Расскажу за минуту 👇</span>
        </div>
      </div>

      {/* Input bar — solid */}
      <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex-1 rounded-full bg-zinc-700 px-2.5 py-1 font-mono text-[9px] text-zinc-400">
          Написать сообщение…
        </div>
        <span className="grid size-5 place-items-center rounded-full bg-sky-500 text-[10px] font-bold text-white shadow-sm">
          ↑
        </span>
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
