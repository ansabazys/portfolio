"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";

interface ExperienceRole {
  slug: string;
  title: string;
  company?: string;
  status: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  responsibilities: string[];
  stack: string[];
  projects: string[];
}

const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    slug: "full-stack-freelancer",
    title: "Full Stack Freelancer",
    status: "active",
    type: "freelance",
    period: "2026 - Present",
    location: "Remote",
    description: [
      "Delivering full-stack web applications",
      "for clients across multiple domains.",
    ],
    responsibilities: [
      "Build modern React and Next.js applications",
      "Develop scalable backend APIs",
      "Design database schemas and integrations",
      "Deploy and maintain production systems",
    ],
    stack: [
      "nextjs",
      "react",
      "nestjs",
      "nodejs",
      "postgresql",
      "docker",
      "typescript",
    ],
    projects: [
      "Client Dashboards",
      "Business Websites",
      "Internal Tools",
      "Custom Web Applications",
    ]
  },

  {
    slug: "intern",
    title: "Full Stack Developer Intern",
    company: "DevXtra",
    status: "completed",
    type: "internship",
    period: "2025 - 2026",
    location: "Remote",
    description: [
      "Contributed to frontend and backend",
      "development across multiple projects.",
    ],
    responsibilities: [
      "Develop responsive user interfaces",
      "Build and maintain backend services",
      "Integrate APIs and databases",
      "Collaborate with development teams",
    ],
    stack: [
      "react",
      "nextjs",
      "nodejs",
      "postgresql",
      "docker",
      "typescript",
    ],
    projects: [
      "Web Applications",
      "API Services",
      "Database Integrations",
    ],
  },
];

function renderTree(items: string[]) {
  return items.map((item, index) => `${index === items.length - 1 ? "└" : "├"}─ ${item}`);
}

export default function ExperiencePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const activeRole = EXPERIENCE_ROLES[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : EXPERIENCE_ROLES.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < EXPERIENCE_ROLES.length - 1 ? prev + 1 : 0));
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
    <GrubPageShell title="EXPERIENCE" footerLeft="Use the Up and Down keys to inspect roles." footerRight="Systemd: ACTIVE.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span> ls experience
        </p>

        <div className="mt-[16px] grid grid-cols-1 gap-[32px] md:grid-cols-[42ch_1fr]">
          <div>
            <div className="h-[16px]" aria-hidden="true" />
            <div className="mt-[16px]">
              {EXPERIENCE_ROLES.map((role, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    type="button"
                    key={role.slug}
                    className={`grub-menu-line system-link-line cursor-pointer ${isSelected ? "system-project-selected" : "text-white"}`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    {isSelected ? "*" : " "} {role.slug}/
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p>
              <span className="system-green">ansab@portfolio</span>:{activeRole.slug}$ cat role-info
            </p>
            <div className="mt-[16px]">
              <p><span className="system-cyan">Role      :</span> {activeRole.title}</p>
              <p><span className="system-cyan">Status    :</span> {activeRole.status}</p>
              <p><span className="system-cyan">Type      :</span> {activeRole.type}</p>
              <p><span className="system-cyan">Period    :</span> {activeRole.period}</p>
              <p><span className="system-cyan">Location  :</span> {activeRole.location}</p>

              <div className="mt-[16px]">
                <p className="system-cyan">Description:</p>
                {activeRole.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-[16px]">
                <p className="system-cyan">Responsibilities:</p>
                {renderTree(activeRole.responsibilities).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-[16px]">
                <p className="system-cyan">Stack:</p>
                {renderTree(activeRole.stack).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-[16px]">
                <p className="system-cyan">Projects:</p>
                {renderTree(activeRole.projects).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GrubPageShell>
  );
}
