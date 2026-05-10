"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  className: string;
  style: React.CSSProperties;
  animate: { x: number[]; y: number[] };
  duration: number;
};

// Большие blur-радиусы при непрерывной анимации очень дорогие — держим в
// разумных пределах и ограничиваемся двумя блобами. Анимируем только
// transform (через framer-motion x/y), чтобы держать слои на GPU.
const blobs: Blob[] = [
  {
    className: "bg-brand-violet/20",
    style: {
      top: "-10%",
      left: "-6%",
      width: "32rem",
      height: "32rem",
      filter: "blur(70px)",
      willChange: "transform",
    },
    animate: { x: [0, 40, -20, 0], y: [0, 30, -15, 0] },
    duration: 40,
  },
  {
    className: "bg-brand-pink/15",
    style: {
      top: "40%",
      right: "-10%",
      width: "28rem",
      height: "28rem",
      filter: "blur(80px)",
      willChange: "transform",
    },
    animate: { x: [0, -30, 20, 0], y: [0, -25, 30, 0] },
    duration: 48,
  },
];

export function BackgroundDecor() {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // На мобиле статика — экономим GPU. На десктопе с reduce-motion тоже.
  const animateBlobs = !reduce && isMobile === false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${blob.className}`}
          style={blob.style}
          animate={animateBlobs ? blob.animate : undefined}
          transition={
            animateBlobs
              ? {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
