import React from "react";
import { IconProps } from "./BrandIcon";
import { cn } from "@/lib/utils";

export function EmailIcon({
  size = 17,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-[#2563EB]", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M21.57 7.44Q17.47 9.81 13.04 12.62C12.05 13.43 11.85 13.24 10.57 12.52Q6.27 10.22 1.94 6.78" />
      <path d="M3.53 4.57Q12 4.73 20.01 4.28C21.17 4.38 21.56 4.78 22.56 5.93Q21.08 12 22.22 17.57C22.69 19.63 21.46 19.7 19.96 20.38Q12 19.55 4.33 20.16C2.2 19.65 1.99 19.16 1.48 18.45Q1.02 12 1.99 5.67C1.66 4.28 3.01 3.8 3.52 3.6Q4.22 3.75 3.52 4.23" />
    </svg>
  );
}
