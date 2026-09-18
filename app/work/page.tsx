import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectList } from "@/components/work/ProjectList";
import { projects } from "@/lib/projects";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Work",
  description:
    "Selected branding, product UI design, and full-stack engineering projects built by Ansab Azys.",
});

export default function WorkPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        <header className="mb-12 sm:mb-16">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            Work
          </h1>
          <p className="mt-4 text-base text-[#5E5D59] leading-relaxed max-w-lg">
            A selection of software platforms, user interfaces, and applications built for
            production.
          </p>
        </header>

        <ProjectList projects={projects} />

        {/* Work Inquiry CTA */}
        <section className="mt-20 pt-10 border-t border-[#EAE8E2]" aria-label="Work Inquiry">
          <div className="max-w-md">
            <h2 className="text-base font-medium text-[#141413] tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-2 text-sm text-[#5E5D59] leading-relaxed">
              Whether you need end-to-end design, a dedicated web application, or architectural direction, let&apos;s explore what we can create together.
            </p>
            <div className="mt-5">
              <Link
                href="/contact"
                className="animated-underline text-base font-medium text-[#141413]"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
