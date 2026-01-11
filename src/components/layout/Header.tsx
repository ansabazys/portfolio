"use client";
import { useState } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="p-5 grid grid-cols-3 fixed w-full">
      <nav className="md:flex hidden gap-10 place-items-start">
        <p>WORK</p>
        <p>ABOUT</p>
        <p>BLOG</p>
      </nav>

      <button
        className="md:hidden w-fit"
        onClick={() => setToggle((prev) => !prev)}
      >
        MENU
      </button>

      {toggle && (
        <section className="absolute p-5 w-full h-screen flex flex-col items-start gap-10 backdrop-blur-lg">
          <button onClick={() => setToggle((prev) => !prev)}>CLOSE</button>
          <ul className="text-4xl flex flex-col gap-2 font-semibold tracking-tight">
            <li>WORK</li>
            <li>ABOUT</li>
            <li>BLOG</li>
            <li>CONTACT</li>
          </ul>
        </section>
      )}

      <div className="place-items-center">
        <h1 className="">ANSAB AZYS</h1>
      </div>
      <div className="flex items-center gap-10 justify-end ">
        <p className="hidden md:block">CONTACT</p>
        <AnimatedThemeToggler />
      </div>
    </header>
  );
}
