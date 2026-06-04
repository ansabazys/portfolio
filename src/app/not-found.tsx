"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cursor from "@/components/Cursor";

export default function NotFound() {
  const router = useRouter();

  const handleReboot = () => {
    router.push("/boot");
  };

  return (
    <main className="flex-1 h-full bg-black text-neutral-300 font-mono p-6 flex flex-col justify-between select-text">
      <div className="space-y-4 text-xs md:text-sm leading-tight font-jetbrains">
        <div className="text-red-500 font-bold text-lg border-b border-red-500 pb-2">
          *** KERNEL PANIC: PAGE_NOT_FOUND ***
        </div>
        <p>[    0.000000] Linux version 6.8.0-ansabos (gcc version 13.2.0)</p>
        <p>[    0.000000] CPU: 0 PID: 404 Comm: request-handler Not tainted 6.8.0-ansabos #1</p>
        <p>[    0.000000] Hardware name: Ansab-Portfolio-Server-Node</p>
        <p>[    0.000000] Call Trace:</p>
        <div className="pl-4 space-y-1 text-neutral-400">
          <p>&lt;0&gt;  show_stack+0x3c/0x44</p>
          <p>&lt;0&gt;  dump_stack_lvl+0x44/0x5c</p>
          <p>&lt;0&gt;  panic+0x100/0x2a0</p>
          <p>&lt;0&gt;  resolve_route_path+0xc4/0x12c (Error: 404 PAGE_NOT_FOUND)</p>
          <p>&lt;0&gt;  http_request_receive+0x80/0x94</p>
          <p>&lt;0&gt;  ret_from_fork+0x10/0x20</p>
        </div>
        <p>[    0.000000] ---[ end Kernel panic - not syncing: VFS: Unable to mount root fs on route ]---</p>
        <div className="text-red-500 font-bold animate-pulse mt-4">
          System halted.
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-neutral-500 text-xs flex items-center">
          <span>Awaiting keyboard interrupt</span>
          <Cursor char="█" className="ml-1" />
        </div>
        <button
          onClick={handleReboot}
          className="bg-red-950 border border-red-700 text-red-300 font-bold px-4 py-1.5 text-xs hover:bg-red-900 hover:text-white transition-colors cursor-pointer"
        >
          [REBOOT SYSTEM]
        </button>
      </div>
    </main>
  );
}
