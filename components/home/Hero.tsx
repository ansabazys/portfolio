"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";
import Accordion5 from "@/components/ui/accordion-05";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 4,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Container size="md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md select-none"
      >
        {/* Name & Subtitle */}
        <motion.div variants={itemVariants}>
          <h1 className="text-lg font-semibold text-[#141413] tracking-tight">
            Ansab Azys
          </h1>
          <p className="text-sm text-[#84837E] mt-0.5">
            Full stack developer
          </p>
        </motion.div>

        {/* Bio Paragraphs */}
        <motion.div variants={itemVariants} className="mt-6 space-y-4 text-base leading-relaxed text-[#5E5D59]">
          <p>
            I build modern web applications, SaaS products, and digital experiences based in <span className="underline underline-offset-4 decoration-[#84837E]/60 text-[#141413]">Kerala, India</span>. Focused on resilient architectures, database performance, and calm, typography-led software.
          </p>
          <p>
            Currently engineering scalable web systems and exploring calm software principles.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-[#5E5D59] underline underline-offset-4 decoration-[#84837E]/50 hover:text-blue-600 hover:decoration-blue-600 transition-colors"
            >
              {social.label}
            </a>
          ))}
        </motion.div>

        {/* Accordion */}
        <motion.div variants={itemVariants} className="mt-8 pt-2">
          <Accordion5 />
        </motion.div>
      </motion.div>
    </Container>
  );
}
