import React from "react";
import { IconProps } from "./BrandIcon";
import { cn } from "@/lib/utils";

export function FreelanceIcon({
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
      className={cn("text-amber-700", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 12Q12.01 12 12 12" />
      <path d="M16.43 5.55Q16.05 5 16.21 3.93C16.14 3.55 14.89 2.43 14.48 1.78Q12 1.94 9.42 1.9C8.74 1.71 7.51 3.29 7.54 3.99Q8 5 8.25 6.16" />
      <path d="M22.27 13.29C16.6 16.76 6.74 16.49 2.15 13.11" />
      <path d="M4.25 6.54Q12 7.47 19.48 5.56C20.67 5.6 22.41 6.58 22.14 7.7Q23.25 13 22.3 18.13C22.22 19.54 21.56 20.34 20.34 20.5Q12 20.14 4.33 20.36C2.54 20.07 2.12 19.24 2.36 18.31Q3.6 13 1.63 8.01C1.78 6.73 2.42 5.91 3.95 6.44Q3.77 5.78 5.21 5.57" />
    </svg>
  );
}
