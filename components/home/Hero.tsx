"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { BrandIcon, BusinessIcon, CreateIcon, DesignIcon, FreelanceIcon, GlobeIcon, TogetherIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const projectSummaries: Record<string, string> = {
  traqory: "Privacy-first analytics for fast, actionable product insights.",
  healix: "Personalized nutrition subscriptions built for everyday wellness.",
  "purchase-management-system": "Offline-first procurement for warehouse and field teams.",
};

const projectDisplayNames: Record<string, string> = {
  "purchase-management-system": "PMS",
};

const projectRepositories: Record<string, string> = {
  traqory: "https://github.com/ansabazys/traqory.git",
  "purchase-management-system": "https://github.com/ansabazys/pms.git",
  healix: "https://github.com/devxtra-community/healix.git",
};

type FeaturedProject = {
  slug: string;
  title: string;
  description: string;
  href?: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    slug: "jez",
    title: "Jez",
    description: "AI Git companion for meaningful commits, PRs, and release notes.",
    href: "https://github.com/ansabazys/jez",
  },
  ...projects.map((project) => ({
    slug: project.slug,
    title: projectDisplayNames[project.slug] ?? project.title,
    description: projectSummaries[project.slug] ?? project.description,
    href: projectRepositories[project.slug],
  })),
];

function FeaturedProjectRow({ project }: { project: FeaturedProject }) {
  const content = (
    <>
      <h3 className="font-semibold text-[var(--text-primary)] underline decoration-1 decoration-transparent underline-offset-4 transition-[color,text-decoration-color] group-hover:text-blue-600 group-hover:decoration-current dark:group-hover:text-blue-400">
        {project.title}
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
          className="ml-1 inline-block h-4 w-4 align-[-0.12em] text-[var(--text-muted)]"
          aria-hidden="true"
        >
          <path d="M6.86 7.15Q12 6.68 17.03 6.89Q17.55 12 17 16.88" />
          <path d="M7.1 16.93Q12.6 12.6 17.18 6.87" />
        </svg>
      </h3>
      <p className="text-base leading-snug text-[var(--text-secondary)]">
        {project.description}
      </p>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        className="group flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-base"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="group flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-base">
      {content}
    </article>
  );
}

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
        className="w-full"
      >
        {/* Name & Subtitle */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#141413] tracking-tight">
              Ansab Azys
            </h1>
            <p className="text-sm text-[#84837E] mt-0.5">
              Designer &amp; Full-Stack Developer
            </p>
          </div>
          <ThemeToggle className="hidden md:flex" />
        </motion.div>

        {/* Bio Paragraphs */}
        <motion.div variants={itemVariants} className="mt-6 space-y-4 text-base leading-relaxed text-[#5E5D59]">
          <p>
            I design and build{" "}
            <span className="whitespace-nowrap">
              brands
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <BrandIcon size={17} />
              </span>
              ,
            </span>{" "}
            interfaces, applications, and{" "}
            <span className="whitespace-nowrap font-libre-baskerville italic">
              digital products
            </span>{" "}
            for{" "}
            <span className="whitespace-nowrap">
              businesses
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <BusinessIcon size={17} />
              </span>
            </span>{" "}
            and founders turning ideas into something real. I bring{" "}
            <span className="whitespace-nowrap">
              <span className="animated-underline text-[#141413]">design and development</span>
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <DesignIcon size={17} />
              </span>
            </span>{" "}
            together to{" "}
            <span className="whitespace-nowrap">
              create
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <CreateIcon size={17} />
              </span>
            </span>{" "}
            work that feels distinctive, intuitive, and thoughtfully{" "}
            <span className="whitespace-nowrap font-libre-baskerville italic">
              made
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <TogetherIcon size={17} />
              </span>
              .
            </span>
          </p>
          <p>
            Available for{" "}
            <span className="whitespace-nowrap">
              <span className="animated-underline text-[#141413]">freelance projects</span>
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <FreelanceIcon size={17} />
              </span>
            </span>{" "}
            across branding, identity and UI design,{" "}
            <span className="whitespace-nowrap">
              websites
              <span className="inline-flex items-center align-[-0.15em] ml-[5px]">
                <GlobeIcon size={17} />
              </span>
              ,
            </span>{" "}
            SaaS products, and custom applications.
          </p>
          <p>
            Explore my work on{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-[var(--text-primary)]"
            >
              GitHub
            </a>
            , see the creative things I share on{" "}
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-[var(--text-primary)]"
            >
              Instagram
            </a>
            , or{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="animated-underline text-[var(--text-primary)]"
            >
              email me
            </a>{" "}
            to get in touch.
          </p>
        </motion.div>

        {/* Current role */}
        <motion.section
          variants={itemVariants}
          className="mt-10 grid gap-5"
          aria-label="Current role"
        >
          <div className="flex items-baseline gap-1 text-sm text-[var(--text-muted)]">
            <span>2026</span>
            <span className="text-xs text-[var(--text-secondary)]">
              Contract based
            </span>
          </div>
          <div>
            <h2 className="text-base font-medium text-[var(--text-primary)]">
              Junior Software Developer
            </h2>
            <div className="mt-0.5 flex items-baseline justify-between gap-4 md:block">
            <a
              href="https://thynck.in"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-base text-[var(--text-primary)]"
            >
              Thynck ↗
            </a>
            <p className="shrink-0 text-sm text-[var(--text-secondary)] md:mt-1">Calicut, India</p>
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.div variants={itemVariants} className="mt-10 pt-2">
          <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
            Projects
          </h2>

          <div className="mt-3 space-y-3">
            {featuredProjects.map((project) => (
              <FeaturedProjectRow
                key={project.slug}
                project={project}
              />
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
          <h2 className="text-base font-medium text-[#141413]">
            Have an idea worth building?
          </h2>

          <p className="mt-3 text-base text-[#5E5D59] leading-relaxed">
            Have a project in mind, something that needs a better direction, or simply an idea you&apos;d like to explore? Tell me a little about it and let&apos;s see what we can make together.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-base text-[#5E5D59]">
            <Link
              href="/contact"
              className="animated-underline"
            >
              ↗ start a project
            </Link>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project inquiry")}`}
              className="animated-underline"
            >
              ↗ send an email
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline"
            >
              ↗ connect on LinkedIn
            </a>
          </div>
        </motion.section>
      </motion.div>
    </Container>
  );
}
