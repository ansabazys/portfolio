"use client";
import {
  ArrowDownToLine,
  Download,
  Dribbble,
  Instagram,
  Linkedin,
  Plus,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "../ui/text-animate";
import Link from "next/link";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function MenuModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isOpen) {
      disableBodyScroll(ref.current);
    } else {
      enableBodyScroll(ref.current);
    }

    return () => {
      if (ref.current) enableBodyScroll(ref.current);
    };
  }, [isOpen]);

  return (
    <div ref={ref}>
      <Plus
        className={`${
          isOpen ? "rotate-45" : "rotate-0"
        } duration-200 dark:text-white text-black`}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className={`${isOpen ? "opacity-100" : "opacity-0"} duration-500`}>
        {isOpen && (
          <div className="absolute gap-1 grid-rows-2 duration-500 text-black dark:text-white  w-full top-15 md:top-14 left-0">
            <div className=" w-full bg-[#fbfbfb] dark:bg-neutral-900">
              <div className="p-5  text-left flex flex-col gap-10 ">
                <div className="flex flex-col font-semibold tracking-tight gap-1 text-2xl">
                  <Link href="/about">
                    <TextAnimate animation="blurInUp">ABOUT</TextAnimate>
                  </Link>
                  <Link href="/project">
                    <TextAnimate animation="blurInUp">PROJECTS</TextAnimate>
                  </Link>
                  <Link href="/blog">
                    <TextAnimate animation="blurInUp">BLOG</TextAnimate>
                  </Link>
                  <Link href="/contact">
                    <TextAnimate animation="blurInUp">CONTACT</TextAnimate>
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <TextAnimate className="text-sm font-light text-neutral-400">
                    SOCIALS
                  </TextAnimate>
                  <div className="flex gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-3 text-white">
                  <div className="bg-[#0033FF] px-5 py-2 w-fit flex gap-2 items-center font-mono rounded-sm shadow-2xl">
                    <ArrowDownToLine className="w-5" />
                    <button>RESUME</button>
                  </div>
                  <div className="bg-[#0033FF] px-5 py-2 w-fit flex gap-2 items-center font-mono rounded-sm shadow-2xl">
                    <button>BOOK A CALL</button>
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <TextAnimate className="text-sm font-light text-neutral-400">
                    THEME
                  </TextAnimate>
                  <div>
                    <AnimatedThemeToggler />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
