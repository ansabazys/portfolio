"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";

interface SkillPackage {
  packageName: string;
  displayName: string;
  status: string;
  category: string;
  version: string;
  description: string[];
  usedIn: string[];
  dependencies: string[];
  maintainer: string;
  repository: string;
}

const SKILL_PACKAGES: SkillPackage[] = [
  {
    packageName: "nestjs",
    displayName: "NestJS",
    status: "installed",
    category: "backend",
    version: "stable",
    description: [
      "Progressive Node.js framework for",
      "building scalable backend applications.",
    ],
    usedIn: ["Traqory Analytics", "Analytics API", "Authentication Service"],
    dependencies: ["nodejs", "typescript", "postgresql"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "nextjs",
    displayName: "Next.js",
    status: "installed",
    category: "frontend",
    version: "stable",
    description: [
      "React framework for production web",
      "applications, routing, and rendering.",
    ],
    usedIn: ["Portfolio", "Analytics Dashboard", "Landing Interfaces"],
    dependencies: ["react", "typescript", "tailwindcss"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "react",
    displayName: "React",
    status: "installed",
    category: "frontend",
    version: "stable",
    description: [
      "Component library for building interactive",
      "interfaces and reusable UI systems.",
    ],
    usedIn: ["Portfolio", "Analytics Dashboard", "Client SDK Demos"],
    dependencies: ["typescript", "nextjs", "tailwindcss"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "typescript",
    displayName: "TypeScript",
    status: "installed",
    category: "language",
    version: "stable",
    description: [
      "Typed JavaScript language layer for",
      "safer application and API development.",
    ],
    usedIn: ["Traqory Analytics", "Portfolio", "Event Tracking SDK"],
    dependencies: ["nodejs", "eslint", "react"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "postgresql",
    displayName: "PostgreSQL",
    status: "installed",
    category: "database",
    version: "stable",
    description: [
      "Relational database for transactional",
      "storage, auth data, and product records.",
    ],
    usedIn: ["Traqory Analytics", "Analytics API", "Authentication Service"],
    dependencies: ["sql", "nestjs", "docker"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "clickhouse",
    displayName: "ClickHouse",
    status: "installed",
    category: "analytics",
    version: "stable",
    description: [
      "Column-oriented database for fast",
      "event analytics and reporting queries.",
    ],
    usedIn: ["Traqory Analytics", "Analytics API", "Realtime Reports"],
    dependencies: ["docker", "nodejs", "postgresql"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "mongodb",
    displayName: "MongoDB",
    status: "installed",
    category: "database",
    version: "stable",
    description: [
      "Document database for flexible schemas",
      "and fast feature prototyping.",
    ],
    usedIn: ["Prototype APIs", "Internal Tools", "Data Experiments"],
    dependencies: ["nodejs", "typescript", "docker"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "docker",
    displayName: "Docker",
    status: "installed",
    category: "devops",
    version: "stable",
    description: [
      "Container runtime for reproducible local",
      "services and deployment environments.",
    ],
    usedIn: ["Traqory Analytics", "Analytics API", "Database Services"],
    dependencies: ["linux", "compose", "nodejs"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "kubernetes",
    displayName: "Kubernetes",
    status: "installed",
    category: "devops",
    version: "stable",
    description: [
      "Container orchestration platform for",
      "scaling and operating services.",
    ],
    usedIn: ["Deployment Labs", "Service Orchestration", "Infra Practice"],
    dependencies: ["docker", "linux", "yaml"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
  {
    packageName: "aws",
    displayName: "AWS",
    status: "installed",
    category: "cloud",
    version: "stable",
    description: [
      "Cloud platform for hosting applications,",
      "storage, networking, and managed services.",
    ],
    usedIn: ["Deployments", "Cloud Experiments", "Backend Services"],
    dependencies: ["linux", "docker", "nodejs"],
    maintainer: "Ansab",
    repository: "github.com/ansabazys",
  },
];

function renderTree(items: string[]) {
  return items.map((item, index) => `${index === items.length - 1 ? "└" : "├"}─ ${item}`);
}

export default function SkillsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const activeSkill = SKILL_PACKAGES[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : SKILL_PACKAGES.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < SKILL_PACKAGES.length - 1 ? prev + 1 : 0));
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
    <GrubPageShell title="PACKAGE MANAGER" footerLeft="Use the Up and Down keys to inspect installed packages." footerRight="Aptitude: IDLE.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span> apt list --installed
        </p>

        <div className="mt-[16px]">
          <p>
            <span className="grub-muted">Listing...</span> <span className="system-green">Done</span>
          </p>

          <div className="mt-[16px] grid grid-cols-1 gap-[32px] md:grid-cols-[42ch_1fr]">
            <div>
              <p className="system-cyan">/home/ansab/skills</p>
              <div className="mt-[16px]">
                {SKILL_PACKAGES.map((skill, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      type="button"
                      key={skill.packageName}
                      className={`grub-menu-line system-link-line cursor-pointer ${isSelected ? "system-project-selected" : "text-white"}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      {isSelected ? "*" : " "} {skill.packageName}/
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p>
                <span className="system-green">ansab@portfolio</span>:{activeSkill.packageName}$ cat package-info
              </p>
              <div className="mt-[16px]">
                <p><span className="system-cyan">Package    :</span> {activeSkill.packageName}</p>
                <p><span className="system-cyan">Status     :</span> {activeSkill.status}</p>
                <p><span className="system-cyan">Category   :</span> {activeSkill.category}</p>
                <p><span className="system-cyan">Version    :</span> {activeSkill.version}</p>

                <div className="mt-[16px]">
                  <p className="system-cyan">Description:</p>
                  {activeSkill.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-[16px]">
                  <p className="system-cyan">Used In:</p>
                  {renderTree(activeSkill.usedIn).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-[16px]">
                  <p className="system-cyan">Dependencies:</p>
                  {renderTree(activeSkill.dependencies).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-[16px]">
                  <p className="system-cyan">Maintainer:</p>
                  <p>{activeSkill.maintainer}</p>
                </div>

                <div className="mt-[16px]">
                  <p className="system-cyan">Repository:</p>
                  <p>{activeSkill.repository}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GrubPageShell>
  );
}
