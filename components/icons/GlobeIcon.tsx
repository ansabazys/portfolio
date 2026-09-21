import React from "react";
import { IconProps } from "./BrandIcon";

export function GlobeIcon({
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
      <path d="M12.5 1.67C17.04 1.89 21.76 7.1 21.76 11.49C21.97 17.81 18.15 22.43 11.99 21.55C5.75 22.55 1.91 17.57 1.42 12.03C2.44 7.47 8.02 2.08 11.55 1.77Q11.78 1.54 12.5 1.42" />
      <path d="M12.45 2.18C5.23 7.7 5.86 16.43 11.59 21.5C18.28 16.33 17.74 8.24 12.18 1.97" />
      <path d="M1.83 12.15Q12 12.63 22.01 11.81" />
    </svg>
  );
}
