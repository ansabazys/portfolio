import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { services, ServiceItem } from "@/lib/services";
import { projects } from "@/lib/projects";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return constructMetadata({ title: "Service Not Found" });
  }

  return constructMetadata({
    title: `${service.title} — Services`,
    description: service.description,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceIndex = services.findIndex(
    (s) => s.slug === slug || s.id === slug
  );

  if (serviceIndex === -1) {
    notFound();
  }

  const service: ServiceItem = services[serviceIndex];
  const prevService = serviceIndex > 0 ? services[serviceIndex - 1] : null;
  const nextService =
    serviceIndex < services.length - 1 ? services[serviceIndex + 1] : null;

  // Find related projects if specified
  const relatedProjects = service.featuredProjectSlugs
    ? projects.filter((p) => service.featuredProjectSlugs?.includes(p.slug))
    : [];

  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Navigation back */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs text-[#84837E] hover:text-[#141413] transition-colors"
          >
            <span>←</span>
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
            <span className="font-mono">{service.number}</span>
            <span>/</span>
            <span>Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#141413]">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-[#141413] font-medium leading-relaxed max-w-2xl">
            {service.tagline}
          </p>
          <p className="mt-3 text-base text-[#5E5D59] leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </header>

        {/* Quick Meta Specs */}
        <div className="border-y border-[#EAE8E2] py-6 sm:py-8 my-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Timeline
            </span>
            <span className="text-[#141413] font-medium font-mono">
              {service.timeline}
            </span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Model
            </span>
            <span className="text-[#141413] font-medium">Project / Retainer</span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Focus
            </span>
            <span className="text-[#141413] font-medium">End-to-End Execution</span>
          </div>

          <div>
            <span className="block text-[#84837E] uppercase tracking-wider text-[11px] mb-1">
              Availability
            </span>
            <span className="text-[#141413] font-medium">Open for Q1/Q2</span>
          </div>
        </div>

        {/* In-depth Editorial Content */}
        <article className="space-y-12 sm:space-y-16 text-base leading-relaxed text-[#5E5D59]">
          {/* Overview */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
              Overview
            </h2>
            <p className="text-base text-[#5E5D59] leading-relaxed max-w-2xl">
              {service.overview}
            </p>
          </section>

          {/* Capabilities & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 border-t border-[#EAE8E2]">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
                Capabilities & Scope
              </h2>
              <ul className="space-y-3 text-sm">
                {service.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#5E5D59]">
                    <span className="text-[#84837E] mt-0.5 text-xs select-none">—</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
                Deliverables
              </h2>
              <ul className="space-y-3 text-sm">
                {service.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#5E5D59]">
                    <span className="text-[#84837E] mt-0.5 text-xs select-none">✓</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Process / Workflow */}
          <section className="pt-4 border-t border-[#EAE8E2]">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-6">
              How We Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {service.process.map((step) => (
                <div key={step.step} className="space-y-1.5">
                  <span className="text-[11px] font-mono text-[#84837E] tracking-wider block">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-semibold text-[#141413] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6A67] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Relevant Projects */}
          {relatedProjects.length > 0 && (
            <section className="pt-4 border-t border-[#EAE8E2]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium">
                  Related Work
                </h2>
                <Link
                  href="/work"
                  className="text-xs text-[#84837E] hover:text-[#141413] transition-colors"
                >
                  All projects →
                </Link>
              </div>

              <div className="divide-y divide-[#EAE8E2]">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-[#141413] group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#84837E] truncate">
                        {project.category}
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm text-[#84837E] shrink-0 font-mono">
                      <span>{project.year}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="pt-8 border-t border-[#EAE8E2]">
            <div className="max-w-md">
              <h3 className="text-lg font-medium text-[#141413] tracking-tight">
                Interested in this service?
              </h3>
              <p className="mt-2 text-sm text-[#5E5D59] leading-relaxed">
                Tell me about your vision, goals, and timeline. I will follow up
                within 24 hours with scoping recommendations.
              </p>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:opacity-70 transition-opacity"
                >
                  <span>Start a conversation</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Bottom Pagination (Prev / Next service) */}
        <nav
          aria-label="Service Pagination"
          className="mt-20 pt-8 border-t border-[#EAE8E2] flex items-center justify-between text-xs"
        >
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="group flex flex-col text-left text-[#84837E] hover:text-[#141413] transition-colors"
            >
              <span className="text-[11px] uppercase tracking-wider">
                ← Previous Service
              </span>
              <span className="font-medium text-[#141413] text-sm mt-0.5">
                {prevService.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex flex-col text-right text-[#84837E] hover:text-[#141413] transition-colors"
            >
              <span className="text-[11px] uppercase tracking-wider">
                Next Service →
              </span>
              <span className="font-medium text-[#141413] text-sm mt-0.5">
                {nextService.title}
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
