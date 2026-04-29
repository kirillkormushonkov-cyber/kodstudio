import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

import type { BlogPost, TocHeading } from "@/lib/blog-shared";

export type { BlogPost, TocHeading } from "@/lib/blog-shared";
export { formatPostDate } from "@/lib/blog-shared";

export type BlogPostFull = BlogPost & {
  body: string;
  headings: TocHeading[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function toIsoDate(input: unknown): string {
  if (input instanceof Date) return input.toISOString().slice(0, 10);
  if (typeof input === "string") return input.slice(0, 10);
  return "";
}

function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const raw of lines) {
    if (/^```/.test(raw)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = raw.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2].replace(/[*_`]/g, "").trim();
    headings.push({ depth, text, slug: slugger.slug(text) });
  }
  return headings;
}

function parseMeta(file: string, raw: string): {
  meta: BlogPost;
  body: string;
  headings: TocHeading[];
} {
  const { data, content } = matter(raw);
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));
  const meta: BlogPost = {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? "Без названия"),
    description: String(data.description ?? ""),
    date: toIsoDate(data.date),
    cover: String(data.cover ?? "from-brand-violet to-brand-pink"),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    author: String(data.author ?? "KodStudio"),
    readingTime:
      typeof data.readingTime === "string" && data.readingTime.length > 0
        ? data.readingTime
        : `${minutes} мин`,
  };
  return { meta, body: content, headings: extractHeadings(content) };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    return parseMeta(file, raw).meta;
  });
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPostFull | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { meta, body, headings } = parseMeta(file, raw);
  return { ...meta, body, headings };
}

export function getRelatedPosts(slug: string, limit: number): BlogPost[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const tags = new Set(current.tags);

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.reduce((acc, t) => acc + (tags.has(t) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((x) => x.post);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}
