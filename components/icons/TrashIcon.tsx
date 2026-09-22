import React from "react";
import { IconProps } from "./BrandIcon";

export function TrashIcon({
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
      <path d="M10.06 11.09Q10.42 14 10.12 16.85" />
      <path d="M14.04 11.04Q13.41 14 14.15 17.04" />
      <path d="M18.56 6.11Q20.12 13 18.84 20.54C19.35 20.86 17.74 21.98 17.09 21.43Q12 21.88 7.46 22.37C5.65 21.88 5.5 20.97 5.41 20.06Q5.13 13 4.79 5.59" />
      <path d="M2.79 5.94Q12 6.74 20.84 5.81" />
      <path d="M8.4 6.46Q8.45 5 8.02 4.18C7.72 2.88 9.16 1.62 10.58 2.35Q12 2.77 14.56 1.76C14.92 2.24 15.56 2.8 15.75 4.03Q16.44 5 15.79 5.79" />
    </svg>
  );
}
