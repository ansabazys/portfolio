"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between w-full px-6 py-4 bg-[#FAFAF8]/90 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-semibold text-[#141413]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-sm text-[#6B6A67] hover:text-[#141413] py-1 px-2 focus-visible:outline-none transition-colors font-medium"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Drawer (Slide Down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#FAFAF8] px-6 py-4 border-b border-[#EAE8E2]"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Left Sidebar (Vertical Navigation) */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden md:flex md:w-36 lg:w-44 md:shrink-0 md:sticky md:top-0 md:h-screen md:flex-col pt-20 sm:pt-28 md:pt-32 pl-6 sm:pl-8 pr-2 select-none"
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
                  ? "text-[#141413] font-bold1"
                  : "text-[#6B6A67] font-normal hover:text-[#141413]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
