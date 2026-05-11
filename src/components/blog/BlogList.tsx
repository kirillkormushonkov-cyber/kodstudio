"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { formatPostDate, getBlogOgUrl, type BlogPost } from "@/lib/blog-shared";
import { cn } from "@/lib/utils";

const ALL_TAG = "Все";
type SortKey = "newest" | "oldest" | "title";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Сначала новые",
  oldest: "Сначала старые",
  title: "По алфавиту",
};

export function BlogList({
  posts,
  tags,
}: {
  posts: BlogPost[];
  tags: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState<string>(ALL_TAG);
  const [sort, setSort] = React.useState<SortKey>("newest");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter(
        (p) =>
          (tag === ALL_TAG || p.tags.includes(tag)) &&
          (q.length === 0 ||
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)),
      )
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title);
        return sort === "newest"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date);
      });
  }, [posts, query, tag, sort]);

  const tagChips = [ALL_TAG, ...tags];

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по статьям…"
            className="border-border bg-bg-elevated/40 text-text-primary placeholder:text-text-muted focus:border-brand-violet/60 focus:ring-brand-violet/30 h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition-colors focus:ring-2"
            aria-label="Поиск по статьям"
          />
        </div>

        <label className="inline-flex items-center gap-2 text-sm">
          <span className="text-text-muted text-xs font-semibold tracking-wider uppercase">
            Сортировка
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border-border bg-bg-elevated/40 text-text-primary focus:border-brand-violet/60 focus:ring-brand-violet/30 h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2"
          >
            {Object.entries(SORT_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Tag chips */}
      <div
        role="tablist"
        aria-label="Фильтр по тегам"
        className="mt-6 flex flex-wrap gap-2"
      >
        {tagChips.map((chip) => (
          <button
            key={chip}
            type="button"
            role="tab"
            aria-selected={tag === chip}
            onClick={() => setTag(chip)}
            className={cn(
              "rounded-full px-3.5 py-1 text-sm font-medium transition-all",
              tag === chip
                ? "bg-gradient-brand text-white shadow-brand"
                : "border-border bg-bg-elevated/40 text-text-secondary hover:bg-bg-overlay hover:text-text-primary border",
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              prefetch={false}
              className="border-brand-violet/10 hover:border-brand-violet/50 hover:shadow-brand bg-bg-elevated/30 hover:bg-bg-elevated/60 block rounded-2xl border p-3 outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand-violet/50"
            >
              <div className="border-brand-violet/15 relative aspect-video overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getBlogOgUrl(post, "thumb")}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={315}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-5 px-1 pb-2">
                <div className="text-text-muted flex items-center gap-3 text-xs">
                  {post.tags[0] ? (
                    <span className="border-border/80 group-hover:border-brand-violet/60 group-hover:text-brand-violet inline-flex items-center rounded-full border px-2 py-0.5 transition-colors">
                      {post.tags[0]}
                    </span>
                  ) : null}
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </div>
                <h3 className="sr-only">{post.title}</h3>
                <p className="text-text-primary group-hover:text-brand-magenta mt-3 line-clamp-3 text-sm leading-relaxed transition-colors">
                  {post.description}
                </p>
                <p className="text-text-muted mt-4 text-xs">
                  {post.readingTime} · {post.author}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-text-muted mt-12 text-center text-sm">
          По запросу ничего не найдено.
        </p>
      )}
    </>
  );
}
