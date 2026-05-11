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

function Lines({ count = 3, widths = ["w-3/4", "w-1/2", "w-2/3"], alpha = "bg-white/60" }: {
  count?: number;
  widths?: string[];
  alpha?: string;
}) {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn("h-1.5 rounded-full", alpha, widths[i % widths.length])}
        />
      ))}
    </div>
  );
}

function WebsiteMock({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  const domain = data.liveUrl
    ? data.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${data.slug}.studio`;
  return (
    <div className="absolute inset-x-3 inset-y-3 flex flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[2px] sm:inset-x-5 sm:inset-y-5">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/15 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-yellow-300/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-mono text-white/80">
          {domain}
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <span className="font-heading text-2xl font-bold leading-none tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
            {initials}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
            {data.year}
          </span>
        </div>
        <Lines count={3} widths={["w-4/5", "w-3/5", "w-2/3"]} />
        <div className="mt-auto grid grid-cols-3 gap-1.5 sm:gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-7 rounded-md bg-white/15 sm:h-9"
            />
          ))}
        </div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
          {data.client}
        </p>
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
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/85 sm:text-xs">
            {data.client}
          </span>
        </div>
        <span className="text-[10px] font-medium text-white/60">
          online
        </span>
      </div>
      {/* Chat */}
      <div className="flex flex-1 flex-col justify-end gap-2 p-3 sm:gap-2.5 sm:p-4">
        <div className="max-w-[75%] self-start rounded-xl rounded-bl-md bg-white/20 px-2.5 py-1.5">
          <div className="h-1.5 w-20 rounded-full bg-white/60" />
          <div className="mt-1 h-1.5 w-12 rounded-full bg-white/40" />
        </div>
        <div className="max-w-[70%] self-end rounded-xl rounded-br-md bg-white/35 px-2.5 py-1.5">
          <div className="h-1.5 w-16 rounded-full bg-white/80" />
        </div>
        <div className="max-w-[80%] self-start rounded-xl rounded-bl-md bg-white/20 px-2.5 py-1.5">
          <div className="h-1.5 w-24 rounded-full bg-white/60" />
          <div className="mt-1 h-1.5 w-16 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function AppMock({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  return (
    <div className="absolute inset-0 grid place-items-center px-4 py-3">
      <div className="relative flex h-full w-[55%] min-w-[140px] max-w-[230px] flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px] sm:w-[45%]">
        {/* Status bar / notch */}
        <div className="relative flex items-center justify-between px-3 py-1.5">
          <span className="font-mono text-[9px] font-semibold text-white/80">
            9:41
          </span>
          <div className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/40" />
          <div className="flex gap-1">
            <span className="h-1 w-3 rounded-sm bg-white/70" />
            <span className="h-1 w-1.5 rounded-sm bg-white/70" />
            <span className="h-1 w-2 rounded-sm bg-white/70" />
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
          <span className="font-heading text-xl font-bold leading-none tracking-tight text-white drop-shadow-sm sm:text-2xl">
            {initials}
          </span>
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 rounded-full bg-white/55" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/40" />
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            <div className="h-7 rounded-md bg-white/20" />
            <div className="h-7 rounded-md bg-white/30" />
          </div>
          <div className="mt-auto flex items-center justify-between text-[9px] font-medium uppercase tracking-wider text-white/70">
            <span className="truncate">{data.client}</span>
            <span className="ml-2 shrink-0">{data.year}</span>
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
