"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  className: string;
  style: React.CSSProperties;
  animate: { x: number[]; y: number[] };
  duration: number;
};

const blobs: Blob[] = [
  {
    className: "bg-brand-violet/25",
    style: {
      top: "-12%",
      left: "-8%",
      width: "44rem",
      height: "44rem",
      filter: "blur(120px)",
    },
    animate: { x: [0, 60, -30, 0], y: [0, 40, -20, 0] },
    duration: 28,
  },
  {
    className: "bg-brand-pink/20",
    style: {
      top: "30%",
      right: "-12%",
      width: "38rem",
      height: "38rem",
      filter: "blur(140px)",
    },
    animate: { x: [0, -50, 30, 0], y: [0, -40, 50, 0] },
    duration: 36,
  },
  {
    className: "bg-brand-magenta/20",
    style: {
      bottom: "-10%",
      left: "20%",
      width: "34rem",
      height: "34rem",
      filter: "blur(130px)",
    },
    animate: { x: [0, 40, -50, 0], y: [0, -30, 30, 0] },
    duration: 32,
  },
];

export function BackgroundDecor() {
  const reduce = useReducedMotion();

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
          animate={reduce ? undefined : blob.animate}
          transition={
            reduce
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
