import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import {
  listAll,
  type ReviewStatus,
  type ReviewWithMeta,
} from "@/lib/reviews";
import {
  approveAction,
  deleteAction,
  rejectAction,
} from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Модерация отзывов",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: "На модерации",
  approved: "Опубликован",
  rejected: "Отклонён",
};

const STATUS_BADGE: Record<ReviewStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300",
  approved: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-zinc-500/15 text-zinc-300",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminReviewsPage() {
  let reviews: ReviewWithMeta[] = [];
  let loadError: string | null = null;
  try {
    reviews = await listAll();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error";
  }

  const counts = {
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <header className="mb-10">
          <p className="text-brand-violet text-xs font-semibold tracking-[0.22em] uppercase">
            Админка
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Модерация отзывов
          </h1>
          <div className="text-text-muted mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span>
              На модерации:{" "}
              <b className="text-amber-300">{counts.pending}</b>
            </span>
            <span>
              Опубликовано:{" "}
              <b className="text-emerald-300">{counts.approved}</b>
            </span>
            <span>
              Отклонено: <b className="text-text-secondary">{counts.rejected}</b>
            </span>
          </div>
        </header>

        {loadError && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
            <p className="font-semibold">Не удалось загрузить отзывы</p>
            <p className="mt-1 opacity-80">{loadError}</p>
            <p className="mt-2 opacity-80">
              Проверь, что задана переменная <code>DATABASE_URL</code> и
              применена схема из <code>db/schema.sql</code>.
            </p>
          </div>
        )}

        {reviews.length === 0 && !loadError && (
          <p className="text-text-muted">Отзывов пока нет.</p>
        )}

        <div className="space-y-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="border-border/80 bg-bg-elevated/50 rounded-2xl border p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-text-primary text-base font-semibold">
                    {r.name}
                    {r.position && (
                      <span className="text-text-muted font-normal">
                        {" "}
                        · {r.position}
                      </span>
                    )}
                    {r.company && (
                      <span className="text-text-muted font-normal">
                        {" "}
                        · {r.company}
                      </span>
                    )}
                  </h2>
                  <p className="text-text-muted mt-1 text-xs">
                    {formatDate(r.created_at)} · {r.email}
                    {r.ip && ` · ${r.ip}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_BADGE[r.status]}`}
                  >
                    {STATUS_LABELS[r.status]}
                  </span>
                  <span className="text-brand-pink text-sm">
                    {"★".repeat(r.rating)}
                    <span className="text-border">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </span>
                </div>
              </div>

              <p className="text-text-secondary mt-4 text-sm leading-relaxed">
                {r.text}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {r.status !== "approved" && (
                  <form action={approveAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/30"
                    >
                      Опубликовать
                    </button>
                  </form>
                )}
                {r.status !== "rejected" && (
                  <form action={rejectAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/30"
                    >
                      Отклонить
                    </button>
                  </form>
                )}
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="rounded-lg bg-red-500/15 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/25"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
