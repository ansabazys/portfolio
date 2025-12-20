"use client";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DemoVariant1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background */}
      <AnimatedGradientBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div>
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
            width="300px"
          />
        </div>
        <div>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg">
            This portfolio website is currently under active development, with
            new features & content coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoVariant1
