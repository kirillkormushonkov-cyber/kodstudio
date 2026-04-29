import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type CaseMetric = { value: string; label: string };
export type CaseGalleryItem = { cover: string; alt: string; aspect: string };

export type PortfolioCase = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  /** Tailwind gradient classes for the hero image. */
  hero: string;
  stack: string[];
  metrics: CaseMetric[];
  task: string;
  solution: string;
  result: string;
  gallery: CaseGalleryItem[];
  body: string;
};

const PORTFOLIO_DIR = path.join(process.cwd(), "content", "portfolio");

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function readCase(file: string): PortfolioCase {
  const raw = fs.readFileSync(path.join(PORTFOLIO_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: asString(data.slug) || file.replace(/\.mdx?$/, ""),
    title: asString(data.title),
    client: asString(data.client),
    category: asString(data.category),
    year: typeof data.year === "number" ? data.year : Number(data.year) || 0,
    hero: asString(data.hero) || "from-brand-violet to-brand-pink",
    stack: asArray<string>(data.stack),
    metrics: asArray<CaseMetric>(data.metrics),
    task: asString(data.task),
    solution: asString(data.solution),
    result: asString(data.result),
    gallery: asArray<CaseGalleryItem>(data.gallery),
    body: content,
  };
}

export function getAllCases(): PortfolioCase[] {
  if (!fs.existsSync(PORTFOLIO_DIR)) return [];
  const files = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files.map(readCase).sort((a, b) => b.year - a.year);
}

export function getCaseBySlug(slug: string): PortfolioCase | null {
  return getAllCases().find((c) => c.slug === slug) ?? null;
}

export function getOtherCases(slug: string, n: number): PortfolioCase[] {
  return getAllCases()
    .filter((c) => c.slug !== slug)
    .slice(0, n);
}

export function getCategories(): string[] {
  const set = new Set<string>();
  for (const c of getAllCases()) set.add(c.category);
  return Array.from(set);
}
