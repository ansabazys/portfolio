"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { FAQAccordion } from "@/components/home/FAQAccordion";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: "Instagram", href: siteConfig.instagram },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];

const homeServices = [
  {
    slug: "brand-identity",
    number: "01",
    title: "Brand & Identity",
    description: "Logos, visual identities, and brand systems.",
  },
  {
    slug: "product-ui-design",
    number: "02",
    title: "Product & UI Design",
    description: "Interfaces, user flows, and thoughtful design systems.",
  },
  {
    slug: "web-development",
    number: "03",
    title: "Web Development",
    description: "Websites and digital experiences built with care.",
  },
  {
    slug: "application-development",
    number: "04",
    title: "Application Development",
    description: "SaaS products, dashboards, and custom applications.",
  },
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
        initial={false}
        animate="visible"
        className="max-w-md"
      >
        {/* Name & Subtitle */}
        <motion.div variants={itemVariants}>
          <h1 className="text-lg font-semibold text-[#141413] tracking-tight">
            Ansab Azys
          </h1>
          <p className="text-sm text-[#84837E] mt-0.5">
            Designer &amp; Full-Stack Developer
          </p>
        </motion.div>

        {/* Bio Paragraphs */}
        <motion.div variants={itemVariants} className="mt-6 space-y-4 text-base leading-relaxed text-[#5E5D59]">
          <p>
            I design and build brands, interfaces, applications, and digital products for businesses and founders turning ideas into something real. I bring <span className="animated-underline text-[#141413]">design and development</span> together to create work that feels distinctive, intuitive, and thoughtfully made.
          </p>
          <p>
            Available for <span className="animated-underline text-[#141413]">freelance projects</span> across branding, identity and UI design, websites, SaaS products, and custom applications.
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
              className="animated-underline text-[#5E5D59]"
            >
              {social.label}
            </a>
          ))}
        </motion.div>

        {/* Selected Work */}
        <motion.div variants={itemVariants} className="mt-10 pt-2">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
              Selected Work
            </h2>
            <Link
              href="/work"
              className="text-sm text-[#84837E] hover:text-[#141413] transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[#EAE8E2]">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-base font-medium text-[#141413] group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#666561] truncate font-medium">
                    {project.category} · {project.role}
                  </p>
                </div>
                <div className="text-xs text-[#666561] shrink-0 font-mono pt-0.5">
                  <span>{project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants} className="mt-10 pt-2">
          <div className="pb-2">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
              Services
            </h2>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            {homeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block py-1 transition-transform duration-150 ease-out hover:translate-x-0.5"
              >
                <span className="block text-xs font-mono text-[#84837E] mb-1.5 transition-colors group-hover:text-blue-600">
                  {service.number}
                </span>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-base font-medium text-[#141413] tracking-tight group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={itemVariants} className="mt-12 pt-2">
          <div className="pb-2">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
              FAQ
            </h2>
          </div>
          <FAQAccordion />
        </motion.div>

        {/* Contact / Closing CTA */}
        <motion.section
          variants={itemVariants}
          className="mt-10 pt-2"
          aria-label="Contact and Inquiry"
        >
          <h2 className="text-base font-medium tracking-tight text-[#141413]">
            Have an idea worth building?
          </h2>

          <p className="mt-3 text-base text-[#5E5D59] leading-relaxed">
            Have a project in mind, something that needs a better direction, or simply an idea you&apos;d like to explore? Tell me a little about it and let&apos;s see what we can make together.
          </p>

          <div className="mt-5">
            <Link
              href="/contact"
              className="animated-underline text-base font-medium text-[#141413]"
            >
              Start a conversation
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </Container>
  );
}
