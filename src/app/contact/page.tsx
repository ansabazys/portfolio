"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";
import Typewriter from "@/components/Typewriter";

export default function ContactPage() {
  const [commandFinished, setCommandFinished] = useState(false);
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
    <GrubPageShell title="CONTACT SERVICE" footerRight="Service: CONNECTED.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span>{" "}
          <Typewriter text="contact" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[32px] space-y-[16px]">
            <p>
              <span className="system-cyan">Email:</span>{" "}
              <a href="mailto:hello@ansab.dev" className="grub-link system-green">hello@ansab.dev</a>
            </p>
            <p>
              <span className="system-magenta">GitHub:</span>{" "}
              <a href="https://github.com/ansabazys" target="_blank" rel="noopener noreferrer" className="grub-link system-green">github.com/ansabazys</a>
            </p>
            <p>
              <span className="system-yellow">LinkedIn:</span>{" "}
              <a href="https://linkedin.com/in/ansab" target="_blank" rel="noopener noreferrer" className="grub-link system-green">linkedin.com/in/ansab</a>
            </p>
            <p className="grub-muted">
              transport: <span className="system-cyan">secure-shell</span> | status: <span className="system-green">connected</span>
            </p>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
