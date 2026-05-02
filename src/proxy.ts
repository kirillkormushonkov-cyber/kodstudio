// Next.js 16 renamed `middleware` to `proxy`. Same runtime, new convention.
// Protects /admin/* routes with HTTP Basic Auth using env credentials.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse(
      "Admin credentials are not configured (set ADMIN_USER and ADMIN_PASSWORD).",
      { status: 503 },
    );
  }

  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  const provided = req.headers.get("authorization");

  if (provided !== expected) {
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
