import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  size = "md",
  className = "",
  as: Component = "div",
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    full: "max-w-6xl",
  };

  return (
    <Component
      className={`mx-auto w-full px-6 sm:px-8 md:px-12 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Component>
  );
}
