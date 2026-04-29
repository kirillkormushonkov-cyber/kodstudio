import {
  BarChart3,
  Bell,
  Bot,
  Camera,
  Cloud,
  Cog,
  CreditCard,
  Database,
  Globe,
  Layers,
  Map,
  MessageSquare,
  Search,
  ShieldCheck,
  Smartphone,
  Tablet,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import type * as React from "react";

export type IconType = React.ComponentType<{ className?: string }>;

export type ServiceFeature = {
  icon: IconType;
  title: string;
  description: string;
};

export type ServiceTariff = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export type ServiceFaqItem = { q: string; a: string };

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceTech = {
  name: string;
  abbr: string;
  color: string;
};

export type ServiceSlug = "web" | "bots" | "apps";

export type Service = {
  slug: ServiceSlug;
  category: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  tech: ServiceTech[];
  process: ServiceProcessStep[];
  tariffs: ServiceTariff[];
  faq: ServiceFaqItem[];
};

const WEB: Service = {
  slug: "web",
  category: "Сайты и веб-приложения",
  title: "Сайты под ключ",
  description:
    "Лендинги, корпоративные сайты, e-commerce и SaaS-приложения. Дизайн, разработка, контент и аналитика — собираем под бизнес-задачу.",
  features: [
    { icon: Layers, title: "UX-проектирование", description: "Сценарии, прототипы и тесты на пользователях." },
    { icon: Zap, title: "Скорость 90+ CWV", description: "Core Web Vitals в зелёной зоне с первого деплоя." },
    { icon: Search, title: "SEO-фундамент", description: "Структура, метаданные, sitemap, schema.org." },
    { icon: BarChart3, title: "Аналитика", description: "Яндекс.Метрика, GA4, события и воронки." },
    { icon: ShieldCheck, title: "Безопасность", description: "HTTPS, CSP, защита от XSS и SQL-инъекций." },
    { icon: Globe, title: "i18n", description: "Мультиязычность и геолокация из коробки." },
  ],
  tech: [
    { name: "Next.js", abbr: "N", color: "from-zinc-700 to-zinc-900" },
    { name: "React", abbr: "R", color: "from-cyan-400 to-cyan-600" },
    { name: "TypeScript", abbr: "TS", color: "from-blue-500 to-blue-700" },
    { name: "Tailwind", abbr: "Tw", color: "from-sky-500 to-cyan-600" },
    { name: "PostgreSQL", abbr: "PG", color: "from-blue-500 to-indigo-700" },
    { name: "Vercel", abbr: "▲", color: "from-zinc-700 to-zinc-950" },
    { name: "Sanity", abbr: "Sa", color: "from-rose-400 to-rose-600" },
    { name: "Stripe", abbr: "St", color: "from-violet-500 to-purple-700" },
  ],
  process: [
    { step: "01", title: "Бриф и стратегия", description: "Узнаём цели бизнеса, аудиторию, метрики. Согласуем scope и сроки." },
    { step: "02", title: "Дизайн-концепция", description: "UX-карта, прототипы экранов, визуальный язык в Figma." },
    { step: "03", title: "Разработка", description: "Frontend, backend, CMS под редактуру, интеграции с CRM и оплатами." },
    { step: "04", title: "QA и запуск", description: "Тестирование, оптимизация, деплой, аналитика и поддержка." },
  ],
  tariffs: [
    {
      name: "Start",
      price: "от 250 000 ₽",
      description: "Лендинг или небольшой корпоративный сайт",
      features: ["До 5 страниц", "Адаптивный дизайн", "Базовое SEO", "Подключение метрики", "1 месяц поддержки"],
      cta: "Запустить проект",
    },
    {
      name: "Pro",
      price: "от 600 000 ₽",
      description: "Для бизнеса с продуктовым подходом",
      features: ["До 20 страниц", "Кастомный UI и анимация", "CMS для редакторов", "Многоязычность", "Расширенная аналитика", "3 месяца поддержки"],
      popular: true,
      cta: "Обсудить проект",
    },
    {
      name: "Custom",
      price: "от 1 200 000 ₽",
      description: "Индивидуальные задачи и большой scope",
      features: ["Без ограничений по страницам", "Дизайн-система", "Backend и интеграции", "Performance & a11y аудит", "Год поддержки и SLA", "Выделенная команда"],
      cta: "Запросить смету",
    },
  ],
  faq: [
    { q: "Сколько времени занимает разработка?", a: "Лендинг — 3-4 недели. Корпоративный сайт — 6-8 недель. SaaS-проекты — от 3 месяцев. Точные сроки даём после бриф-сессии." },
    { q: "Можно ли вносить правки после релиза?", a: "Да. В любом тарифе есть период поддержки, дальше работаем по часовому или фиксированному ретейнеру." },
    { q: "Передаёте ли вы исходный код?", a: "Да, в полном объёме. Репозиторий передаётся клиенту с самого начала, мы работаем в нём как контракторы." },
    { q: "Делаете ли редизайн?", a: "Да. Начинаем с UX-аудита и проверки метрик, дальше — поэтапная замена страниц без даунтайма." },
    { q: "Поможете с контентом?", a: "Подключим копирайтера и SEO-специалиста при необходимости. Это отдельная услуга поверх тарифа." },
    { q: "Какие гарантии?", a: "Фиксируем SLA на скорость, доступность и время ответа на инциденты в договоре." },
  ],
};

const BOTS: Service = {
  slug: "bots",
  category: "Telegram-боты и автоматизация",
  title: "Telegram-боты под задачу",
  description:
    "Автоматизация продаж, рассылок и поддержки. Mini Apps и интеграции с CRM, платежами и любыми API.",
  features: [
    { icon: CreditCard, title: "Приём оплат", description: "Stripe, ЮKassa, СБП и Telegram Payments из коробки." },
    { icon: Database, title: "CRM-интеграции", description: "amoCRM, Bitrix24, AmoCRM API, Notion, Airtable." },
    { icon: Webhook, title: "Webhooks и API", description: "Любые HTTP-источники, очереди, фоновые задачи." },
    { icon: MessageSquare, title: "Mini Apps", description: "Полноценные приложения внутри Telegram WebApp." },
    { icon: Users, title: "Сегментация и рассылки", description: "Триггерные сообщения, A/B-тесты, аналитика воронок." },
    { icon: Cog, title: "Админ-панель", description: "Управление контентом, заказами и пользователями." },
  ],
  tech: [
    { name: "Node.js", abbr: "N", color: "from-emerald-500 to-emerald-700" },
    { name: "TypeScript", abbr: "TS", color: "from-blue-500 to-blue-700" },
    { name: "grammY", abbr: "gY", color: "from-amber-400 to-amber-600" },
    { name: "Redis", abbr: "Rd", color: "from-red-500 to-red-700" },
    { name: "PostgreSQL", abbr: "PG", color: "from-blue-500 to-indigo-700" },
    { name: "Prisma", abbr: "Pr", color: "from-indigo-500 to-indigo-700" },
    { name: "BullMQ", abbr: "Bm", color: "from-rose-500 to-pink-600" },
    { name: "Stripe", abbr: "St", color: "from-violet-500 to-purple-700" },
  ],
  process: [
    { step: "01", title: "Сценарии диалога", description: "Разбираем пользовательские пути и пишем сценарии общения с ботом." },
    { step: "02", title: "Архитектура и интеграции", description: "Согласуем CRM, платежи, источники данных и фоновые задачи." },
    { step: "03", title: "Разработка и тесты", description: "Пишем бота, админ-панель и Mini App, прогоняем сценарии." },
    { step: "04", title: "Запуск и поддержка", description: "Деплой, мониторинг, метрики, итерации по обратной связи." },
  ],
  tariffs: [
    {
      name: "Start",
      price: "от 120 000 ₽",
      description: "Простой бот: каталог, заявки, уведомления",
      features: ["До 10 сценариев", "Базовая аналитика", "1 интеграция (CRM или платёж)", "1 месяц поддержки"],
      cta: "Запустить бота",
    },
    {
      name: "Pro",
      price: "от 350 000 ₽",
      description: "Полноценный продукт с воронками и оплатами",
      features: ["Mini App", "Платежи и подписки", "До 3 интеграций", "Админ-панель", "A/B-тесты", "3 месяца поддержки"],
      popular: true,
      cta: "Обсудить проект",
    },
    {
      name: "Custom",
      price: "по запросу",
      description: "Высокая нагрузка и сложные интеграции",
      features: ["SLA на отклик", "Очереди и шардинг", "Кастомные интеграции", "Мониторинг и алерты", "Год поддержки"],
      cta: "Запросить смету",
    },
  ],
  faq: [
    { q: "Сколько времени занимает разработка бота?", a: "Простой бот — 2-3 недели. Mini App с оплатами — 4-6 недель. Сложные интеграции — от 2 месяцев." },
    { q: "Можно ли мигрировать на бот существующую CRM?", a: "Да, поддерживаем amoCRM, Bitrix24, HubSpot и любые системы с публичным API." },
    { q: "Где хостится бот?", a: "По умолчанию — на наших VPS с мониторингом. Можем развернуть в инфраструктуре клиента." },
    { q: "Поддерживаете ли Telegram Mini Apps?", a: "Да, делаем как полноценные приложения с использованием Telegram WebApp SDK." },
    { q: "Кто отвечает за модерацию контента?", a: "Можем взять на себя или передать редактору через админ-панель." },
    { q: "Какие гарантии стабильности?", a: "Мониторим uptime, ставим алерты, держим SLA по согласованию." },
  ],
};

const APPS: Service = {
  slug: "apps",
  category: "Мобильные приложения",
  title: "Мобильные приложения iOS и Android",
  description:
    "Нативные и кросс-платформенные приложения. От MVP до публикации в сторах. Поддержка и обновления после релиза.",
  features: [
    { icon: Smartphone, title: "iOS и Android", description: "Нативно на Swift / Kotlin или кросс-платформа." },
    { icon: Tablet, title: "Адаптация под планшеты", description: "Полноценные UI для iPad, foldable и Android-планшетов." },
    { icon: Bell, title: "Push и уведомления", description: "FCM, APNs, локальные уведомления, deep links." },
    { icon: Map, title: "Карты и геолокация", description: "MapKit, Google Maps, маршруты и фоновые задачи." },
    { icon: Camera, title: "Камера и медиа", description: "Сканирование документов, AR, обработка изображений." },
    { icon: Cloud, title: "Облако и оффлайн", description: "Sync, кеш и работа без сети по принципу offline-first." },
  ],
  tech: [
    { name: "React Native", abbr: "RN", color: "from-cyan-400 to-cyan-600" },
    { name: "Expo", abbr: "Ex", color: "from-zinc-800 to-zinc-950" },
    { name: "Swift", abbr: "Sw", color: "from-orange-500 to-orange-700" },
    { name: "Kotlin", abbr: "Kt", color: "from-violet-500 to-purple-700" },
    { name: "TypeScript", abbr: "TS", color: "from-blue-500 to-blue-700" },
    { name: "Supabase", abbr: "Su", color: "from-emerald-400 to-green-600" },
    { name: "Firebase", abbr: "Fb", color: "from-amber-400 to-amber-600" },
    { name: "Sentry", abbr: "Se", color: "from-purple-500 to-violet-700" },
  ],
  process: [
    { step: "01", title: "Дискавери", description: "Гипотезы, исследование рынка, требования и аналитика." },
    { step: "02", title: "Дизайн и прототип", description: "Figma-прототип, который можно потрогать на устройстве." },
    { step: "03", title: "Разработка спринтами", description: "Раз в две недели — релиз с новой ценностью и тестами." },
    { step: "04", title: "Сторы и поддержка", description: "Публикация в App Store и Google Play, обновления, поддержка." },
  ],
  tariffs: [
    {
      name: "Start",
      price: "от 700 000 ₽",
      description: "MVP под одну платформу для проверки гипотезы",
      features: ["iOS или Android", "До 5 ключевых экранов", "Базовая аналитика", "Публикация в стор", "1 месяц поддержки"],
      cta: "Запустить MVP",
    },
    {
      name: "Pro",
      price: "от 1 800 000 ₽",
      description: "Полноценное приложение под обе платформы",
      features: ["iOS + Android", "До 20 экранов", "Push, оплаты, sync", "Админ-панель", "A/B-тесты и аналитика", "6 месяцев поддержки"],
      popular: true,
      cta: "Обсудить проект",
    },
    {
      name: "Custom",
      price: "по запросу",
      description: "Сложная логика, интеграции и большой scope",
      features: ["Кастомные нативные модули", "AR / Camera / ML", "Микросервисы и масштабирование", "Crash-free SLA", "Выделенная команда"],
      cta: "Запросить смету",
    },
  ],
  faq: [
    { q: "Какую технологию выбрать — нативную или кросс-платформу?", a: "Зависит от задачи. Кросс-платформа дешевле и быстрее, нативные технологии — для сложной графики, AR и тяжёлой логики." },
    { q: "Сколько занимает запуск MVP?", a: "Кросс-платформа — 8-10 недель. Нативное MVP — от 12 недель." },
    { q: "Кто отвечает за публикацию в сторах?", a: "Берём на себя: настройка аккаунтов, ассеты, описания, прохождение модерации." },
    { q: "Поддерживаете ли вы существующее приложение?", a: "Да. Сначала аудит кода и инфраструктуры, потом план поэтапных улучшений." },
    { q: "Как работаете с релизами?", a: "Спринты по 2 недели. После каждого — внутренний билд для команды клиента." },
    { q: "Что с авариями в проде?", a: "Sentry и алерты на critical issues. SLA на отклик фиксируем в договоре." },
  ],
};

export const SERVICES: Record<ServiceSlug, Service> = {
  web: WEB,
  bots: BOTS,
  apps: APPS,
};

export function getService(slug: string): Service | null {
  if (slug !== "web" && slug !== "bots" && slug !== "apps") return null;
  return SERVICES[slug];
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return ["web", "bots", "apps"];
}
