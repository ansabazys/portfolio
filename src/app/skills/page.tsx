"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";
import Typewriter from "@/components/Typewriter";

const SKILLS_LIST = [
  "TypeScript",
  "Next.js",
  "React",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "ClickHouse",
  "Docker",
  "Kubernetes",
  "AWS",
];

export default function SkillsPage() {
  const [commandFinished, setCommandFinished] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
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
          ansab@portfolio:~$ <Typewriter text="apt list --installed" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[16px]">
            <p className="grub-muted">Listing... Done</p>
            <div className="mt-[16px] grid grid-cols-1 gap-x-[32px] sm:grid-cols-2 md:grid-cols-3">
              {visibleSkills.map((skill) => (
                <p key={skill}> {skill}/stable,now [installed]</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
