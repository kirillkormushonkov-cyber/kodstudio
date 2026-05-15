// Next.js 16 renamed `middleware` to `proxy`. Same runtime, new convention.
// Protects /admin/* routes with HTTP Basic Auth using env credentials.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Constant-time string compare on the Edge runtime. Node's
// crypto.timingSafeEqual is unavailable here, so we hash both inputs
// to fixed-size SHA-256 digests and XOR-compare every byte. Runtime
// no longer depends on the prefix-match length of the attacker input.
async function safeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const ha = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(a)));
  const hb = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(b)));
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
  return diff === 0;
}

export async function proxy(req: NextRequest) {
  // Strip ALL whitespace (incl. embedded \n) — Vercel sometimes splits long
  // pasted values with line breaks, which corrupts the base64 Basic Auth header.
  const user = process.env.ADMIN_USER?.replace(/\s/g, "");
  const pass = process.env.ADMIN_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    return new NextResponse(
      "Admin credentials are not configured (set ADMIN_USER and ADMIN_PASSWORD).",
      { status: 503 },
    );
  }

  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  const provided = req.headers.get("authorization") ?? "";

  if (!(await safeEqual(provided, expected))) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="KodStudio Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
