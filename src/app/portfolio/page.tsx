import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import { getAllCases, getCategories } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Подборка наших проектов — от лендингов и Telegram-ботов до мобильных приложений и SaaS-продуктов.",
};

export default function PortfolioListPage() {
  const cases = getAllCases();
  const categories = getCategories();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="bg-brand-violet pointer-events-none absolute -top-32 -left-24 size-[480px] rounded-full opacity-25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="bg-brand-pink pointer-events-none absolute -right-24 top-32 size-[420px] rounded-full opacity-25 blur-[120px]"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-brand-violet text-xs font-semibold uppercase tracking-[0.22em]">
              Кейсы · {cases.length}
            </p>
            <h1
              className="font-heading mt-4 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              <GradientText className="animate-gradient bg-[length:200%_200%]">
                Наши работы
              </GradientText>
            </h1>
            <p className="text-text-secondary mt-5 max-w-2xl mx-auto text-base md:text-lg">
              Подборка проектов разных индустрий и масштабов. От ранних MVP до
              многолетних продуктов.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <ScrollReveal>
        <section className="pb-20 md:pb-28">
          <Container>
            <PortfolioGrid cases={cases} categories={categories} />
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
  );
}
