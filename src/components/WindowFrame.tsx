import React from "react";

interface WindowFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showCorners?: boolean;
  padding?: string;
  borderColor?: string;
  textColor?: string;
}

export default function WindowFrame({
  children,
  title,
  className = "",
  showCorners = true,
  padding = "p-6",
  borderColor = "border-neutral-600",
  textColor = "text-neutral-300",
}: WindowFrameProps) {
  if (!showCorners && borderColor === "border-white") {
    return (
      <div className={`grub-panel ${className}`}>
        {title && <div className="grub-menu-line grub-selected">{title}</div>}
        <div className={title ? "grub-panel-content h-[calc(100%-15px)]" : "grub-panel-content"}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative border ${borderColor} bg-black ${padding} font-mono ${className}`}>
      {/* Corner ASCII characters overlaying standard borders to make it look authentically ASCII */}
      {showCorners && (
        <>
          <span className="absolute -top-2.5 -left-1.5 bg-black px-1 text-neutral-500 text-sm select-none">┌</span>
          <span className="absolute -top-2.5 -right-1.5 bg-black px-1 text-neutral-500 text-sm select-none">┐</span>
          <span className="absolute -bottom-2.5 -left-1.5 bg-black px-1 text-neutral-500 text-sm select-none">└</span>
          <span className="absolute -bottom-2.5 -right-1.5 bg-black px-1 text-neutral-500 text-sm select-none">┘</span>
        </>
      )}
      {title && (
        <div className="absolute -top-3 left-6 bg-black px-2 text-white font-bold select-none">
          {title}
        </div>
      )}
      <div className={`w-full h-full ${textColor}`}>{children}</div>
    </div>
  );
}
