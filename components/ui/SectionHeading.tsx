import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 md:mb-12 ${className}`}>
      <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-[#5E5D59] leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
