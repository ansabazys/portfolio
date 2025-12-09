import Image from "next/image";
import hero from "../public/hero.png";
import Hero from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Hero />
    </main>
  );
}
