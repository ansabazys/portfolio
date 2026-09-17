import React from "react";
import { Container } from "@/components/ui/Container";
import { ProjectList } from "@/components/work/ProjectList";
import { projects } from "@/lib/projects";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Work",
  description:
    "Selected engineering projects, SaaS architectures, and production systems built by Mohammed Ansab K.",
});

export default function WorkPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        <header className="mb-12 sm:mb-16">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            Work
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#5E5D59] leading-relaxed max-w-lg">
            A selection of software platforms, distributed architectures, and applications
            built for production.
          </p>
        </header>

        <ProjectList projects={projects} />
      </Container>
    </main>
  );
}
