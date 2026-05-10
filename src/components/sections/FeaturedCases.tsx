import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaseCarousel } from "@/components/portfolio/CaseCarousel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllCases } from "@/lib/portfolio";

export function FeaturedCases() {
  const cases = getAllCases();
  if (cases.length === 0) return null;

  return (
    <section id="cases" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Портфолио"
            title="Избранные проекты"
          />
          <Link
            href="/portfolio"
            className="group/all text-text-primary hover:text-brand-violet inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Все кейсы
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 md:mt-14">
          <CaseCarousel cases={cases} />
        </div>
      </Container>
    </section>
  );
}
