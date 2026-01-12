import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,  // ✅ replaces old "smooth"
        syncTouch: true,    // ✅ replaces old "smoothTouch"
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: true,
        overscroll: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
