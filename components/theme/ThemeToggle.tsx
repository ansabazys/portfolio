"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

function MoonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.61 12.02C20.35 16.69 15.9 20.81 11.33 20.81C7.06 21.5 2.9 16.44 2.54 11.92C2.68 8 7.32 3.03 11.37 2.94C12.11 2.75 12.47 3.41 11.81 3.72C10.48 5.69 10.43 8.94 12.26 11.52C14.7 12.76 17.78 13.15 20.18 12.23C20.4 12.08 21 11.93 20.88 12.36" />
    </svg>
  );
}

function SunIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11.51 8.34C14.3 8.16 16.42 9.56 15.4 11.98C15.77 14.3 14.9 16 11.55 16.24C9.98 15.67 8.17 14.02 7.56 11.68C7.28 9.82 10.09 7.48 12.33 8.23Q12.23 7.53 12.37 8.04" />
      <path d="M11.9 1.85Q12.23 3 12.13 4.17" />
      <path d="M12.14 20.08Q11.66 21 11.91 21.98" />
      <path d="M4.79 5.05Q5.51 5.76 6.37 6.22" />
      <path d="M17.73 17.58Q18.57 18.16 19.12 18.92" />
      <path d="M2.09 12.09Q3 12.19 4.03 11.92" />
      <path d="M20.13 11.99Q21 11.71 21.92 11.83" />
      <path d="M6.2 17.55Q5.89 18.62 4.82 19.11" />
      <path d="M18.98 4.88Q18.54 5.81 17.55 6.5" />
    </svg>
  );
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-4 h-4 flex items-center justify-center bg-transparent",
          className
        )}
        aria-hidden="true"
      >
        <span className="w-4 h-4 block" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      className={cn(
        "group relative flex items-center justify-center w-9 h-9 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 transition-colors",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{
            rotate: isDark ? 45 : -25,
            scale: 1.18,
            transition: { type: "spring", stiffness: 350, damping: 14 },
          }}
          className="flex items-center justify-center origin-center"
        >
          {isDark ? (
            <SunIcon className="w-4 h-4 text-[#EDEDEB] group-hover:text-blue-400 transition-colors" />
          ) : (
            <MoonIcon className="w-4 h-4 text-[#141413] group-hover:text-blue-600 transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
