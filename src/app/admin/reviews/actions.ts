"use server";

import { revalidatePath } from "next/cache";

import { remove, setStatus } from "@/lib/reviews";

function readId(formData: FormData): number | null {
  const raw = formData.get("id");
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function approveAction(formData: FormData) {
  const id = readId(formData);
  if (!id) return;
  await setStatus(id, "approved");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function rejectAction(formData: FormData) {
  const id = readId(formData);
  if (!id) return;
  await setStatus(id, "rejected");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function deleteAction(formData: FormData) {
  const id = readId(formData);
  if (!id) return;
  await remove(id);
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
