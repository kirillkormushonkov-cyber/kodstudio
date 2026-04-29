export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  /** Tailwind gradient classes used for the cover placeholder. */
  gradient: string;
  stack: string[];
};

export const CASES: CaseStudy[] = [
  {
    slug: "fintech-platform",
    title: "Финтех-платформа для малого бизнеса",
    client: "Acme Capital",
    category: "Веб-приложение",
    gradient: "from-brand-violet via-brand-purple to-brand-magenta",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
  },
  {
    slug: "telegram-pizza",
    title: "Telegram-бот для сети пиццерий",
    client: "Nimbus Pizza",
    category: "Telegram-бот",
    gradient: "from-brand-pink via-brand-magenta to-brand-violet",
    stack: ["Node.js", "grammY", "Redis", "Stripe"],
  },
  {
    slug: "mobile-fitness",
    title: "Фитнес-приложение iOS / Android",
    client: "Pulse Fit",
    category: "Mobile",
    gradient: "from-brand-violet to-brand-pink",
    stack: ["React Native", "Expo", "Supabase"],
  },
  {
    slug: "saas-analytics",
    title: "SaaS-аналитика для e-commerce",
    client: "Strata Insights",
    category: "SaaS",
    gradient: "from-brand-purple via-brand-violet to-brand-magenta",
    stack: ["Next.js", "ClickHouse", "tRPC", "Stripe"],
  },
];
