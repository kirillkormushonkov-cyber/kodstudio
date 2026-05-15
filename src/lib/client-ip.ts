import "server-only";

/**
 * Trustworthy client IP behind Vercel.
 *
 * - `x-vercel-forwarded-for` is injected by Vercel's edge and the leading
 *   entry is the real client IP. Clients cannot forge it because Vercel
 *   rewrites this header on every request.
 * - `x-forwarded-for` is the standard fallback, but Vercel _appends_ the
 *   real IP rather than replacing the header. So when a client sends
 *   `X-Forwarded-For: 1.2.3.4`, it becomes `1.2.3.4, <REAL_IP>` — the
 *   FIRST entry is attacker-controlled. Take the LAST entry instead.
 */
export function clientIp(req: Request): string | undefined {
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) {
    const first = vercel.split(",")[0]?.trim();
    if (first) return first;
  }

  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const parts = fwd.split(",").map((s) => s.trim()).filter(Boolean);
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  return req.headers.get("x-real-ip") ?? undefined;
}
