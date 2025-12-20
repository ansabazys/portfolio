import Image from "next/image";
import hero from "../public/hero.png";
import Hero, { DemoVariant1 } from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <DemoVariant1 />
    </main>
  );
}
