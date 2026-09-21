import React from "react";
import { IconProps } from "./BrandIcon";

export function TogetherIcon({
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
      <path d="M10.43 17.26Q12.04 17.96 12.92 18.7C13.86 19.86 14.53 19.77 15.97 19.09C15.98 18.44 16.87 17.02 16.41 15.93" />
      <path d="M13.44 14.53Q15.35 15.15 16.39 17.03C17.88 17.67 18.99 17.79 19.35 16.25C20.34 15.72 20.6 14.54 19.82 13.34Q17.2 11.92 15.4 9.82C14.62 8.15 12.45 8.57 11.15 9.77Q10.86 9.98 10.59 10.54C9.94 11.77 8.94 11.66 7.57 9.91C6.86 9.28 6.34 8.85 7.42 7.75Q8.65 5.84 10.7 4.2C12.45 2.91 14.91 2.54 17.33 3.82Q17.68 3.84 17.89 4.07C18.54 4.37 19.06 4.46 19.4 4.12Q20.22 4.61 21.04 3.81" />
      <path d="M21.12 2.93Q22.44 8.41 22.13 13.87Q21 13.79 20.04 14.11" />
      <path d="M2.61 3.07Q0.91 8.36 2.42 13.68Q4.37 18.13 9 20.06C8.82 21.41 10.78 20.8 11.31 20.72C12.35 19.32 12.22 18.3 11.49 17.19" />
      <path d="M2.98 4.03Q7 3.59 11 3.91" />
    </svg>
  );
}
