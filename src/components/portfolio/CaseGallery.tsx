"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { CaseGalleryItem } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function GalleryTile({
  item,
  onClick,
}: {
  item: CaseGalleryItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ aspectRatio: item.aspect.replace("/", " / ") }}
      className="group/g border-brand-violet/15 hover:border-brand-violet/40 mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      aria-label={`Открыть «${item.alt}»`}
    >
      <div className="relative h-full w-full">
        {item.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover/g:scale-[1.04]"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-300 group-hover/g:scale-[1.04]",
                item.cover,
              )}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-overlay opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.45), transparent 55%), radial-gradient(circle at 80% 85%, rgba(0,0,0,0.3), transparent 55%)",
              }}
            />
          </>
        )}
      </div>
    </button>
  );
}

export function CaseGallery({ items }: { items: CaseGalleryItem[] }) {
  const [active, setActive] = React.useState<number | null>(null);

  const close = React.useCallback(() => setActive(null), []);
  const next = React.useCallback(
    () =>
      setActive((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const prev = React.useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, next, prev]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <GalleryTile
            key={i}
            item={item}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {current !== null && active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="bg-bg-base/90 fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 p-6 backdrop-blur-xl"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="bg-bg-elevated/80 ring-border hover:bg-bg-overlay text-text-primary absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Предыдущее"
              className="bg-bg-elevated/80 ring-border hover:bg-bg-overlay text-text-primary absolute left-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Следующее"
              className="bg-bg-elevated/80 ring-border hover:bg-bg-overlay text-text-primary absolute right-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full ring-1 backdrop-blur transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Image */}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              {current.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={current.image}
                  alt={current.alt}
                  style={{ aspectRatio: current.aspect.replace("/", " / ") }}
                  className="border-brand-violet/30 shadow-glow w-full rounded-2xl border object-cover"
                />
              ) : (
                <div
                  style={{ aspectRatio: current.aspect.replace("/", " / ") }}
                  className={cn(
                    "border-brand-violet/30 shadow-glow w-full rounded-2xl border bg-gradient-to-br",
                    current.cover,
                  )}
                  role="img"
                  aria-label={current.alt}
                />
              )}
              <p className="text-text-secondary mt-4 text-center text-sm">
                {current.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
