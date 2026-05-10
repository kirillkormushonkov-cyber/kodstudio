import { headers } from "next/headers";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { listApproved, type Review } from "@/lib/reviews";
import { isVercelAppHost } from "@/lib/turnstile";

import { ReviewForm } from "./ReviewForm";
import {
  TestimonialsCarousel,
  type TestimonialItem,
} from "./TestimonialsCarousel";

function toCarouselItem(r: Review): TestimonialItem {
  return {
    rating: r.rating,
    quote: r.text,
    author: r.name,
    role: r.position ?? "",
    company: r.company ?? "",
    avatarColor: r.avatar_color,
  };
}

async function loadReviews(): Promise<Review[]> {
  try {
    return await listApproved();
  } catch (err) {
    console.error("[testimonials] failed to load reviews", err);
    return [];
  }
}

export async function Testimonials() {
  const reviews = await loadReviews();
  const items = reviews.map(toCarouselItem);
  // On *.vercel.app hosts Cloudflare refuses real site keys because the domain
  // is on the Public Suffix List — fall back to the always-pass testing key.
  // Production custom domain (kodstudio.ru) uses the real key as usual.
  const host = (await headers()).get("host");
  const siteKey = isVercelAppHost(host)
    ? "1x00000000000000000000AA"
    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          align="center"
          className="mb-12 md:mb-16"
        />

        {items.length > 0 ? (
          <TestimonialsCarousel data={items} />
        ) : (
          <p className="text-text-muted mx-auto max-w-md text-center text-sm">
            Пока никто не оставил отзыв. Будьте первым ↓
          </p>
        )}

        <div className="mt-16 md:mt-20">
          <ReviewForm siteKey={siteKey} />
        </div>
      </Container>
    </section>
  );
}
