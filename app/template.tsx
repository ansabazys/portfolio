"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1 flex flex-col min-w-0"
    >
      {children}
    </motion.div>
  );
}
