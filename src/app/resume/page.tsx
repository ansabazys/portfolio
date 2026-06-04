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
        <p>Initiating binary stream</p>
        <p>Locating: ansab_resume.pdf ...</p>
        <p>{downloadStarted ? "Download initiated successfully. Check browser downloads." : "Requesting stream transfer..."}</p>

        <div className="mt-[32px]">
          <p>Executive Summary</p>
          <p className="mt-[16px]">Candidate:       Ansab</p>
          <p>Specialization:  Full Stack Systems Architect</p>
          <p>Core Strengths:  Scalable Backend, Clickstream Ingestion, Web Interfaces</p>
          <p>Technologies:    TypeScript, Next.js, NestJS, ClickHouse, PostgreSQL, Docker</p>
        </div>
      </div>
    </GrubPageShell>
  );
}
