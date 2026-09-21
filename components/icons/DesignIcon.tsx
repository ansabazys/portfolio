import React from "react";
import { IconProps } from "./BrandIcon";

export function DesignIcon({
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
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M14.66 17.81Q9.43 15.91 3.91 15.18" />
      <path d="M18.31 2.73C19.06 1.87 19.36 1.6 20.52 2.2C21.14 2.09 21.46 2.78 21.64 4.08C21.9 4.14 22.26 4.83 21.56 5.59Q19.8 8.06 17.35 9.6C17.08 9.91 17.17 10.15 17.5 10.33Q17.65 11 18.29 11.32C19.65 12.16 19.29 13.57 18.19 14.43Q17.9 15.24 17.21 15.67C17.21 15.85 16.86 15.93 16.57 15.52Q12.82 11.18 8.25 7.36C8.08 7 8.01 6.76 8.39 6.55Q8.5 5.84 9.11 5.98C10.41 4.34 11.43 4.71 12.57 5.71Q13.39 5.95 13.72 6.78C13.7 6.79 14.1 6.78 14.22 6.8Q16.96 5.22 18.61 1.88" />
      <path d="M9.45 7.64C7.6 10.76 4.89 11.85 2.31 11.88C2.13 11.9 2.16 12.07 2.1 12.24C2.12 12.44 2.16 12.7 2.13 12.73Q5.3 17.6 9.49 21.68C9.88 22.09 10.45 21.83 10.38 21.79C12.98 20.51 15.73 16.55 16.1 14.94" />
    </svg>
  );
}
