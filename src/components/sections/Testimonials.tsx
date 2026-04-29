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
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Testimonial = {
  rating: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Tailwind gradient for the avatar fallback. */
  avatarColor: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    rating: 5,
    quote:
      "Сайт собрали за 3 недели — конверсия выросла в 2.5 раза без новых вложений в трафик.",
    author: "Антон Соколов",
    role: "CMO",
    company: "Acme Capital",
    avatarColor: "from-brand-violet to-brand-purple",
  },
  {
    rating: 5,
    quote:
      "Прозрачный процесс и реальная экспертиза. Telegram-бот окупился за первый месяц работы.",
    author: "Мария Кравцова",
    role: "CEO",
    company: "Nimbus Pizza",
    avatarColor: "from-brand-pink to-brand-magenta",
  },
  {
    rating: 5,
    quote:
      "Команда взяла продукт под ключ и довела до релиза в сторах быстрее обещанных сроков.",
    author: "Денис Орлов",
    role: "CTO",
    company: "Pulse Fit",
    avatarColor: "from-brand-purple to-brand-violet",
  },
  {
    rating: 5,
    quote:
      "Инженерная зрелость и дизайн на уровне крупных продуктовых студий. Рекомендую без оговорок.",
    author: "Ольга Белова",
    role: "Product Lead",
    company: "Strata Insights",
    avatarColor: "from-brand-magenta to-brand-pink",
  },
  {
    rating: 5,
    quote:
      "Дашборд получился быстрым и понятным. Команда сама предлагает решения, а не ждёт ТЗ.",
    author: "Игорь Левин",
    role: "Founder",
    company: "Halo Analytics",
    avatarColor: "from-brand-violet to-brand-pink",
  },
  {
    rating: 5,
    quote:
      "Качество кода и документации впечатляет. Поддержку и развитие забрали к себе на год.",
    author: "Елена Тарасова",
    role: "Head of Product",
    company: "Lumen Group",
    avatarColor: "from-brand-purple to-brand-magenta",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Оценка ${count} из 5`}>
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

function TestimonialCard({ data }: { data: Testimonial }) {
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
            <p className="text-text-muted text-xs">
              {data.role} · {data.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  const autoplay = React.useRef(
    Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false }),
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
    <section id="testimonials" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          align="center"
          className="mb-12 md:mb-16"
        />

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem
                key={i}
                className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
              >
                <TestimonialCard data={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
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
      </Container>
    </section>
  );
}
