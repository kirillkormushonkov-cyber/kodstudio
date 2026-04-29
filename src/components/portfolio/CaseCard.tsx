import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PortfolioCase } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function CaseCard({ data }: { data: PortfolioCase }) {
  return (
    <article className="group">
      <Link href={`/portfolio/${data.slug}`} className="block outline-none">
        <div
          className={cn(
            "border-brand-violet/15 relative aspect-[16/10] overflow-hidden rounded-2xl border",
            "transition-all duration-300 group-hover:border-brand-violet/40 group-hover:shadow-glow",
          )}
        >
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 bg-gradient-to-br", data.hero)}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-overlay opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 80% 85%, rgba(0,0,0,0.35), transparent 50%)",
            }}
          />
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
          >
            <filter id={`card-noise-${data.slug}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter={`url(#card-noise-${data.slug})`}
            />
          </svg>

          <div className="bg-bg-base/65 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="text-text-primary inline-flex items-center gap-2 text-base font-medium">
              Смотреть кейс
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-text-muted text-xs">
            {data.client}
            <span className="mx-1.5 opacity-50">·</span>
            {data.category}
          </p>
          <h4 className="font-heading text-text-primary group-hover:text-brand-violet mt-1.5 text-lg font-semibold tracking-tight transition-colors md:text-xl">
            {data.title}
          </h4>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {data.stack.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border-border/80 text-text-secondary inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
