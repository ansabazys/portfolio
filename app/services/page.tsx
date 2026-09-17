import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/services";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Services",
  description:
    "Specialized engineering services: SaaS Development, E-commerce, Custom Web Applications, and MVP execution.",
});

export default function ServicesPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Header */}
        <header className="mb-14 sm:mb-20">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            Services
          </h1>
          <p className="mt-4 text-base text-[#5E5D59] leading-relaxed max-w-xl">
            Engineering services focused on high-throughput architectures, resilient systems,
            and calm, intuitive user interfaces.
          </p>
        </header>

        {/* Services Editorial List */}
        <div className="space-y-16 sm:space-y-20">
          {services.map((service) => (
            <article
              key={service.id}
              className="border-t border-[#EAE8E2] pt-8 sm:pt-10"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-[#84837E] font-normal">
                  {service.number}
                </span>
                <span className="text-xs text-[#84837E] select-none">—</span>
                <h2 className="text-xl font-medium tracking-tight text-[#141413]">
                  {service.title}
                </h2>
              </div>

              <p className="text-base text-[#141413] font-medium leading-relaxed mb-4 max-w-2xl">
                {service.tagline}
              </p>

              <p className="text-sm text-[#5E5D59] leading-relaxed mb-6 max-w-2xl">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0EFEA] text-xs">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#84837E] font-medium mb-3">
                    Capabilities
                  </span>
                  <ul className="space-y-2 text-[#5E5D59]">
                    {service.capabilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#84837E] mt-0.5 select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#84837E] font-medium mb-3">
                    Deliverables
                  </span>
                  <ul className="space-y-2 text-[#5E5D59]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#84837E] mt-0.5 select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="mt-24 pt-12 border-t border-[#EAE8E2]">
          <div className="max-w-md">
            <h3 className="text-lg font-medium text-[#141413] tracking-tight">
              Have a project in mind?
            </h3>
            <p className="mt-2 text-sm text-[#5E5D59] leading-relaxed">
              Whether you are scoping a greenfield product or refactoring an existing system,
              I am available for select collaborations.
            </p>
            <div className="mt-6">
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
      </Container>
    </main>
  );
}
