"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type WordsRevealProps = {
  /** Text to split into words (по пробелам). */
  text: string;
  /** Когда первое слово начинает анимацию (секунды). */
  startDelay?: number;
  /** Задержка между соседними словами (секунды). */
  perWordDelay?: number;
  /** Длительность анимации одного слова (секунды). */
  duration?: number;
  /** Класс внешнего span. */
  className?: string;
};

/**
 * Reveals text word-by-word with a fade + slide-up animation after hydration.
 * До mount рендерит plain span с тем же текстом — контент виден на SSR,
 * даже если JS не загрузился (важно для Vercel edge-стриминга).
 */
export function WordsReveal({
  text,
  startDelay = 0,
  perWordDelay = 0.09,
  duration = 0.9,
  className,
}: WordsRevealProps) {
  const [mounted, setMounted] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  // Split keeping separators so multi-spaces / newlines are preserved.
  const parts = text.split(/(\s+)/);
  let wordIdx = 0;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part) || part === "") {
          return <React.Fragment key={i}>{part}</React.Fragment>;
        }
        const delay = startDelay + wordIdx * perWordDelay;
        wordIdx += 1;
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </span>
  );
}
