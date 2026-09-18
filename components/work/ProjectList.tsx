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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-[#141413] tracking-tight transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-blue-600">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#666561] font-medium">
                    {project.category} · {project.role}
                  </p>
                  <p className="text-sm text-[#5E5D59] leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F2EE] border border-[#EAE8E2] text-[#666561]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#666561] shrink-0 pt-1">
                  <span className="font-mono text-xs">
                    {project.year}
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
