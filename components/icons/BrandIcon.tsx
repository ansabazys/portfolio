import React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export function BrandIcon({
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
      className={cn("text-emerald-600", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M14.44 9.27Q14.08 8.27 13.65 6.65C13.6 4.92 16.09 2.8 17.84 2.63Q18.75 3.39 19.33 3.15C19.74 3.03 19.98 3.27 20.01 3.35Q19.55 4.25 19.66 4.69C20.45 7.94 18.49 9.17 15.42 9.11C13.18 8.57 11.36 10.58 11.59 12.67C12.45 15.05 13.08 15.84 12.77 17.51C12.96 19.13 13.22 20.16 12.03 20.99" />
      <path d="M3.67 9.25C6 8.22 7.83 7.53 9.23 8.75C10.87 9.45 12.41 11.17 11.67 12.62C10.87 14.64 9 14.27 6.86 13.16C4.88 13.12 4.32 11.09 4.48 8.44" />
      <path d="M4.97 21.21Q12 20.35 19.09 21.07" />
    </svg>
  );
}
