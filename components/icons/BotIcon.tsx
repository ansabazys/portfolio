import React from "react";
import { IconProps } from "./BrandIcon";

export function BotIcon({
  size = 20,
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
      <path d="M11.97 7.88Q11.5 6 11.87 4.13Q10 3.87 8.17 4.08" />
      <path d="M6.13 8.05Q12 6.43 18.26 7.62C18.64 8.17 20.21 8.56 19.71 10.27Q20.55 14 20.43 18.18C19.91 19.3 18.96 19.71 18.43 19.97Q12 20.78 6.1 19.83C5.01 19.88 4.45 19.98 3.74 17.93Q4.77 14 3.53 9.7C4.45 8.82 4.79 7.89 6.41 8.01Q6.09 8.1 6.02 8.23" />
      <path d="M1.88 13.99Q3 14.09 3.9 14.06" />
      <path d="M20.05 13.85Q21 13.73 22.07 13.83" />
      <path d="M15.08 13.07Q15.09 14 14.96 15.09" />
      <path d="M9 12.88Q9.15 14 8.93 14.94" />
    </svg>
  );
}
