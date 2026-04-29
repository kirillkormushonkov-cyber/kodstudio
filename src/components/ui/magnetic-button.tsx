"use client";

import * as React from "react";
import {
  motion,
  type HTMLMotionProps,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

export type MagneticButtonProps = Omit<HTMLMotionProps<"div">, "style"> & {
  /** Maximum offset in pixels (default 8). */
  strength?: number;
};

export function MagneticButton({
  children,
  strength = 8,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
