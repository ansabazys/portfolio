"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function CrtLayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleTerminal = useCallback(() => {
    if (pathname === "/terminal") {
      const lastPath = sessionStorage.getItem("lastPath") || "/grub";
      router.push(lastPath);
      return;
    }

    sessionStorage.setItem("lastPath", pathname);
    router.push("/terminal");
  }, [pathname, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="w-full max-w-360 h-full relative z-10">
      {children}
    </div>
  );
}
