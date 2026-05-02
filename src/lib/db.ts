import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  // Strip ALL whitespace (including embedded newlines) — Vercel sometimes
  // splits long pasted values with line breaks, which makes the URL invalid
  // both as a URL and as a fetch header value.
  const url = process.env.DATABASE_URL?.replace(/\s/g, "");
  if (!url) {
    throw new Error(
      "DATABASE_URL is not configured. Set it in .env.local (dev) or Vercel project env (prod).",
    );
  }
  cached = neon(url);
  return cached;
}
