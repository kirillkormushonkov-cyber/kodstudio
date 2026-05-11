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

  // NOTE: no opacity:0 in initial — иначе SSR-state будет невидимым, и при
  // первом рендере на проде Vercel (Next.js 16.2.4) виден чёрный экран до
  // полной гидратации. Оставляем только y-offset для лёгкого slide-in.
  return (
    <motion.div
      key={pathname}
      initial={{ y: 4 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
