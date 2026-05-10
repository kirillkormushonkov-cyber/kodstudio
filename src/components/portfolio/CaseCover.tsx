import * as React from "react";

import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function getInitials(client: string): string {
  const stripped = client
    .replace(/[«»"'`]/g, "")
    .replace(/\b(студия|студии|студий|агентство|агентства|компания|компании|бренд|бренда|the)\b/giu, "")
    .replace(/\s*[/|·,]\s*/g, " ")
    .replace(/-/g, " ")
    .trim();
  const words = stripped.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "·";
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

function Tile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-[2px]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CaseCover({ data }: { data: PortfolioCase }) {
  const initials = getInitials(data.client || data.title);
  const topMetric = data.metrics[0];
  const tags = data.stack.slice(0, 3);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-3 sm:gap-2.5 sm:p-4"
    >
      {/* Monogram + client */}
      <Tile className="col-span-2 row-span-2 flex flex-col justify-between">
        <span className="font-heading text-3xl font-bold leading-none tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
          {initials}
        </span>
        <span className="line-clamp-2 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
          {data.client}
        </span>
      </Tile>

      {/* Top metric */}
      <Tile className="col-span-2 row-span-1 flex items-center justify-between gap-3 overflow-hidden">
        {topMetric ? (
          <>
            <span className="font-heading truncate text-xl font-bold leading-none tracking-tight text-white sm:text-2xl">
              {topMetric.value}
            </span>
            <span className="line-clamp-2 text-right text-[10px] font-medium leading-tight text-white/75 sm:text-[11px]">
              {topMetric.label}
            </span>
          </>
        ) : (
          <span className="text-xs text-white/70">{data.category}</span>
        )}
      </Tile>

      {/* Stack tags */}
      <Tile className="col-span-3 row-span-1 flex flex-wrap items-center gap-1.5 overflow-hidden">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/90 sm:text-[11px]"
          >
            {tag}
          </span>
        ))}
      </Tile>

      {/* Year */}
      <Tile className="col-span-1 row-span-1 flex items-center justify-center">
        <span className="font-mono text-sm font-semibold tracking-tight text-white/90 sm:text-base">
          {data.year}
        </span>
      </Tile>
    </div>
  );
}
