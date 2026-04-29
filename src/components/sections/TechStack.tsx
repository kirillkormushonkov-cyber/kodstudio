"use client";

import * as React from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Tech = {
  name: string;
  abbr: string;
  /** Tailwind gradient classes for the icon background. */
  color: string;
};

const STACK: Record<string, Tech[]> = {
  frontend: [
    { name: "React", abbr: "R", color: "from-cyan-400 to-cyan-600" },
    { name: "Next.js", abbr: "N", color: "from-zinc-700 to-zinc-900" },
    { name: "TypeScript", abbr: "TS", color: "from-blue-500 to-blue-700" },
    { name: "Tailwind", abbr: "Tw", color: "from-sky-500 to-cyan-600" },
    { name: "Vue", abbr: "V", color: "from-emerald-400 to-emerald-600" },
    { name: "Svelte", abbr: "Sv", color: "from-orange-500 to-red-600" },
    { name: "Astro", abbr: "As", color: "from-violet-500 to-purple-700" },
    { name: "Vite", abbr: "Vi", color: "from-amber-400 to-amber-600" },
  ],
  backend: [
    { name: "Node.js", abbr: "N", color: "from-emerald-500 to-emerald-700" },
    { name: "PostgreSQL", abbr: "PG", color: "from-blue-500 to-indigo-700" },
    { name: "tRPC", abbr: "tR", color: "from-blue-400 to-indigo-600" },
    { name: "Redis", abbr: "Rd", color: "from-red-500 to-red-700" },
    { name: "GraphQL", abbr: "GQ", color: "from-pink-500 to-rose-600" },
    { name: "Prisma", abbr: "Pr", color: "from-indigo-500 to-indigo-700" },
    { name: "Supabase", abbr: "Su", color: "from-emerald-400 to-green-600" },
    { name: "Hono", abbr: "Ho", color: "from-orange-400 to-rose-500" },
  ],
  mobile: [
    { name: "React Native", abbr: "RN", color: "from-cyan-400 to-cyan-600" },
    { name: "Expo", abbr: "Ex", color: "from-zinc-800 to-zinc-950" },
    { name: "Swift", abbr: "Sw", color: "from-orange-500 to-orange-700" },
    { name: "Kotlin", abbr: "Kt", color: "from-violet-500 to-purple-700" },
    { name: "Flutter", abbr: "Fl", color: "from-sky-400 to-blue-600" },
    { name: "Capacitor", abbr: "Ca", color: "from-blue-500 to-cyan-600" },
    { name: "iOS SDK", abbr: "iOS", color: "from-zinc-600 to-zinc-800" },
    { name: "Android", abbr: "An", color: "from-green-500 to-green-700" },
  ],
  devops: [
    { name: "Docker", abbr: "Dk", color: "from-sky-500 to-blue-700" },
    { name: "Kubernetes", abbr: "K8", color: "from-blue-500 to-indigo-700" },
    { name: "AWS", abbr: "AW", color: "from-amber-500 to-orange-600" },
    { name: "Vercel", abbr: "▲", color: "from-zinc-700 to-zinc-950" },
    { name: "GitHub Actions", abbr: "GA", color: "from-zinc-700 to-zinc-900" },
    { name: "Terraform", abbr: "Tf", color: "from-violet-500 to-purple-700" },
    { name: "Cloudflare", abbr: "Cf", color: "from-orange-400 to-orange-600" },
    { name: "Sentry", abbr: "Se", color: "from-purple-500 to-violet-700" },
  ],
  design: [
    { name: "Figma", abbr: "Fg", color: "from-rose-400 to-violet-600" },
    { name: "Framer", abbr: "Fr", color: "from-blue-500 to-cyan-500" },
    { name: "Photoshop", abbr: "Ps", color: "from-blue-700 to-blue-900" },
    { name: "Illustrator", abbr: "Ai", color: "from-orange-500 to-amber-700" },
    { name: "After Effects", abbr: "Ae", color: "from-violet-700 to-purple-900" },
    { name: "Webflow", abbr: "Wf", color: "from-blue-500 to-blue-700" },
    { name: "Spline", abbr: "Sp", color: "from-fuchsia-500 to-pink-600" },
    { name: "Lottie", abbr: "Lo", color: "from-emerald-400 to-emerald-600" },
  ],
};

const TABS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
  { value: "devops", label: "DevOps" },
  { value: "design", label: "Design" },
];

function TechItem({ tech }: { tech: Tech }) {
  return (
    <div className="group/tech [perspective:1000px]">
      <div
        className={cn(
          "border-border bg-bg-elevated/50 flex size-20 flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 backdrop-blur",
          "[transform-style:preserve-3d] transition-all duration-300",
          "group-hover/tech:[transform:rotate3d(1,-1,0,12deg)] group-hover/tech:border-brand-violet/40 group-hover/tech:shadow-glow",
        )}
      >
        <span
          className={cn(
            "grid size-9 place-items-center rounded-lg bg-gradient-to-br shadow-md",
            tech.color,
          )}
          aria-hidden="true"
        >
          <span className="font-heading text-[13px] font-bold leading-none tracking-tight text-white">
            {tech.abbr}
          </span>
        </span>
        <span className="text-text-secondary text-[11px] font-medium leading-none">
          {tech.name}
        </span>
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Стек"
          title="С чем мы работаем"
          align="center"
          className="mb-12 md:mb-16"
        />

        <Tabs defaultValue="frontend" className="items-center">
          <TabsList className="mx-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((t) => (
            <TabsContent key={t.value} value={t.value} className="w-full pt-10">
              <div className="grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6 lg:gap-6">
                {STACK[t.value].map((tech) => (
                  <TechItem key={tech.name} tech={tech} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
}
