import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { getAllCases } from "@/lib/portfolio";
import { getAllServiceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodstudio.dev";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/blog",
    "/portfolio",
    "/contacts",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const services: MetadataRoute.Sitemap = getAllServiceSlugs().map((s) => ({
    url: `${base}/services/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const cases: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${base}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...services, ...posts, ...cases];
}
