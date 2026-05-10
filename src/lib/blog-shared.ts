export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Tailwind gradient classes for cover placeholder. */
  cover: string;
  tags: string[];
  author: string;
  /** Human-readable reading time, e.g. "5 мин". */
  readingTime: string;
};

export type TocHeading = {
  /** Heading depth — 2 (h2) or 3 (h3). */
  depth: number;
  text: string;
  slug: string;
};

const ruDateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatPostDate(iso: string): string {
  if (!iso) return "";
  return ruDateFormat.format(new Date(iso)).replace(" г.", "");
}

export function getBlogOgUrl(post: Pick<BlogPost, "title" | "description" | "tags" | "readingTime">): string {
  const subtitleParts = [post.tags[0], post.readingTime].filter(Boolean);
  const subtitle = subtitleParts.length > 0
    ? subtitleParts.join(" · ")
    : post.description.slice(0, 120);
  const params = new URLSearchParams({
    title: post.title,
    subtitle,
  });
  return `/og?${params.toString()}`;
}
