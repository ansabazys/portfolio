"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";

export default function ResumePage() {
  const router = useRouter();
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/grub");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      setDownloadStarted(true);
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "ansab_resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <GrubPageShell title="RESUME MODULE" footerRight="Module: COMPLETED.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span>{" "}
          <span>resume --download ansab_resume.pdf</span>
        </p>
        <p className="mt-[16px]">
          <span className="system-cyan">stream:</span> Initiating binary transfer
        </p>
        <p>
          <span className="system-yellow">locate:</span> ansab_resume.pdf ...
        </p>
        <p>
          <span className={downloadStarted ? "system-green" : "system-magenta"}>
            {downloadStarted ? "success:" : "pending:"}
          </span>{" "}
          {downloadStarted ? "Download initiated successfully. Check browser downloads." : "Requesting stream transfer..."}
        </p>

        <div className="mt-[32px]">
          <p className="system-section-title">EXECUTIVE SUMMARY</p>
          <p className="mt-[16px]"><span className="system-cyan">Candidate      :</span> Ansab</p>
          <p><span className="system-magenta">Specialization :</span> Full Stack Systems Architect</p>
          <p><span className="system-yellow">Core Strengths :</span> Scalable Backend, Clickstream Ingestion, Web Interfaces</p>
          <p><span className="system-green">Technologies   :</span> TypeScript, Next.js, NestJS, ClickHouse, PostgreSQL, Docker</p>
        </div>
      </div>
    </GrubPageShell>
  );
}
