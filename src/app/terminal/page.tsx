"use client";

import Terminal from "@/components/Terminal";
import GrubPageShell from "@/components/GrubPageShell";

export default function TerminalPage() {
  return (
    <GrubPageShell
      title="GRUB COMMAND-LINE"
      footerLeft="Press ESC or type `exit` to return to the GRUB menu."
      footerRight="Command-line: ACTIVE."
    >
      <Terminal />
    </GrubPageShell>
  );
}
