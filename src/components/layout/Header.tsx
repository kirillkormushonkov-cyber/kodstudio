"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Услуги", href: "/#services" },
  { label: "Кейсы", href: "/portfolio" },
  { label: "Блог", href: "/blog" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/" || href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-elevated/80 border-border border-b backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Logo />

            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Основная навигация"
            >
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative text-sm font-medium transition-colors outline-none focus-visible:text-text-primary",
                      active
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="bg-gradient-brand absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Button size="sm" className="hidden lg:inline-flex">
                Обсудить проект
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="text-text-primary hover:bg-bg-elevated inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Закрыть меню"
              tabIndex={-1}
              className="bg-bg-base/70 absolute inset-0 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="bg-bg-elevated border-border absolute inset-x-0 bottom-0 rounded-t-3xl border-t px-6 pt-6 pb-10 shadow-card"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                  className="hover:bg-bg-overlay text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col" aria-label="Мобильная навигация">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "hover:bg-bg-overlay block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                        isActive(item.href)
                          ? "text-text-primary"
                          : "text-text-secondary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                Обсудить проект
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
