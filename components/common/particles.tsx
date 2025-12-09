"use client";
import { Particles } from "../ui/particles";
import { useTheme } from "next-themes";

export default function BgParticles() {
  const { theme } = useTheme();

  console.log(theme)

  return (
    <Particles
      className="h-screen"
      color={theme === "dark" ? "#ffffff" : "black"}
    />
  );
}
