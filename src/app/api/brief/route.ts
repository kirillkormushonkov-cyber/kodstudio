import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  type: z.array(z.string()).min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  telegram: z.string().optional(),
  description: z.string().min(10),
});

function formatTelegramMessage(data: z.infer<typeof schema>): string {
  return [
    "🆕 *Новая заявка KodStudio*",
    "",
    `*Имя:* ${data.name}`,
    `*Email:* ${data.email}`,
    data.telegram ? `*Telegram:* ${data.telegram}` : "",
    `*Тип:* ${data.type.join(", ")}`,
    `*Бюджет:* ${data.budget}`,
    `*Сроки:* ${data.timeline}`,
    "",
    `*Описание:*\n${data.description}`,
  ]
    .filter(Boolean)
    .join("\n");
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

  const webhookUrl = process.env.BRIEF_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: parsed.data,
          message: formatTelegramMessage(parsed.data),
          source: "kodstudio.dev",
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[brief] webhook delivery failed", err);
    }
  } else {
    console.log("[brief] received (no webhook configured):", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
