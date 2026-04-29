"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPES = [
  { value: "web", label: "Сайт", description: "Лендинг, корпоративный, e-commerce" },
  { value: "saas", label: "SaaS", description: "Веб-приложение для подписки" },
  { value: "bot", label: "Telegram-бот", description: "Автоматизация и Mini App" },
  { value: "mobile", label: "Mobile", description: "iOS / Android приложение" },
  { value: "design", label: "Дизайн", description: "Брендинг и UI/UX" },
  { value: "other", label: "Другое", description: "Опишем в комментарии" },
] as const;

const BUDGETS = [
  "до 300 000 ₽",
  "300 000 — 700 000 ₽",
  "700 000 — 1 500 000 ₽",
  "от 1 500 000 ₽",
] as const;

const TIMELINES = [
  "ASAP — горит",
  "1-2 месяца",
  "3-6 месяцев",
  "Не ограничено",
] as const;

const schema = z.object({
  type: z.array(z.string()).min(1, "Выберите хотя бы один вариант"),
  budget: z.string().min(1, "Выберите бюджет"),
  timeline: z.string().min(1, "Выберите сроки"),
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  telegram: z.string().optional(),
  description: z.string().min(10, "Минимум 10 символов"),
});

type FormValues = z.infer<typeof schema>;

const STEP_FIELDS: ReadonlyArray<readonly (keyof FormValues)[]> = [
  ["type"],
  ["budget"],
  ["timeline"],
  ["name", "email", "description"],
] as const;

const STEP_LABELS = ["Тип проекта", "Бюджет", "Сроки", "Контакты"];

