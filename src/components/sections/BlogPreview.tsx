import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPostDate, getLatestPosts, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block outline-none">
        {/* Cover */}
        <div className="border-brand-violet/15 relative aspect-video overflow-hidden rounded-xl border">
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.03]",
              post.cover,
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-overlay opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.45), transparent 55%), radial-gradient(circle at 80% 85%, rgba(0,0,0,0.3), transparent 55%)",
            }}
          />
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
          >
            <filter id={`blog-noise-${post.slug}`}>
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
              filter={`url(#blog-noise-${post.slug})`}
            />
          </svg>
        </div>

        {/* Meta */}
        <div className="mt-5">
          <div className="text-text-muted flex items-center gap-3 text-xs">
            {post.tags[0] ? (
              <span className="border-border/80 inline-flex items-center rounded-full border px-2 py-0.5">
                {post.tags[0]}
              </span>
            ) : null}
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>

          <h4 className="font-heading text-text-primary group-hover:text-brand-magenta mt-3 line-clamp-2 text-lg font-semibold tracking-tight transition-colors md:text-xl">
            {post.title}
          </h4>

          <p className="text-text-secondary mt-2 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>

          <div className="text-text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
            Читать
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogPreview() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Блог" title="Свежие статьи" />
          <Link
            href="/blog"
            className="group/all text-text-primary hover:text-brand-violet inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Все статьи
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
