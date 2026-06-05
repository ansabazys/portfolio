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

  const getLevelClassName = (level: LogEntry["level"]) => {
    switch (level) {
      case "SUCCESS":
        return "system-green";
      case "WARN":
        return "system-yellow";
      case "INFO":
      default:
        return "system-cyan";
    }
  };

  return (
    <GrubPageShell title="SYSTEM LOGS" footerRight="Systemd: ACTIVE.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span>{" "}
          <Typewriter text="journalctl -u experience.service --no-pager" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[16px]">
            <p>
              <span className="grub-muted">-- Logs begin at</span>{" "}
              <span className="system-yellow">2024-06-01 08:00:00 UTC</span>
              <span className="grub-muted">. --</span>
            </p>
            <div className="mt-[16px]">
              {displayedLogs.map((log) => (
                <div key={`${log.timestamp}-${log.message}`} className="mb-[16px]">
                  <p>
                    <span className="system-magenta">[{log.timestamp.slice(0, 10)}]</span>{" "}
                    <span className="system-cyan">{log.service}</span>:{" "}
                    <span className={getLevelClassName(log.level)}>[{log.level}]</span>{" "}
                    <span>{log.message}</span>
                  </p>
                  <p className="pl-[16px] grub-muted">
                    `- <span className="system-yellow">{log.details}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
