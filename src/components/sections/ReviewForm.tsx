"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Check, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(100),
  position: z.string().trim().max(100).optional(),
  company: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  rating: z.number().int().min(1, "Поставьте оценку").max(5),
  text: z.string().trim().min(30, "Минимум 30 символов").max(2000),
  email: z.string().email("Введите корректный email"),
});

type FormValues = z.infer<typeof schema>;

const FIELD_BASE =
  "border-border bg-bg-elevated/40 text-text-primary placeholder:text-text-muted focus:border-brand-violet/60 focus:ring-brand-violet/30 w-full rounded-xl border px-4 text-sm outline-none transition-colors focus:ring-2";

const LABEL =
  "text-text-muted text-xs font-semibold tracking-wider uppercase";

export function ReviewForm({ siteKey }: { siteKey?: string }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const captchaRef = React.useRef<HTMLDivElement>(null);
  const captchaIdRef = React.useRef<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      position: "",
      company: "",
      phone: "",
      rating: 0,
      text: "",
      email: "",
    },
  });

  // Inject Turnstile script + render the widget once.
  React.useEffect(() => {
    if (!siteKey) return;

    const renderWidget = () => {
      if (
        !window.turnstile ||
        !captchaRef.current ||
        captchaIdRef.current
      ) {
        return;
      }
      captchaIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (t) => setToken(t),
        "error-callback": () => setToken(null),
        "expired-callback": () => setToken(null),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", renderWidget);
      return () => existing.removeEventListener("load", renderWidget);
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.head.appendChild(script);
  }, [siteKey]);

  const onSubmit = async (values: FormValues) => {
    if (siteKey && !token) {
      toast.error("Подтвердите, что вы не робот");
      return;
    }
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: "",
          turnstileToken: token ?? "",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Server error");
      }
      setSubmitted(true);
      reset();
      if (window.turnstile && captchaIdRef.current) {
        window.turnstile.reset(captchaIdRef.current);
      }
      setToken(null);
    } catch {
      toast.error("Не удалось отправить. Попробуйте позже.");
    }
  };

  if (submitted) {
    return (
      <div className="border-brand-violet/15 bg-bg-elevated/60 mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border p-8 text-center backdrop-blur md:p-10">
        <div className="bg-brand-violet/15 grid size-12 place-items-center rounded-full">
          <Check className="text-brand-pink size-6" />
        </div>
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          Спасибо за отзыв!
        </h3>
        <p className="text-text-secondary text-sm">
          Опубликуем после короткой модерации — обычно в течение суток.
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setSubmitted(false)}
        >
          Оставить ещё один
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-brand-violet/15 bg-bg-elevated/60 relative mx-auto max-w-4xl rounded-3xl border p-6 backdrop-blur md:p-8"
    >
      <h3 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
        Оставить свой отзыв
      </h3>
      <p className="text-text-muted mt-1 text-sm">
        Опубликуем после короткой модерации. Email не показываем — нужен только
        для связи.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className={LABEL}>Имя*</label>
          <input
            {...register("name")}
            className={cn(FIELD_BASE, "mt-2 h-11")}
            placeholder="Иван Иванов"
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className={LABEL}>Email*</label>
          <input
            {...register("email")}
            type="email"
            className={cn(FIELD_BASE, "mt-2 h-11")}
            placeholder="ivan@mail.ru"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className={LABEL}>Телефон</label>
          <input
            {...register("phone")}
            type="tel"
            className={cn(FIELD_BASE, "mt-2 h-11")}
            placeholder="+7 900 000 00 00"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className={LABEL}>Должность / роль</label>
          <input
            {...register("position")}
            className={cn(FIELD_BASE, "mt-2 h-11")}
            placeholder="Менеджер, фрилансер..."
            autoComplete="organization-title"
          />
        </div>
        <div>
          <label className={LABEL}>Компания / проект</label>
          <input
            {...register("company")}
            className={cn(FIELD_BASE, "mt-2 h-11")}
            placeholder="Название компании"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <label className={LABEL}>Отзыв*</label>
          <textarea
            {...register("text")}
            rows={4}
            className={cn(FIELD_BASE, "mt-2 resize-none py-3")}
            placeholder="Расскажите про опыт работы — что понравилось, что получилось"
          />
          {errors.text && (
            <p className="mt-1 text-xs text-red-400">{errors.text.message}</p>
          )}
        </div>

        <div>
          <label className={LABEL}>Оценка*</label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <div
                className="mt-2 flex gap-1"
                role="radiogroup"
                aria-label="Оценка"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={field.value === n}
                    aria-label={`Оценка ${n} из 5`}
                    onClick={() => field.onChange(n)}
                    className="rounded p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/50"
                  >
                    <Star
                      className={cn(
                        "size-7",
                        n <= field.value
                          ? "fill-brand-pink text-brand-pink"
                          : "text-border",
                      )}
                    />
                  </button>
                ))}
              </div>
            )}
          />
          {errors.rating && (
            <p className="mt-1 text-xs text-red-400">{errors.rating.message}</p>
          )}
        </div>
      </div>

      {/* Honeypot — invisible to humans, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          Сайт
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {siteKey ? (
          <div ref={captchaRef} className="mx-auto" />
        ) : (
          <p className="text-text-muted text-xs flex-1">
            Капча не настроена (нет <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>) —
            отзывы принимаются без неё. Не для прода.
          </p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем…" : "Отправить отзыв"}
        </Button>
      </div>
    </form>
  );
}
