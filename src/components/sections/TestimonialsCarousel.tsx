"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  rating: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Tailwind gradient classes for the avatar fallback. */
  avatarColor: string;
};

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Оценка ${count} из 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < count ? "fill-brand-pink text-brand-pink" : "text-border",
          )}
        />
      ))}
    </div>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-heading grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold tracking-tight text-white shadow-brand",
        color,
      )}
    >
      {initials}
    </span>
  );
}

function TestimonialCard({ data }: { data: TestimonialItem }) {
  const meta = [data.role, data.company].filter(Boolean).join(" · ");
  return (
    <article className="border-brand-violet/15 bg-bg-elevated/60 flex h-full flex-col gap-5 rounded-2xl border p-6 backdrop-blur md:p-7">
      <Stars count={data.rating} />
      <p className="text-text-primary text-base leading-relaxed md:text-[17px]">
        «{data.quote}»
      </p>
      <div className="border-border/80 mt-auto border-t pt-5">
        <div className="flex items-center gap-3">
          <Avatar name={data.author} color={data.avatarColor} />
          <div>
            <p className="text-text-primary text-sm font-semibold">
              {data.author}
            </p>
            {meta && <p className="text-text-muted text-xs">{meta}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsCarousel({
  data,
}: {
  data: TestimonialItem[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  const autoplay = React.useRef(
    Autoplay({
      delay: 6000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  );

  React.useEffect(() => {
    if (!api) return;
    setSnaps(api.scrollSnapList());
    setSelected(api.selectedScrollSnap());

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: data.length > 1 }}
        plugins={[autoplay.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {data.map((t, i) => (
            <CarouselItem
              key={i}
              className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
            >
              <TestimonialCard data={t} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {snaps.length > 1 && (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Навигация по отзывам"
        >
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Перейти к слайду ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i
                  ? "bg-gradient-brand w-8"
                  : "bg-border hover:bg-text-muted w-1.5",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
