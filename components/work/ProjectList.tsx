"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/lib/projects";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-[#EAE8E2] border-y border-[#EAE8E2]">
      {projects.map((project, index) => {
        const isHovered = hoveredSlug === project.slug;
        const isAnyHovered = hoveredSlug !== null;

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              delay: shouldReduceMotion ? 0 : index * 0.05,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group block py-6 sm:py-8 transition-opacity duration-200"
              style={{
                opacity: isAnyHovered && !isHovered ? 0.45 : 1,
              }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base sm:text-lg font-medium text-[#141413] tracking-tight transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#84837E]">
                    {project.category}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#84837E]">
                  <span className="font-mono text-[11px] sm:text-xs">
                    {project.year}
                  </span>
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-[#141413]">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
