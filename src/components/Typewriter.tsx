"use client";

import React, { useState, useEffect } from "react";
import Cursor from "./Cursor";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 25,
  delay = 0,
  onComplete,
  className = "",
  showCursor = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    if (delay > 0) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    } else {
      startTimeout = setTimeout(() => setStarted(true), 0);
    }

    return () => {
      if (startTimeout) clearTimeout(startTimeout);
    };
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (text.length === 0) {
      const emptyTimeout = setTimeout(() => {
        setDone(true);
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(emptyTimeout);
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setDone(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !done && <Cursor char="█" className="ml-0.5" />}
    </span>
  );
}
