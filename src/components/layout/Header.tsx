"use client";

import Link from "next/link";
import { Command } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export default function Header() {
  const path = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-sm border border-neutral-200 dark:border-neutral-800  backdrop-blur-xl  text-black dark:text-white font-sans text-sm transition-colors">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className={`font-medium transition-colors ${
            path === "/"
              ? "text-black dark:text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/essays"
          className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <span>Essays</span>
          <span className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full px-1.5 py-0.5 text-[10px] leading-none transition-colors">
            4
          </span>
        </Link>
      </div>

      <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 transition-colors" />

      <div className="flex items-center gap-3">
        <button className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 text-xs">
          <Command className="w-3.5 h-3.5" />
          <span>K</span>
        </button>
        <AnimatedThemeToggler className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors [&_svg]:w-4 [&_svg]:h-4 [&_svg]:fill-current" />
      </div>
    </header>
  );
}
