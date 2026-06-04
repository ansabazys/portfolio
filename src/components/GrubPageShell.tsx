import React from "react";
import WindowFrame from "./WindowFrame";

interface GrubPageShellProps {
  children: React.ReactNode;
  title?: string;
  footerLeft?: string;
  footerRight?: string;
}

export default function GrubPageShell({
  children,
  title,
  footerLeft = "Press ESC to return to previous menu.",
  footerRight,
}: GrubPageShellProps) {
  return (
    <main className="grub-screen">
      <div className="grub-title select-none">GNU GRUB  version 2.02~beta2-36ubuntu3.13</div>
      <WindowFrame showCorners={false} borderColor="border-white" textColor="text-white" className="w-full">
        {title && <div className="grub-menu-line grub-selected mb-[16px]">{title}</div>}
        <div className="grub-page-content">{children}</div>
      </WindowFrame>
      <div className="grub-footer select-none">
        <p>{footerLeft}</p>
        <p>
          Use the ↑ and ↓ keys where lists are available. Press `c` for a command-line, or F2 to toggle terminal.
          {footerRight ? ` ${footerRight}` : ""}
        </p>
      </div>
    </main>
  );
}
