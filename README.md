# KodStudio

Сайт веб-студии: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.
Контент блога и портфолио — MDX. SEO, sitemap, robots, JSON-LD, динамические OG —
из коробки.

## Стек

- **Next.js 16** (Turbopack) + React 19, TypeScript strict
- **Tailwind CSS v4** + `@tailwindcss/postcss`, кастомная brand-палитра в `tailwind.config.ts`
- **shadcn/ui** (preset `base-nova`, на `@base-ui/react`) — Tabs, Carousel, Accordion
- **framer-motion 12** + **lenis** — анимации + smooth scroll
- **next-mdx-remote/rsc** + **rehype-pretty-code** (shiki) + **remark-gfm** + **rehype-slug** — MDX
- **react-hook-form** + **zod** — формы и валидация
- **sonner** — toasts, **lucide-react** — иконки

## Quick start

```bash
pnpm install
pnpm dev              # http://localhost:3000

pnpm build            # production build
pnpm start            # serve production build
pnpm type-check       # tsc --noEmit
pnpm lint             # eslint
pnpm format           # prettier --write .
```

## Переменные окружения

Создайте `.env.local` в корне:

```bash
# Базовый URL — попадает в metadataBase, OG, sitemap, robots, JSON-LD
NEXT_PUBLIC_SITE_URL=https://kodstudio.dev

# Webhook для приёма брифа из формы /contacts
# При сабмите формы /api/brief шлёт payload + форматированное Telegram-сообщение
# Если переменная не задана — заявка просто логируется в консоль (для разработки)
BRIEF_WEBHOOK_URL=https://example.com/your-webhook
```

`.env.local` уже в `.gitignore` — не коммитьте секреты.

## Деплой на Vercel

1. Залейте репозиторий на GitHub
2. На [vercel.com/new](https://vercel.com/new) импортируйте репозиторий
3. Vercel автоматически определит Next.js, ничего настраивать не нужно
4. **Environment Variables** → добавьте `NEXT_PUBLIC_SITE_URL` и `BRIEF_WEBHOOK_URL` (для всех окружений: Production / Preview / Development)
5. **Deploy** — первый билд ~2 мин

После первого деплоя:
- Поменяйте `NEXT_PUBLIC_SITE_URL` на ваш реальный домен
- В DNS подключите домен через Vercel
- Динамическая OG-картинка `/og` работает на edge-runtime — на Vercel из коробки

### Альтернативно через CLI

```bash
pnpm dlx vercel link        # привязка проекта
pnpm dlx vercel env add     # добавить переменные
pnpm dlx vercel --prod      # деплой
```

## Структура проекта

```
content/
├── blog/                      # MDX-статьи (frontmatter + Markdown + Callout)
└── portfolio/                 # MDX-кейсы (структурированный frontmatter, тело — markdown)

src/
├── app/
│   ├── layout.tsx             # шрифты, метаданные, Lenis, CustomCursor, PageTransition
│   ├── page.tsx               # главная (10 секций)
│   ├── about/                 # о студии
│   ├── blog/                  # /blog + /blog/[slug]
│   ├── portfolio/             # /portfolio + /portfolio/[slug]
│   ├── services/[slug]/       # /services/{web,bots,apps}
│   ├── contacts/              # форма-бриф
│   ├── api/brief/route.ts     # POST → webhook
│   ├── og/route.tsx           # dynamic OG (edge runtime)
│   ├── sitemap.ts             # /sitemap.xml
│   ├── robots.ts              # /robots.txt
│   ├── not-found.tsx          # 404
│   ├── error.tsx              # error boundary
│   └── loading.tsx            # дефолтный спиннер
├── components/
│   ├── ui/                    # дизайн-кит: Button, Container, Badge, GradientText,
│   │                          # SectionHeading, MagneticButton, Tabs, Carousel, Accordion
│   ├── layout/                # Header, Footer, Logo, CopyEmail, social-icons
│   ├── sections/              # секции главной (Hero, Services, Stats, Process, ...)
│   ├── blog/                  # MDXContent, Callout, TableOfContents, ShareButtons, BlogList
│   ├── portfolio/             # CaseCard, PortfolioGrid, CaseGallery (lightbox)
│   ├── contacts/              # BriefForm (4-степ), WhatsAppQR
│   ├── system/                # LenisProvider, CustomCursor, PageTransition, ScrollReveal, SkipToContent
│   └── seo/                   # JsonLd (Organization, Article)
├── lib/
│   ├── blog.ts                # server-only: чтение MDX, headings, related posts
│   ├── blog-shared.ts         # типы + formatPostDate (импортируется client-кодом)
│   ├── portfolio.ts           # server-only: чтение кейсов
│   ├── services.ts            # типизированные данные услуг
│   └── utils.ts               # cn()
└── app/globals.css            # tokens, prose-blog, focus, reduced-motion

tailwind.config.ts             # brand палитра, gradients, shadows, animations
tsconfig.json                  # strict mode
```

## Добавить статью в блог

Создайте файл `content/blog/your-slug.mdx`:

````mdx
---
title: "Заголовок статьи"
description: "Один абзац для превью и meta description"
date: 2026-05-01
cover: from-brand-violet to-brand-pink
tags: ["React", "Next.js"]
author: KodStudio
readingTime: "5 мин"
---

## Заголовок второго уровня

Основной текст.

```ts
const x = 1;
```

<Callout type="info">
  Подсказка читателю.
</Callout>
````

Поля frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `cover` (Tailwind gradient classes), `tags`, `author`, `readingTime`. Слаг = имя файла. Сортировка по `date` убыванием.

Доступные `Callout` варианты: `info`, `warning`, `success`, `tip`.

Code-блоки подсвечиваются темой `github-dark-dimmed` через rehype-pretty-code.

## Добавить кейс в портфолио

`content/portfolio/your-slug.mdx`:

```yaml
---
slug: your-slug
title: Название проекта
client: Имя клиента
category: Сайты              # фильтр на /portfolio
year: 2026
hero: from-brand-violet via-brand-purple to-brand-magenta
stack: [Next.js, TypeScript, PostgreSQL]
metrics:
  - value: "+250%"
    label: "Рост конверсии"
task: Краткое описание задачи
solution: Что сделали
result: Что получилось
gallery:
  - cover: from-brand-violet to-brand-pink
    alt: Главная страница
    aspect: "16/10"
---
```

Категории фильтра берутся из всех `category` автоматически.

## Кастомизация бренда

Все цвета, тени и анимации — в `tailwind.config.ts`:

```ts
colors: {
  brand: { violet: "#6B5BFF", purple: "#8B5CF6", magenta: "#C084FC", pink: "#E879F9" },
  bg:    { base: "#0A0A14",   elevated: "#12121F",  overlay: "#1A1A2E" },
  text:  { primary: "#F4F4F8", secondary: "#A1A1B5", muted: "#6B6B7E" },
}
```

shadcn-токены (`--background`, `--primary`, ...) маппятся на эти цвета в `src/app/globals.css`.

## Технические заметки

- **Все основные страницы** статические или SSG — деплой работает без runtime-сервера для контентных страниц
- **Edge-runtime** только у `/og` и `/api/brief`
- **Smooth scroll** через Lenis (RAF-loop). При `prefers-reduced-motion: reduce` Lenis не инициализируется
- **Custom cursor** включается только на устройствах с `pointer: fine` и без reduced-motion
- **Page transitions** автоматически отключаются при reduced-motion
- **`server-only`** на `src/lib/blog.ts` и `src/lib/portfolio.ts` — типы и форматтер вынесены в `*-shared.ts` для безопасного импорта из client-кода
