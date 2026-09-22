"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat" || pathname?.startsWith("/chat/")) {
    return null;
  }

  return (
    <footer className="mt-auto py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-12">
        <div className="flex flex-col items-start gap-4 text-xs text-[#666561]">
          {/* Brand & Rights / Copyright */}
          <div className="space-y-0.5 select-none">
            <p className="font-medium text-[#141413]">Ansab Azys</p>
            <p>© {new Date().getFullYear()} · Designed &amp; built by me.</p>
          </div>

          {/* Quick Links & Socials */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/work"
              className="hover:text-blue-600 transition-colors"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/writing"
              className="hover:text-blue-600 transition-colors"
            >
              Writing
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
            <span className="text-[#D5D3CC] select-none">/</span>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

