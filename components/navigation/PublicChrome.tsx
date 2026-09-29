"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/navigation/Footer";
import { Sidebar } from "@/components/navigation/Sidebar";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col md:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

