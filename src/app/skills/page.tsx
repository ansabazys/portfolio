"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";
import Typewriter from "@/components/Typewriter";

const SKILLS_LIST = [
  { name: "TypeScript", group: "language" },
  { name: "Next.js", group: "framework" },
  { name: "React", group: "frontend" },
  { name: "NestJS", group: "backend" },
  { name: "PostgreSQL", group: "database" },
  { name: "MongoDB", group: "database" },
  { name: "ClickHouse", group: "analytics" },
  { name: "Docker", group: "devops" },
  { name: "Kubernetes", group: "devops" },
  { name: "AWS", group: "cloud" },
];

type SkillPackage = (typeof SKILLS_LIST)[number];

export default function SkillsPage() {
  const [commandFinished, setCommandFinished] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState<SkillPackage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/grub");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    if (!commandFinished) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < SKILLS_LIST.length) {
        setVisibleSkills((prev) => [...prev, SKILLS_LIST[idx]]);
        idx++;
        return;
      }

      clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, [commandFinished]);

  return (
    <GrubPageShell title="PACKAGE MANAGER" footerRight="Aptitude: IDLE.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span>{" "}
          <Typewriter text="apt list --installed" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[16px]">
            <p>
              <span className="grub-muted">Listing...</span> <span className="system-green">Done</span>
            </p>
            <div className="mt-[16px] grid grid-cols-1 gap-x-[32px] sm:grid-cols-2 md:grid-cols-3">
              {visibleSkills.map((skill) => (
                <p key={skill.name}>
                  <span className="system-cyan">{skill.name}</span>
                  <span className="grub-muted">/stable,now</span>{" "}
                  <span className="system-yellow">[{skill.group}]</span>{" "}
                  <span className="system-green">[installed]</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
