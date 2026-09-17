"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/seo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

function LocationIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.08 12Q3.5 11.59 5.07 12.08" />
      <path d="M18.82 11.89Q20.5 12.11 21.94 12.13" />
      <path d="M11.82 2.19Q11.68 3.5 11.98 4.95" />
      <path d="M12.2 18.99Q11.61 20.5 11.95 22.05" />
      <path d="M11.98 4.58C15.25 5.44 18.76 8.74 19.4 12C18.94 14.75 14.43 18.31 12.5 18.87C8.28 18.14 5.14 15.44 4.71 12.33C4.42 7.21 7.98 4.14 11.73 5.35Q11.58 4.61 11.36 5.11" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Sticky Navigation Container */}
      <div className="md:hidden sticky top-0 z-40 pointer-events-none">
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-end w-full p-6 bg-transparent">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/50 backdrop-blur-xl backdrop-saturate-150 border border-white/70 flex items-center justify-center text-[#141413] hover:bg-white/70 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.91 6.06Q12.46 12.46 6.04 17.8" />
                      <path d="M6.19 6.08Q11.79 12.21 18.17 17.96" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.07 4.88Q12 5.42 20.11 5.14" />
                      <path d="M4.14 11.88Q12 11.33 19.84 12.17" />
                      <path d="M4.18 18.82Q12 18.75 20.03 19.02" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>

        {/* Mobile Drawer (Slide Down) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto bg-[#FAFAF8]/95 backdrop-blur-xl px-6 py-4 border-b border-[#EAE8E2]"
            >
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base py-1 transition-colors ${isActive
                      ? "text-[#141413] font-bold"
                      : "text-[#6B6A67] font-normal hover:text-[#141413]"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Current Mood (Mobile) */}
            <div className="mt-4 w-full max-w-xs">
              <p className="text-base text-[#6B6A67] leading-snug whitespace-pre-line w-full">
                {siteConfig.currentMood}
              </p>
            </div>

            {/* Location (Mobile) */}
            <div className="mt-4 flex items-center gap-2 text-base text-[#6B6A67]">
              <LocationIcon className="w-4 h-4 shrink-0 text-[#84837E]" />
              <span>{siteConfig.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Desktop Left Sidebar (Vertical Navigation) */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden md:flex md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen md:flex-col pt-20 sm:pt-28 md:pt-32 pl-6 sm:pl-8 pr-2 select-none"
      >
        {/* Navigation Links - Stacked vertically (one below one) */}
        <nav
          aria-label="Main Navigation"
          className="flex flex-col space-y-1"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base transition-colors duration-150 ${isActive
                  ? "text-[#141413] font-semibold"
                  : "text-[#6B6A67] font-normal hover:text-[#141413]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Current Mood Section */}
        <div className="mt-8 w-full">
          <p className="text-base text-[#6B6A67] leading-snug whitespace-pre-line w-full">
            {siteConfig.currentMood}
          </p>
        </div>

        {/* Location Section */}
        <div className="mt-6 flex items-center gap-2 text-base text-[#6B6A67]">
          <LocationIcon className="w-4 h-4 shrink-0 text-[#84837E]" />
          <span>{siteConfig.location}</span>
        </div>
      </aside>
    </>
  );
}
