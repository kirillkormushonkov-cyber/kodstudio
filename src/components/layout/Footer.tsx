import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/Logo";
import { CopyEmail } from "@/components/layout/CopyEmail";
import {
  BehanceIcon,
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/layout/social-icons";

const SOCIALS = [
  { label: "Telegram", href: "https://t.me/kodstudio", Icon: TelegramIcon },
  { label: "GitHub", href: "https://github.com/kodstudio", Icon: GithubIcon },
  {
    label: "Behance",
    href: "https://behance.net/kodstudio",
    Icon: BehanceIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/kodstudio",
    Icon: LinkedinIcon,
  },
] as const;

const SERVICES = [
  { label: "Дизайн", href: "/#services-design" },
  { label: "Разработка", href: "/#services-dev" },
  { label: "Поддержка и развитие", href: "/#services-support" },
];

const COMPANY = [
  { label: "О нас", href: "/#about" },
  { label: "Блог", href: "/blog" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Карьера", href: "/career" },
];

const EMAIL = "hello@kodstudio.dev";
const TELEGRAM = "https://t.me/kodstudio";
const WHATSAPP = "https://wa.me/79601719785";

export function Footer() {
  return (
    <footer className="bg-bg-base relative mt-auto">
      <div
        aria-hidden="true"
        className="from-brand-violet/0 via-brand-purple/55 to-brand-pink/0 absolute inset-x-0 top-0 h-px bg-gradient-to-r"
      />

      <Container className="py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <Logo />
            <p className="text-text-secondary max-w-xs text-sm leading-relaxed">
              Дизайн-студия и команда инженеров.
              <br />
              Строим продукты, которые работают.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-bg-elevated text-text-secondary ring-border hover:text-text-primary hover:bg-bg-overlay hover:ring-brand-purple/40 inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition-all"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-text-primary text-sm font-semibold tracking-wide">
              Услуги
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICES.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-text-primary text-sm font-semibold tracking-wide">
              Компания
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-text-primary text-sm font-semibold tracking-wide">
              Контакты
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <CopyEmail email={EMAIL} />
              </li>
              <li>
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary inline-flex items-center gap-2 text-sm transition-colors"
                >
                  <TelegramIcon className="size-4 shrink-0" />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary inline-flex items-center gap-2 text-sm transition-colors"
                >
                  <WhatsappIcon className="size-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border text-text-muted mt-12 flex flex-col gap-4 border-t pt-8 text-xs md:mt-16 md:flex-row md:items-center md:justify-between">
          <p>© 2026 KodStudio. Все права защищены.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/offer"
              className="hover:text-text-primary transition-colors"
            >
              Публичная оферта
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
