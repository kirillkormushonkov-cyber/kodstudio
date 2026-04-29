"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
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

  if (reduce) {
    return React.createElement(as, { className }, children);
  }

  // motion.div by default — `as` is mostly used for non-motion fallback above.
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
