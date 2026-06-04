"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "./GrubPageShell";
import Typewriter from "./Typewriter";

export default function SystemInfo() {
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

  return (
    <GrubPageShell title="ANSABOS PORTFOLIO INFORMATION" footerRight="Status: ACTIVE.">
      <div className="space-y-[16px]">
        <p>
          User: <Typewriter text="Ansab" speed={40} delay={100} showCursor={false} />
        </p>
        <p>
          Role: <Typewriter text="Full Stack Developer" speed={40} delay={300} showCursor={false} />
        </p>
        <div>
          <p>Current Focus:</p>
          <p className="pl-[16px]">
            <Typewriter text="Building Traqory Analytics" speed={45} delay={800} showCursor={false} />
          </p>
        </div>
        <div>
          <p>Specialization:</p>
          <p className="pl-[16px]">
            <Typewriter text="- Analytics Platforms" speed={30} delay={1500} showCursor={false} />
          </p>
          <p className="pl-[16px]">
            <Typewriter text="- Full Stack Development" speed={30} delay={1800} showCursor={false} />
          </p>
          <p className="pl-[16px]">
            <Typewriter text="- Backend Architecture" speed={30} delay={2100} showCursor={false} />
          </p>
          <p className="pl-[16px]">
            <Typewriter text="- Scalable Systems" speed={30} delay={2400} showCursor={false} />
          </p>
        </div>
        <p>
          Status: <Typewriter text="Available for opportunities" speed={40} delay={2800} showCursor />
        </p>
      </div>
    </GrubPageShell>
  );
}
