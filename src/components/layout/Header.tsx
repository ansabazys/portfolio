import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export default function Header() {
  return (
    <header className="p-5 grid grid-cols-3 absolute w-full">
      <nav className="md:flex hidden gap-10 place-items-start">
        <p>WORK</p>
        <p>ABOUT</p>
        <p>BLOG</p>
      </nav>

      <nav className="md:hidden">
        <p>MENU</p>
      </nav>

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
