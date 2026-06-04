import React from "react";

interface CursorProps {
  className?: string;
  char?: string;
}

export default function Cursor({ className = "", char = "█" }: CursorProps) {
  return (
    <span className={`inline-block cursor-blink font-mono ${className}`} aria-hidden="true">
      {char}
    </span>
  );
}
