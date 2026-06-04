"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";
import Typewriter from "@/components/Typewriter";

interface LogEntry {
  timestamp: string;
  service: string;
  level: "INFO" | "SUCCESS" | "WARN";
  message: string;
  details: string;
}

const LOG_ENTRIES: LogEntry[] = [
  {
    timestamp: "2026-01-10T09:00:00Z",
    service: "experience-service",
    level: "SUCCESS",
    message: "Active: Building Traqory Analytics",
    details: "Developing privacy-first analytics with NestJS, ClickHouse, Next.js, and PostgreSQL.",
  },
  {
    timestamp: "2025-03-15T10:30:00Z",
    service: "experience-service",
    level: "INFO",
    message: "Transition: Full Stack Development",
    details: "Freelanced and contracted on scalable React frontends and server microservices.",
  },
  {
    timestamp: "2024-06-01T08:00:00Z",
    service: "experience-service",
    level: "INFO",
    message: "Init: Backend Engineering Intern",
    details: "Optimized REST APIs, Docker containers, and database indexing configurations.",
  },
];

export default function ExperiencePage() {
  const [commandFinished, setCommandFinished] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
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
      if (idx < LOG_ENTRIES.length) {
        setDisplayedLogs((prev) => [...prev, LOG_ENTRIES[idx]]);
        idx++;
        return;
      }

      clearInterval(interval);
    }, 250);

    return () => clearInterval(interval);
  }, [commandFinished]);

  return (
    <GrubPageShell title="SYSTEM LOGS" footerRight="Systemd: ACTIVE.">
      <div className="leading-[16px]">
        <p>
          ansab@portfolio:~$ <Typewriter text="journalctl -u experience.service --no-pager" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[16px]">
            <p className="grub-muted">-- Logs begin at 2024-06-01 08:00:00 UTC. --</p>
            <div className="mt-[16px]">
              {displayedLogs.map((log) => (
                <div key={`${log.timestamp}-${log.message}`} className="mb-[16px]">
                  <p>
                    [{log.timestamp.slice(0, 10)}] {log.service}: [{log.level}] {log.message}
                  </p>
                  <p className="pl-[16px] grub-muted">`- {log.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
