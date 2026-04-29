import Link from "next/link";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden py-20 md:py-32">
      <div
        aria-hidden="true"
        className="bg-brand-violet pointer-events-none absolute -top-32 -left-24 size-[480px] rounded-full opacity-25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-brand-pink pointer-events-none absolute -right-24 -bottom-24 size-[420px] rounded-full opacity-25 blur-[120px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="font-heading font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(96px, 18vw, 200px)" }}
          >
            <GradientText className="animate-gradient bg-[length:200%_200%]">
              404
            </GradientText>
          </p>
          <h1 className="font-heading text-text-primary mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            Страница не найдена
          </h1>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-base">
            Возможно, она была перемещена или вы перешли по неправильной ссылке.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              На главную
            </Link>
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Посмотреть кейсы
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
