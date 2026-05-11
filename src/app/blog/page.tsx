import type { Metadata } from "next";

import { BlogList } from "@/components/blog/BlogList";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/system/ScrollReveal";
import { WordsReveal } from "@/components/system/WordsReveal";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Заметки команды KodStudio о дизайне, разработке и продуктовом подходе.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="flex-1">
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
            <p className="text-brand-violet text-xs font-semibold tracking-[0.22em] uppercase">
              Блог · {posts.length}
            </p>
            <h1
              className="font-heading mt-4 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              <WordsReveal
                text="Заметки команды"
                startDelay={0.15}
                fromX={-420}
                fromY={0}
                wordClassName="bg-gradient-brand bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
              />
            </h1>
            <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-base md:text-lg">
              Делимся своим опытом — от инженерных решений до продуктовых
              наблюдений. Без воды.
            </p>
          </div>
        </Container>
      </section>

      <ScrollReveal>
        <section className="pb-20 md:pb-28">
          <Container>
            <BlogList posts={posts} tags={tags} />
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </main>
  );
}
