import { Hero } from "@/components/home/Hero";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  description:
    "Ansab Azys is a Full-Stack Developer building modern web applications, SaaS products and digital experiences for businesses and startups.",
});

export default function HomePage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Hero />
    </main>
  );
}
