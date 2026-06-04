"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";

interface Project {
  name: string;
  status: string;
  stack: string[];
  description: string;
}

const PROJECTS_DATA: Project[] = [
  {
    name: "Traqory Analytics",
    status: "Active Development",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "ClickHouse", "Docker"],
    description: "Privacy-focused analytics platform built for modern web applications.",
  },
  {
    name: "Event Tracking SDK",
    status: "Production Ready",
    stack: ["TypeScript", "Rollup", "Fetch API", "Jest"],
    description: "High-performance event ingestion SDK for buffered interaction logs.",
  },
  {
    name: "Analytics Dashboard",
    status: "Maintained",
    stack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Vite"],
    description: "Real-time workspace for clickstream events and aggregation charts.",
  },
  {
    name: "Authentication Service",
    status: "Completed",
    stack: ["NestJS", "TypeScript", "Redis", "MongoDB", "OAuth2 / OIDC", "Docker"],
    description: "Authorization service with secure codes, PKCE, and session caching.",
  },
];

export default function ProjectsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const activeProject = PROJECTS_DATA[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS_DATA.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < PROJECTS_DATA.length - 1 ? prev + 1 : 0));
          break;
        case "Escape":
          e.preventDefault();
          router.push("/grub");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <GrubPageShell title="PROJECTS" footerLeft="Use the ↑ and ↓ keys to inspect portfolio entries." footerRight="Module: ACTIVE.">
      <div className="grid grid-cols-1 gap-[32px] md:grid-cols-[42ch_1fr]">
        <div>
          {PROJECTS_DATA.map((project, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={project.name}
                className={`grub-menu-line cursor-pointer ${isSelected ? "grub-selected" : "text-white"}`}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                {isSelected ? `*${project.name}` : ` ${project.name}`}
              </div>
            );
          })}
        </div>

        <div className="leading-[16px]">
          <p>Name: {activeProject.name}</p>
          <p>Status: {activeProject.status}</p>
          <p>Stack: {activeProject.stack.join(", ")}</p>
          <p className="mt-[16px]">Description:</p>
          <p className="max-w-[72ch] pl-[16px]">{activeProject.description}</p>
        </div>
      </div>
    </GrubPageShell>
  );
}
