import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { MDXContent } from "@/components/blog/MDXContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/sections/CTASection";
import {
  formatPostDate,
  getAllPosts,
  getBlogOgUrl,
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImage = `/og?title=${encodeURIComponent(post.title)}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function ArticleJsonLd({
  post,
  url,
}: {
  post: BlogPost;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "KodStudio",
      logo: { "@type": "ImageObject", url: `${url}/icon.svg` },
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodstudio.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <main className="flex-1">
      <ArticleJsonLd post={post} url={postUrl} />

      {/* Hero */}
      <section className="pt-12 pb-12 md:pt-16">
        <Container>
          <Link
            href="/blog"
            className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Все статьи
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
            {post.tags.map((t) => (
              <Badge key={t} tone="violet">
                {t}
              </Badge>
            ))}
            <time className="text-text-muted" dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
            <span className="text-text-muted opacity-50">·</span>
            <span className="text-text-muted">{post.readingTime}</span>
          </div>

          <h1 className="font-heading text-text-primary mt-5 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="text-text-secondary mt-4 max-w-2xl text-lg leading-relaxed">
            {post.description}
          </p>

          <div className="mt-10 aspect-[16/8] overflow-hidden rounded-3xl border border-brand-violet/15 shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getBlogOgUrl(post)}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Content + TOC */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            <article className="prose-blog max-w-none lg:max-w-[68ch]">
              <MDXContent source={post.body} />

              <div className="mt-12 border-t border-border/80 pt-6">
                <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={post.headings} />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-heading text-text-primary text-xl font-bold tracking-tight md:text-2xl">
                Похожие статьи
              </h2>
              <Link
                href="/blog"
                className="group/all text-text-primary hover:text-brand-violet inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                Все статьи
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <article key={p.slug} className="group">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="border-brand-violet/15 relative aspect-video overflow-hidden rounded-xl border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getBlogOgUrl(p)}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="text-text-muted mt-4 text-xs">
                      {formatPostDate(p.date)} · {p.readingTime}
                    </p>
                    <h3 className="font-heading text-text-primary group-hover:text-brand-magenta mt-2 line-clamp-2 text-base font-semibold transition-colors md:text-lg">
                      {p.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="border-brand-violet/20 bg-bg-elevated/60 mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border p-10 text-center backdrop-blur md:p-12">
            <h3 className="font-heading text-text-primary text-2xl font-bold tracking-tight md:text-3xl">
              Подписаться на блог
            </h3>
            <p className="text-text-secondary max-w-md text-sm md:text-base">
              Раз в месяц присылаем дайджест свежих статей и заметок без воды.
              Без рекламы и спама.
            </p>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-2",
              )}
            >
              Подписаться
              <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection />
    </main>
  );
}
