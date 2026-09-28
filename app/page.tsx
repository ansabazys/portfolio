import { Hero } from "@/components/home/Hero";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  description:
    "Ansab Azys designs and builds brands, interfaces, applications, and digital products for businesses and founders turning ideas into something real.",
});

export default function HomePage() {
  return (
    <main className="pt-12 sm:pt-20 md:pt-24 pb-6 sm:pb-8">
      <Hero />
    </main>
  );
}
