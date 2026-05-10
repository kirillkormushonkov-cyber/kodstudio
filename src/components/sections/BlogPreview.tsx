import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPostDate, getBlogOgUrl, getLatestPosts, type BlogPost } from "@/lib/blog";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block outline-none">
        {/* Cover */}
        <div className="border-brand-violet/15 relative aspect-video overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getBlogOgUrl(post)}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
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

          <h4 className="sr-only">{post.title}</h4>
          <p className="text-text-primary group-hover:text-brand-magenta mt-3 line-clamp-3 text-sm leading-relaxed transition-colors">
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
