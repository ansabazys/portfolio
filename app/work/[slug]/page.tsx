import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { projects, Project } from "@/lib/projects";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return constructMetadata({ title: "Project Not Found" });
  }

  return constructMetadata({
    title: project.title,
    description: project.description,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Navigation back */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs text-[#84837E] hover:text-[#141413] transition-colors"
          >
            <span>←</span>
            <span>Back to Work</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
            {project.category}
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#141413]">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-[#5E5D59] leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Project Meta Details */}
        <div className="border-y border-[#EAE8E2] py-6 sm:py-8 my-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Year
            </span>
            <span className="text-[#141413] font-medium font-mono">
              {project.year}
            </span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Role
            </span>
            <span className="text-[#141413] font-medium">{project.role}</span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Technologies
            </span>
            <span className="text-[#141413]">
              {project.technologies.slice(0, 3).join(", ")}
              {project.technologies.length > 3 ? "..." : ""}
            </span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Live
            </span>
            {project.externalUrl ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#141413] font-medium hover:underline"
              >
                Visit Link ↗
              </a>
            ) : (
              <span className="text-[#84837E]">Internal</span>
            )}
          </div>
        </div>

        {/* Case Study Content */}
        <article className="space-y-12 sm:space-y-16 text-base leading-relaxed text-[#5E5D59]">
          {/* Overview */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
              Overview
            </h2>
            <p>{project.overview}</p>
          </section>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 border-t border-[#EAE8E2]">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                The Problem
              </h2>
              <p className="text-base leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                The Solution
              </h2>
              <p className="text-base leading-relaxed">
                {project.solution}
              </p>
            </section>
          </div>

          {/* Key Features */}
          <section className="pt-4 border-t border-[#EAE8E2]">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              Key Capabilities
            </h2>
            <ul className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#84837E] mt-1 text-xs select-none">—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technical Decisions */}
          <section className="pt-4 border-t border-[#EAE8E2]">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              Technical Decisions
            </h2>
            <div className="space-y-6">
              {project.technicalDecisions.map((decision, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-sm font-medium text-[#141413]">
                    {decision.title}
                  </h3>
                  <p className="text-sm text-[#5E5D59] leading-relaxed">
                    {decision.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="pt-4 border-t border-[#EAE8E2]">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
              Architecture & Data Flow
            </h2>
            <p className="font-mono text-sm bg-[#F3F2EE] p-4 rounded-sm border border-[#EAE8E2] text-[#141413] leading-relaxed">
              {project.architecture}
            </p>
          </section>

          {/* Contribution & Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 border-t border-[#EAE8E2]">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                My Contribution
              </h2>
              <p className="text-base leading-relaxed">
                {project.myContribution}
              </p>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                Outcome
              </h2>
              <p className="text-base leading-relaxed">
                {project.outcome}
              </p>
            </section>
          </div>
        </article>

        {/* Bottom Pagination */}
        <nav
          aria-label="Project Navigation"
          className="mt-20 pt-8 border-t border-[#EAE8E2] flex items-center justify-between text-xs"
        >
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group flex flex-col text-left text-[#84837E] hover:text-[#141413] transition-colors"
            >
              <span className="text-[11px] uppercase tracking-wider">
                ← Previous
              </span>
              <span className="font-medium text-[#141413] mt-0.5">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col text-right text-[#84837E] hover:text-[#141413] transition-colors"
            >
              <span className="text-[11px] uppercase tracking-wider">
                Next →
              </span>
              <span className="font-medium text-[#141413] mt-0.5">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </Container>
    </main>
  );
}
