"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z
    .string()
    .min(1, "Введите email")
    .email("Введите корректный email"),
});

type FormValues = z.infer<typeof schema>;

export function CTASection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (_values: FormValues) => {
    // Replace with real submission later.
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Спасибо! Свяжемся в течение 24 часов.");
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <div className="border-brand-violet/20 bg-bg-elevated relative overflow-hidden rounded-3xl border p-10 md:p-16">
          {/* Hero gradient base — приглушённый */}
          <div
            aria-hidden="true"
            className="bg-gradient-hero pointer-events-none absolute inset-0 opacity-80"
          />
          {/* Brand glow blobs */}
          <div
            aria-hidden="true"
            className="bg-brand-violet pointer-events-none absolute -top-32 -left-24 size-72 rounded-full opacity-25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="bg-brand-pink pointer-events-none absolute -right-24 -bottom-32 size-72 rounded-full opacity-25 blur-3xl"
          />
          {/* Noise */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
          >
            <filter id="cta-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#cta-noise)" />
          </svg>

          {/* Decorative K squircle */}
          <div
            aria-hidden="true"
            className="bg-gradient-brand shadow-brand absolute -top-6 -right-6 grid size-28 rotate-12 place-items-center rounded-[28%] opacity-90 md:size-32"
          >
            <span className="font-heading text-5xl leading-none font-bold text-white md:text-6xl">
              K
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-text-primary text-3xl font-bold tracking-tight md:text-5xl">
              Готовы запустить ваш проект?
            </h2>
            <p className="text-text-secondary mt-4 text-base md:text-lg">
              Бесплатная консультация. Расчёт за 24 часа.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email
                </label>
                <input
                  id="cta-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? "cta-email-error" : undefined
                  }
                  {...register("email")}
                  className={cn(
                    "border-border bg-bg-base/60 text-text-primary placeholder:text-text-muted focus:border-brand-violet/60 focus:ring-brand-violet/30 h-14 w-full rounded-xl border px-5 text-base outline-none backdrop-blur transition-colors focus:ring-2",
                    errors.email && "border-rose-500/60 focus:ring-rose-500/30",
                  )}
                />
                {errors.email && (
                  <p
                    id="cta-email-error"
                    role="alert"
                    className="mt-1.5 text-left text-xs text-rose-400"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                loading={isSubmitting}
                rightIcon={<ArrowRight />}
              >
                Обсудить
              </Button>
            </form>

            <p className="text-text-muted mt-4 text-xs">
              Отправляя, вы соглашаетесь с{" "}
              <Link
                href="/privacy"
                className="hover:text-text-primary underline underline-offset-2 transition-colors"
              >
                политикой
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
