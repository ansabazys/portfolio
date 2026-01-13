"use client";

import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { Menu, Moon, Plus, Sun } from "lucide-react";
import MenuModal from "../common/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export default function Header() {
  const path = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="p-5 z-20 fixed w-full lg:grid grid-cols-3 flex   dark:text-white">
      <div className="lg:flex justify-start items-center hidden ">
        <div className="flex w-full p-1 text-sm gap-5 font-light text-center font-mono">
          <Link
            href="/projects"
            className={`p-1 px-5 ${
              path == "/projects" &&
              "dark:bg-neutral-700 bg-neutral-200 shadow-sm duration-500 rounded-full"
            } dark:bg-neutral-800 bg-neutral-200 rounded-lg`}
          >
            WORKS
          </Link>
          <Link
            href="/about"
            className={`p-1 px-5 ${
              path == "/about" &&
              "dark:bg-neutral-700 bg-neutral-200 shadow-sm duration-500 rounded-full"
            } dark:bg-neutral-800 bg-neutral-200 rounded-lg`}
          >
            ABOUT
          </Link>
          <Link
            href="/blog"
            className={`p-1 px-5 ${
              path == "/blog" &&
              "dark:bg-neutral-700 bg-neutral-200 shadow-sm duration-500 rounded-full"
            } dark:bg-neutral-800 bg-neutral-200 rounded-lg`}
          >
            BLOG
          </Link>
        </div>
      </div>
      <div className="flex justify-center w-full  items-center backdrop-blur-2xl">
        <div className="flex flex-col gap-2  rounded-xs w-full relative  max-w-sm  items-center justify-center">
          <div className="flex justify-between w-full shadow-sm bg-[#fbfbfb] dark:bg-neutral-900">
            <Link href="/" className="flex gap-1 p-3 items-center  ">
              <Image
                loading="eager"
                src={Logo}
                alt="logo"
                className="w-7 md:w-6"
              />
            </Link>
            <div className="text-white p-2  flex gap-3 items-center ">
              <button className="bg-[#0033FF] md:block hidden rounded-full cursor-pointer text-sm px-6 p-2 font-mono">
                BOOK A CALL
              </button>
              <div className=" md:hidden block w-full">
                <MenuModal />
              </div>
            </div>
          </div>
          <div className="md:flex hidden justify-between bg-[#fbfbfb] shadow-sm w-full dark:bg-neutral-800 rounded-xs"></div>
        </div>
      </div>
      {/* <button onClick={toggleTheme}>
        {theme === "dark" ? (
          <Sun color="white" className="md:block hidden" />
        ) : (
          <Moon />
        )}
      </button> */}

      <div className="lg:flex hidden gap-5 justify-end items-center font-mono">
        <Link
          href="contact"
          className={`p-1 px-5 ${
            path == "/contact" &&
            "dark:bg-neutral-700 bg-neutral-200 shadow-sm duration-500 rounded-full"
          } dark:bg-neutral-800 bg-neutral-200 rounded-lg text-sm`}
        >
          CONTACT
        </Link>

        <AnimatedThemeToggler className="hidden md:block" />
      </div>
    </header>
  );
}
