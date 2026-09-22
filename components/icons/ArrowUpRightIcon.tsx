import React from "react";
import { IconProps } from "./BrandIcon";
import { cn } from "@/lib/utils";

export function ArrowUpRightIcon({
  size = 18,
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
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M13.08 4.82Q16 4.62 18.87 5.1Q19.14 8 19 10.93" />
      <path d="M18.86 5.18Q11.27 11.27 4.79 19.05" />
    </svg>
  );
}
