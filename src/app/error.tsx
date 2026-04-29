"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <main className="relative flex flex-1 items-center overflow-hidden py-20 md:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="font-heading font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 144px)" }}
          >
            <GradientText>500</GradientText>
          </p>
          <h1 className="font-heading text-text-primary mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            Что-то пошло не так
          </h1>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-base">
            Мы уже знаем об ошибке и разбираемся. Попробуйте ещё раз — иногда
            помогает.
          </p>
          {error.digest && (
            <p className="text-text-muted mt-2 text-xs">
              ID ошибки: {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => reset()} size="lg">
              Попробовать снова
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              На главную
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
