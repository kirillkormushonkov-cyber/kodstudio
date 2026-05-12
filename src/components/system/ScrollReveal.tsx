"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Custom margin for the IntersectionObserver-like trigger. */
  margin?: string;
  /** Render plain children when motion is reduced. */
  as?: keyof React.JSX.IntrinsicElements;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  margin = "-10%",
  as = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration or with reduced motion: render plain element so content
  // is visible even if JS fails or is slow — avoids "invisible page" on SSR.
  if (reduce || !mounted) {
    return React.createElement(as, { className }, children);
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
