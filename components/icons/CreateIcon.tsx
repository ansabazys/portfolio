import React from "react";
import { IconProps } from "./BrandIcon";
import { cn } from "@/lib/utils";

export function CreateIcon({
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
      className={cn("text-rose-500", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M15.35 11.9Q10.17 16.54 5.52 20.99C4.99 22.8 3.59 22.43 2.75 20.9C1.51 20.97 1.37 19.65 2.73 18.68Q8.17 14.54 11.89 8.47" />
      <path d="M18.21 14.93Q20.12 13.12 21.87 10.92" />
      <path d="M21.47 11.27Q20.23 10.86 19.94 9.89C19.41 9.11 19.05 8.71 19.01 8.18Q19.03 8 19.08 7.83C18.91 6.94 18.77 6.8 18.73 6.5Q17.81 5.36 17.34 5.02C15.53 3.19 13.46 2.75 12.84 3.54Q10.76 3.51 9.16 2.98Q9.61 3.64 10.24 4.44C11.87 5.71 11.67 6.25 11.84 8.69Q12.01 9.24 12.06 10.01Q13.02 10.98 14.28 11.98Q14.59 12.41 15.38 12.14C15.58 11.69 15.84 11.71 16.52 12.55Q17.62 13.46 18.46 14.33" />
    </svg>
  );
}