export function BriefForm() {
  const [step, setStep] = React.useState(0);
  const totalSteps = STEP_LABELS.length;

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: [],
      budget: "",
      timeline: "",
      name: "",
      email: "",
      telegram: "",
      description: "",
    },
  });

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step] as (keyof FormValues)[]);
    if (ok) setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Server error");
      toast.success("Заявка отправлена! Свяжемся в течение 24 часов.");
      reset();
      setStep(0);
    } catch {
      toast.error("Не удалось отправить. Попробуйте позже или напишите в Telegram.");
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-brand-violet/15 bg-bg-elevated/60 rounded-3xl border p-6 backdrop-blur md:p-8"
    >
      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-text-secondary font-medium">
          Шаг {step + 1} из {totalSteps}
        </span>
        <span className="text-text-muted">{STEP_LABELS[step]}</span>
      </div>
      <div
        className="bg-bg-overlay h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="bg-gradient-brand h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative mt-8 min-h-[280px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div>
                <h3 className="font-heading text-text-primary text-lg font-semibold">
                  Какой проект планируете?
                </h3>
                <p className="text-text-muted mt-1 text-xs">
                  Можно выбрать несколько
                </p>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {TYPES.map((t) => {
                        const selected = field.value?.includes(t.value);
                        return (
                          <button
                            type="button"
                            key={t.value}
                            onClick={() => {
                              const next = selected
                                ? field.value.filter((v) => v !== t.value)
                                : [...(field.value ?? []), t.value];
                              field.onChange(next);
                            }}
                            className={cn(
                              "relative rounded-xl border p-4 text-left transition-all",
                              selected
                                ? "border-brand-violet bg-bg-overlay shadow-brand"
                                : "border-border bg-bg-base/40 hover:border-brand-violet/40 hover:bg-bg-overlay/60",
                            )}
                          >
                            {selected && (
                              <span className="bg-gradient-brand absolute right-3 top-3 grid size-5 place-items-center rounded-full">
                                <Check className="size-3 text-white" />
                              </span>
                            )}
                            <span className="text-text-primary block text-sm font-semibold">
                              {t.label}
                            </span>
                            <span className="text-text-muted mt-1 block text-xs">
                              {t.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.type && (
                  <p role="alert" className="mt-2 text-xs text-rose-400">
                    {errors.type.message}
                  </p>
                )}
              </div>
            )}

            {step === 1 && (
              <PillsStep
                title="Какой бюджет?"
                hint="Это поможет предложить адекватное решение"
                error={errors.budget?.message}
                control={control}
                name="budget"
                options={BUDGETS}
              />
            )}

            {step === 2 && (
              <PillsStep
                title="Когда нужно?"
                hint="Если горит — сделаем в ускоренном режиме"
                error={errors.timeline?.message}
                control={control}
                name="timeline"
                options={TIMELINES}
              />
            )}

            {step === 3 && (
              <div>
                <h3 className="font-heading text-text-primary text-lg font-semibold">
                  Как с вами связаться?
                </h3>
                <p className="text-text-muted mt-1 text-xs">
                  Ответим в течение 24 часов
                </p>
                <div className="mt-5 grid gap-3">
                  <FieldText
                    label="Имя"
                    error={errors.name?.message}
                    {...register("name")}
                    autoComplete="name"
                  />
                  <FieldText
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                    autoComplete="email"
                  />
                  <FieldText
                    label="Telegram (необязательно)"
                    error={errors.telegram?.message}
                    placeholder="@username"
                    {...register("telegram")}
                  />
                  <div>
                    <label className="text-text-secondary mb-1.5 block text-xs font-semibold tracking-wider uppercase">
                      Опишите задачу
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      placeholder="Что нужно сделать, какие цели, ограничения…"
                      aria-invalid={errors.description ? true : undefined}
                      className={cn(
                        "border-border bg-bg-base/60 text-text-primary placeholder:text-text-muted focus:border-brand-violet/60 focus:ring-brand-violet/30 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2",
                        errors.description &&
                          "border-rose-500/60 focus:ring-rose-500/30",
                      )}
                    />
                    {errors.description && (
                      <p role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={back}
          disabled={step === 0}
          leftIcon={<ArrowLeft />}
        >
          Назад
        </Button>
        {step < totalSteps - 1 ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={next}
            rightIcon={<ArrowRight />}
          >
            Далее
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            rightIcon={<ArrowRight />}
          >
            Отправить заявку
          </Button>
        )}
      </div>
    </form>
  );
}

// ─── helpers ──────────────────────────────────────────────────────

type ControlType = ReturnType<typeof useForm<FormValues>>["control"];

function PillsStep({
  title,
  hint,
  error,
  control,
  name,
  options,
}: {
  title: string;
  hint: string;
  error?: string;
  control: ControlType;
  name: "budget" | "timeline";
  options: ReadonlyArray<string>;
}) {
  return (
    <div>
      <h3 className="font-heading text-text-primary text-lg font-semibold">
        {title}
      </h3>
      <p className="text-text-muted mt-1 text-xs">{hint}</p>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="mt-5 flex flex-wrap gap-2">
            {options.map((o) => {
              const selected = field.value === o;
              return (
                <button
                  type="button"
                  key={o}
                  onClick={() => field.onChange(o)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    selected
                      ? "bg-gradient-brand text-white shadow-brand"
                      : "border-border bg-bg-base/40 text-text-secondary hover:bg-bg-overlay hover:text-text-primary border",
                  )}
                >
                  {o}
                </button>
              );
            })}
          </div>
        )}
      />
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

const FieldText = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  }
>(({ label, error, className, ...props }, ref) => (
  <div>
    <label className="text-text-secondary mb-1.5 block text-xs font-semibold tracking-wider uppercase">
      {label}
    </label>
    <input
      ref={ref}
      aria-invalid={error ? true : undefined}
      className={cn(
        "border-border bg-bg-base/60 text-text-primary placeholder:text-text-muted focus:border-brand-violet/60 focus:ring-brand-violet/30 h-11 w-full rounded-xl border px-4 text-sm outline-none focus:ring-2",
        error && "border-rose-500/60 focus:ring-rose-500/30",
        className,
      )}
      {...props}
    />
    {error && (
      <p role="alert" className="mt-1.5 text-xs text-rose-400">
        {error}
      </p>
    )}
  </div>
));
FieldText.displayName = "FieldText";
