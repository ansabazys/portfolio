"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cursor from "./Cursor";

interface BootSequenceProps {
  onComplete?: () => void;
}

interface BootLine {
  text: string;
  delay: number;
  type?: "info" | "success" | "system";
}

const BOOT_LOGS: BootLine[] = [
  { text: "Loading AnsabOS 1.0 ...", delay: 260, type: "system" },
  { text: "Loading Linux 6.8.0-ansabos ...", delay: 220, type: "info" },
  { text: "Loading initial ramdisk ...", delay: 220, type: "info" },
  { text: "[ OK ] Mounted /home/ansab", delay: 260, type: "success" },
  { text: "[ OK ] Started portfolio.target", delay: 260, type: "success" },
  { text: "[ OK ] Started github.service", delay: 260, type: "success" },
  { text: "[ OK ] Started terminal.service", delay: 220, type: "success" },
  { text: "Entering GNU GRUB menu ...", delay: 420, type: "system" },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<BootLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    let lineIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const completeBoot = () => {
      if (onComplete) {
        onComplete();
        return;
      }

      router.push("/grub");
    };

    const printNextLine = () => {
      if (!active) return;

      if (lineIndex >= BOOT_LOGS.length) {
        timer = setTimeout(completeBoot, 500);
        return;
      }

      const currentLine = BOOT_LOGS[lineIndex];
      setDisplayedLines((prev) => [...prev, currentLine]);
      lineIndex++;
      timer = setTimeout(printNextLine, currentLine.delay);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        completeBoot();
      }
    };

    printNextLine();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      active = false;
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete, router]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const getLineClassName = (type?: BootLine["type"]) => {
    switch (type) {
      case "success":
        return "system-green";
      case "system":
        return "system-cyan";
      case "info":
      default:
        return "grub-muted";
    }
  };

  return (
    <main className="grub-screen">
      <div className="grub-title select-none">GNU GRUB  version 2.02~beta2-36ubuntu3.13</div>

      <section className="grub-panel">
        <div className="grub-menu-line grub-selected">ANSABOS BOOT SEQUENCE</div>
        <div ref={containerRef} className="grub-panel-content h-[calc(100%-15px)]">
          <div className="leading-[16px]">
            <p>
              <span className="system-green">grub&gt;</span> boot /boot/ansabos
            </p>
            <div className="mt-[16px]">
              {displayedLines.map((line, index) => (
                <p key={`${line.text}-${index}`} className={getLineClassName(line.type)}>
                  {line.text}
                </p>
              ))}
              <p className="mt-[8px] text-white">
                <Cursor char="|" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grub-footer select-none">
        <p>Minimal boot mode enabled.</p>
        <p>Press ENTER or ESC to skip to the GRUB menu.</p>
      </div>
    </main>
  );
}
