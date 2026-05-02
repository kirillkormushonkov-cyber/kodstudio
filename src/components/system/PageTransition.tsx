"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
