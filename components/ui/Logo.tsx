import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "h-7 w-auto", size = 28 }: LogoProps) {
  return (
    <span className="inline-flex items-center shrink-0 select-none">
      {/* Black logo for light theme */}
      <img
        src="/logo/logo-black.png"
        alt="Ansab Azys"
        width={size}
        height={size}
        draggable={false}
        className={`${className} dark:hidden block object-contain`}
      />
      {/* White logo for dark theme */}
      <img
        src="/logo/logo-white.png"
        alt="Ansab Azys"
        width={size}
        height={size}
        draggable={false}
        className={`${className} hidden dark:block object-contain`}
      />
    </span>
  );
}
