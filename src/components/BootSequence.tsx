"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cursor from "./Cursor";

interface BootSequenceProps {
  onComplete?: () => void;
}

interface BootLine {
  text: string;
  delay: number; // ms to wait after printing this line before printing the next
  type?: "info" | "success" | "warning" | "header" | "system";
}

const BOOT_LOGS: BootLine[] = [
  { text: "AMIBIOS (C) 2026 American Megatrends, Inc.", delay: 350, type: "header" },
  { text: "BIOS Date: 06/04/26 23:53:27 Ver: 08.00.16", delay: 200, type: "info" },
  { text: "CPU: Intel(R) Core(TM) i9-14900K @ 5.80GHz", delay: 180, type: "info" },
  { text: "Speed: 5800MHz  Count: 24 (Cores)", delay: 150, type: "info" },
  { text: "Memory Test: 32768MB OK", delay: 300, type: "success" },
  { text: "PMU IP initialization... OK", delay: 100, type: "info" },
  { text: "Initializing USB Controllers ... Done.", delay: 180, type: "info" },
  { text: "Auto-Detecting AHCI Port 0.. SATA SSD 1TB", delay: 250, type: "info" },
  { text: "Auto-Detecting AHCI Port 1.. SATA HDD 2TB", delay: 150, type: "info" },
  { text: "", delay: 100 },
  { text: "Loading GNU GRUB version 2.02...", delay: 400, type: "system" },
  { text: "Booting 'AnsabOS v1.0'...", delay: 300, type: "system" },
  { text: "", delay: 150 },
  { text: "[    0.000000] Linux version 6.8.0-ansabos (gcc version 13.2.0)", delay: 120, type: "info" },
  { text: "[    0.024921] CPU0: Spectrum anomaly mitigation: Enabled", delay: 100, type: "info" },
  { text: "[    0.082301] BIOS-provided physical RAM map:", delay: 80, type: "info" },
  { text: "[    0.082305]  usable: 0000000000000000 - 000000007fffffff", delay: 50, type: "info" },
  { text: "[    0.142093] ACPI: 12 ACPI AML tables successfully acquired and loaded", delay: 100, type: "info" },
  { text: "[    0.280122] SCSI subsystem initialized", delay: 150, type: "info" },
  { text: "[    0.410982] libata version 3.00 PCIe SATA Controller", delay: 120, type: "info" },
  { text: "[    0.550102] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)", delay: 200, type: "success" },
  { text: "[    0.720811] systemd[1]: System volume mounted successfully.", delay: 150, type: "success" },
  { text: "[    0.850901] systemd[1]: Created slice User Slices.", delay: 80, type: "info" },
  { text: "[    0.930491] systemd[1]: Starting Journal Service... [ OK ]", delay: 120, type: "success" },
  { text: "[    1.080922] systemd[1]: Starting Network Time Synchronization... [ OK ]", delay: 100, type: "success" },
  { text: "", delay: 100 },
  { text: "Initializing AnsabOS Services:", delay: 150, type: "system" },
  { text: " -> Loading Developer Profile: ansab ... [ OK ]", delay: 250, type: "success" },
  { text: " -> Fetching Project Repositories ... [ OK ]", delay: 300, type: "success" },
  { text: " -> Mounting ClickHouse & PostgreSQL database ... [ OK ]", delay: 250, type: "success" },
  { text: " -> Loading Analytics Dashboard Service ... [ OK ]", delay: 200, type: "success" },
  { text: " -> Initializing contact agent (hello@ansab.dev) ... [ OK ]", delay: 200, type: "success" },
  { text: " -> Starting Terminal shell console (bash) ... [ OK ]", delay: 150, type: "success" },
  { text: "", delay: 150 },
  { text: "BOOT SUCCESSFUL. Ready.", delay: 400, type: "system" },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<BootLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    let lineIndex = 0;
    let timer: NodeJS.Timeout;

    const printNextLine = () => {
      if (!active) return;
      if (lineIndex >= BOOT_LOGS.length) {
        // Boot complete
        timer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            router.push("/grub");
          }
        }, 500);
        return;
      }

      const currentLine = BOOT_LOGS[lineIndex];
      setDisplayedLines((prev) => [...prev, currentLine]);
      const currentDelay = currentLine.delay;
      lineIndex++;

      timer = setTimeout(printNextLine, currentDelay);
    };

    printNextLine();

    // Setup ESC key listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onComplete) {
          onComplete();
        } else {
          router.push("/grub");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      active = false;
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, onComplete]);

  // Autoscroll to bottom when lines change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push("/grub");
    }
  };

  const getLineColor = (type?: string) => {
    switch (type) {
      case "header":
        return "text-neutral-200 font-bold";
      case "success":
        return "text-green-500 font-bold";
      case "warning":
        return "text-yellow-500 font-bold";
      case "system":
        return "text-cyan-400 font-bold";
      case "info":
      default:
        return "text-neutral-400";
    }
  };

  return (
    <div className="flex flex-col h-full bg-black font-mono select-none relative">
      {/* Scrollable logs screen */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none text-sm md:text-base leading-tight font-jetbrains"
      >
        {displayedLines.map((line, idx) => {
          if (!line) return null;
          return (
            <div key={idx} className={`${getLineColor(line.type)} min-h-[1.2rem] break-all`}>
              {line.text}
            </div>
          );
        })}
        <div className="text-white mt-1">
          <Cursor char="█" className="text-white ml-0.5" />
        </div>
      </div>

      {/* Footer skip instruction */}
      <div className="absolute bottom-4 right-4 bg-black border border-neutral-700 text-neutral-500 text-xs px-3 py-1 cursor-pointer hover:border-neutral-500 hover:text-neutral-300 transition-colors" onClick={handleSkip}>
        [ESC] Skip Boot Sequence
      </div>
    </div>
  );
}
