// "use client";

// import { ReactElement, useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//   const paragraphRef = useRef<HTMLParagraphElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const pinSectionRef = useRef<HTMLElement | null>(null);
//   useEffect(() => {
//     const paragraph = paragraphRef.current;

//     if (!paragraph) return;

//     // Split text manually just like original code
//     const text = paragraph.textContent?.trim() ?? "";
//     const words = text.split(" ");

//     paragraph.innerHTML = "";
//     words.forEach((word, i) => {
//       const span = document.createElement("span");
//       span.className =
//         "inline-block mr-1 opacity-0 translate-x-[100vw] will-change-transform";
//       span.textContent = word;
//       paragraph.appendChild(span);

//       if (i < words.length - 1) {
//         paragraph.appendChild(document.createTextNode(" "));
//       }
//     });

//     const wordElements = paragraph.querySelectorAll("span");

//     gsap.to(wordElements, {
//       x: 0,
//       opacity: 1,
//       duration: 1,
//       ease: "power2.out",
//       stagger: {
//         amount: 3,
//         from: "start",
//       },
//       scrollTrigger: {
//         trigger: pinSectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//         pin: containerRef.current,
//         anticipatePin: 1,
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, []);

//   return (
//     <main className="z-20">
//       {/* Intro Section */}
//       <section className=" flex items-center justify-center text-center text-xl">
//         <p>Scroll down to see the effect ↓</p>
//       </section>

//       {/* Spacer */}
//       <div className="h-[50vh]"></div>

//       {/* PIN SCROLL SECTION */}
//       <section ref={pinSectionRef} className="relative h-[400vh]">
//         {/* Sticky Container */}
//         <div
//           ref={containerRef}
//           className="sticky top-0 h-screen flex items-center justify-center px-[5%] overflow-hidden"
//         >
//           <p
//             ref={paragraphRef}
//             className="md:text-center text-[clamp(1.5rem,5vw,1rem)]  leading-[1.3] max-w-140 overflow-hidden"
//           >
//             Hi, I’m <strong>Ansab</strong>, a software engineer who builds web applications with
//             a design-first, UI/UX-focused approach to deliver seamless user
//             experiences.
//           </p>
//         </div>
//       </section>

//       {/* Spacer */}
//       <div className="h-[50vh]"></div>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    // Split text into words
    const text = paragraph.textContent?.trim() ?? "";
    const words = text.split(" ");

    paragraph.innerHTML = "";
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "inline-block mr-1 opacity-0 blur-sm";
      span.textContent = word;
      paragraph.appendChild(span);
      if (i < words.length - 1)
        paragraph.appendChild(document.createTextNode(" "));
    });

    const wordElements = paragraph.querySelectorAll("span");

    // GSAP animation: fade in + blur remove + slight upward movement
    gsap.to(wordElements, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">🚧</h1>
      <p
        ref={paragraphRef}
        className="text-lg md:text-2xl max-w-xl  translate-y-2"
      >
        Thanks for visiting! My portfolio is under construction as I gather all
        my projects and refine the design. I can’t wait to share my work with
        you — stay tuned for the full experience!
      </p>
    </div>
  );
}
