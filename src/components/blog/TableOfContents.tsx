"use client";

import * as React from "react";

import type { TocHeading } from "@/lib/blog-shared";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = React.useState<string>(
    headings[0]?.slug ?? "",
  );

  React.useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Содержание статьи" className="text-sm">
      <p className="text-text-muted mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
        Содержание
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li
            key={h.slug}
            style={{ paddingLeft: `${(h.depth - 2) * 12}px` }}
          >
            <a
              href={`#${h.slug}`}
              className={cn(
                "block border-l-2 py-1 pl-3 transition-colors",
                activeId === h.slug
                  ? "border-brand-violet text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
