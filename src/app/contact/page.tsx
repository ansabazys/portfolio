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
          ansab@portfolio:~$ <Typewriter text="contact" speed={40} delay={300} onComplete={() => setCommandFinished(true)} />
        </p>

        {commandFinished && (
          <div className="mt-[32px] space-y-[16px]">
            <p>
              Email:    <a href="mailto:hello@ansab.dev" className="grub-link">hello@ansab.dev</a>
            </p>
            <p>
              GitHub:   <a href="https://github.com/ansab" target="_blank" rel="noopener noreferrer" className="grub-link">github.com/ansab</a>
            </p>
            <p>
              LinkedIn: <a href="https://linkedin.com/in/ansab" target="_blank" rel="noopener noreferrer" className="grub-link">linkedin.com/in/ansab</a>
            </p>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
