import "server-only";

import { getSql } from "./db";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: number;
  name: string;
  position: string | null;
  company: string | null;
  rating: number;
  text: string;
  avatar_color: string;
  created_at: string;
};

export type ReviewWithMeta = Review & {
  email: string;
  status: ReviewStatus;
  ip: string | null;
};

export type SubmitInput = {
  name: string;
  position?: string;
  company?: string;
  rating: number;
  text: string;
  email: string;
  ip?: string;
};

const AVATAR_COLORS = [
  "from-brand-violet to-brand-purple",
  "from-brand-pink to-brand-magenta",
  "from-brand-purple to-brand-violet",
  "from-brand-magenta to-brand-pink",
  "from-brand-violet to-brand-pink",
  "from-brand-purple to-brand-magenta",
];

export function pickAvatarColor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export async function listApproved(): Promise<Review[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, position, company, rating, text, avatar_color, created_at
    FROM reviews
    WHERE status = 'approved'
    ORDER BY created_at DESC
    LIMIT 50
  `;
  return rows as unknown as Review[];
}

export async function listAll(): Promise<ReviewWithMeta[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, position, company, rating, text, email, avatar_color, status, ip, created_at
    FROM reviews
    ORDER BY
      CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
      created_at DESC
    LIMIT 200
  `;
  return rows as unknown as ReviewWithMeta[];
}

export async function submit(input: SubmitInput): Promise<void> {
  const sql = getSql();
  const color = pickAvatarColor(input.name);
  await sql`
    INSERT INTO reviews
      (name, position, company, rating, text, email, avatar_color, ip)
    VALUES
      (${input.name}, ${input.position ?? null}, ${input.company ?? null},
       ${input.rating}, ${input.text}, ${input.email}, ${color}, ${input.ip ?? null})
  `;
}

export async function setStatus(
  id: number,
  status: ReviewStatus,
): Promise<void> {
  const sql = getSql();
  await sql`UPDATE reviews SET status = ${status} WHERE id = ${id}`;
}

export async function remove(id: number): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM reviews WHERE id = ${id}`;
}
