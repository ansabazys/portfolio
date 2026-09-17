import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#EAE8E2] py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand & Rights */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-xs font-semibold tracking-wider text-[#141413] transition-opacity hover:opacity-60"
            >
              ANSAB
            </Link>
            <p className="text-xs text-[#84837E]">
              © 2026 {siteConfig.name}. All rights reserved.
            </p>
          </div>

          {/* Nav & Socials */}
          <div className="flex flex-wrap gap-12 sm:gap-16 text-xs">
            {/* Site pages */}
            <div className="flex flex-col space-y-2.5">
              <span className="text-[11px] uppercase tracking-widest text-[#84837E] font-medium">
                Navigation
              </span>
              <Link
                href="/work"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                About
              </Link>
              <Link
                href="/writing"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/contact"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Connect */}
            <div className="flex flex-col space-y-2.5">
              <span className="text-[11px] uppercase tracking-widest text-[#84837E] font-medium">
                Connect
              </span>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#5E5D59] hover:text-[#141413] transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
