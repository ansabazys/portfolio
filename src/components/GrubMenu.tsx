"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WindowFrame from "./WindowFrame";

interface MenuItem {
  label: string;
  route: string;
  action?: () => void;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Start AnsabOS Portfolio" , route: "/grub/system-info" },
  { label: "Projects" , route: "/projects" },
  { label: "Skills" , route: "/skills" },
  { label: "Experience" , route: "/experience" },
  { label: "Contact" , route: "/contact" },
  { label: "Resume" , route: "/resume" },
];

export default function GrubMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const triggerSelection = useCallback((index: number) => {
    const item = MENU_ITEMS[index];
    if (item.action) {
      item.action();
      return;
    }

    router.push(item.route);
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editMode) {
        if (e.key === "Escape") {
          setEditMode(false);
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : MENU_ITEMS.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < MENU_ITEMS.length - 1 ? prev + 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          triggerSelection(selectedIndex);
          break;
        case "c":
        case "C":
          e.preventDefault();
          router.push("/terminal");
          break;
        case "e":
        case "E":
          e.preventDefault();
          setEditMode(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, editMode, router, triggerSelection]);

  if (editMode) {
    return (
      <div className="grub-screen">
        <div className="grub-title select-none">GNU GRUB  version 2.02~beta2-36ubuntu3.13</div>

        <WindowFrame
          title="GRUB Entry Editor"
          showCorners={false}
          borderColor="border-white"
          textColor="text-white"
          className="w-full"
        >
          <div className="leading-[16px]">
            <div className="select-none"># Editing commands for AnsabOS v1.0</div>
            <div>set root=&apos;hd0,msdos1&apos;</div>
            <div>search --no-floppy --fs-uuid --set=root 4a7c-8822-bd5a</div>
            <div>echo &apos;Loading Linux kernel...&apos;</div>
            <div>linux /boot/vmlinuz-6.8.0-ansabos root=UUID=4a7c-8822-bd5a ro quiet splash</div>
            <div>echo &apos;Loading developer profile...&apos;</div>
            <div>initrd /boot/initrd.img-ansab-profile</div>
            <div className="mt-[16px] inline-block h-[14px] w-[8px] animate-pulse bg-white text-black" />
          </div>
        </WindowFrame>

        <div className="grub-footer select-none">
          <p>Minimum Emacs-like screen editing is supported.</p>
          <p>Press Ctrl+X or F10 to boot, ESC to discard edits and return to menu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grub-screen">
      <div className="grub-title select-none">GNU GRUB  version 2.02~beta2-36ubuntu3.13</div>

      <WindowFrame
        showCorners={false}
        borderColor="border-white"
        padding="py-2 px-0"
        textColor="text-white"
        className="w-full"
      >
        <div>
          {MENU_ITEMS.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={idx}
                className={`grub-menu-line cursor-pointer ${isSelected ? "grub-selected" : "text-white"}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => triggerSelection(idx)}
              >
                {isSelected ? `*${item.label}` : ` ${item.label}`}
              </div>
            );
          })}
        </div>
      </WindowFrame>

      <div className="grub-footer font-mono select-none">
        <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
        <p>
          Press enter to boot the selected OS, `e` to edit the commands before booting or `c` for a command-line. ESC to return previous menu.
        </p>
      </div>
    </div>
  );
}
