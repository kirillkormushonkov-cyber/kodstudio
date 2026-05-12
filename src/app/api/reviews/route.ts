import { NextResponse } from "next/server";
import { z } from "zod";

import { submit } from "@/lib/reviews";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(100),
  position: z.string().trim().max(100).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(30, "Минимум 30 символов").max(2000),
  email: z.string().email("Введите корректный email"),
  // Honeypot — must stay empty. Bots fill it, humans don't.
  website: z.string().max(0),
  // May be empty if Turnstile is not configured. The actual check happens
  // in verifyTurnstile, which fails closed in production.
  turnstileToken: z.string().default(""),
});

function clientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  const host = req.headers.get("host");

  const captchaOk = await verifyTurnstile(
    parsed.data.turnstileToken,
    ip,
    host,
  );
  if (!captchaOk) {
    return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
  }

  try {
    await submit({
      name: parsed.data.name,
      position: parsed.data.position || undefined,
      company: parsed.data.company || undefined,
      rating: parsed.data.rating,
      text: parsed.data.text,
      email: parsed.data.email,
      ip,
    });
  } catch (err) {
    console.error("[reviews] submit failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
