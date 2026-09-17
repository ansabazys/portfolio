import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About",
  description:
    "Background, engineering philosophy, and technical focus of Mohammed Ansab K.",
});

export default function AboutPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Header */}
        <header className="mb-14 sm:mb-20">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            About
          </h1>
          <p className="mt-4 text-2xl font-medium tracking-tight text-[#141413] leading-snug max-w-xl">
            Mohammed Ansab K is a full-stack engineer focused on building resilient web
            architectures and calm, typography-driven products.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-16 sm:space-y-20 text-base leading-relaxed text-[#5E5D59]">
          {/* Who I am */}
          <section className="border-t border-[#EAE8E2] pt-8 sm:pt-10">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              Who I Am
            </h2>
            <div className="space-y-4 max-w-2xl">
              <p>
                I am a developer who believes software should be as quiet and dependable as
                physical tools. Over the past several years, I have worked across the stack
                helping early-stage startups and established businesses build SaaS products,
                e-commerce platforms, and mission-critical internal systems.
              </p>
              <p>
                My approach sits at the intersection of robust backend systems and
                restrained, typography-led frontend engineering. I care deeply about the
                details that users rarely see directly—database indexing, bundle size, cache
                invalidation—because they dictate how fast and dependable the application feels.
              </p>
            </div>
          </section>

          {/* What I build */}
          <section className="border-t border-[#EAE8E2] pt-8 sm:pt-10">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              What I Build
            </h2>
            <div className="space-y-4 max-w-2xl">
              <p>
                I specialize in applications where latency, data integrity, and user focus
                matter:
              </p>
              <ul className="space-y-2.5 pt-1">
                <li className="flex items-start gap-3">
                  <span className="text-[#84837E] mt-1 text-xs select-none">—</span>
                  <span>
                    <strong className="text-[#141413] font-medium">SaaS Platforms:</strong>{" "}
                    Multi-tenant applications with granular permissions, Stripe billing, and
                    real-time data ingestion.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#84837E] mt-1 text-xs select-none">—</span>
                  <span>
                    <strong className="text-[#141413] font-medium">E-commerce Engines:</strong>{" "}
                    Sub-second storefronts with multi-currency checkout, optimistic carts, and
                    strict stock reservation guarantees.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#84837E] mt-1 text-xs select-none">—</span>
                  <span>
                    <strong className="text-[#141413] font-medium">
                      Offline-First Applications:
                    </strong>{" "}
                    Mobile tools using local SQLite databases and vector-clock sync for field
                    workers in zero-connectivity environments.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* How I work */}
          <section className="border-t border-[#EAE8E2] pt-8 sm:pt-10">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              How I Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div>
                <h3 className="text-sm font-medium text-[#141413] mb-2">
                  Performance by Default
                </h3>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  Speed is a feature. I prioritize Server Components, minimize client-side
                  JavaScript, leverage edge caches, and optimize database queries to ensure
                  instantaneous response times.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#141413] mb-2">
                  Architectural Simplicity
                </h3>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  Complexity is easy; simplicity requires discipline. I reach for proven,
                  predictable tools first, introducing specialized engines (like ClickHouse or
                  gRPC) only when real performance bottlenecks demand them.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#141413] mb-2">
                  Calm, Typography-Driven UX
                </h3>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  Software shouldn&apos;t shout. I avoid gratuitous decorative gimmicks, relying
                  instead on crisp typography, generous spacing, and purposeful micro-interactions.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#141413] mb-2">
                  Full-Cycle Ownership
                </h3>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  From writing API contracts and setting up migration workflows to testing
                  edge cases and configuring deployment pipelines, I take end-to-end
                  responsibility for what ships.
                </p>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="border-t border-[#EAE8E2] pt-8 sm:pt-10">
            <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-4">
              Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs pt-2">
              <div>
                <span className="block text-[#141413] font-medium mb-2">
                  Frontend
                </span>
                <p className="text-[#5E5D59] leading-relaxed">
                  Next.js, React, TypeScript, Tailwind CSS, Framer Motion
                </p>
              </div>

              <div>
                <span className="block text-[#141413] font-medium mb-2">
                  Backend
                </span>
                <p className="text-[#5E5D59] leading-relaxed">
                  Node.js, Go, Python, FastAPI, WebSockets, gRPC
                </p>
              </div>

              <div>
                <span className="block text-[#141413] font-medium mb-2">
                  Databases
                </span>
                <p className="text-[#5E5D59] leading-relaxed">
                  PostgreSQL, ClickHouse, Redis, SQLite, WatermelonDB
                </p>
              </div>

              <div>
                <span className="block text-[#141413] font-medium mb-2">
                  Infrastructure
                </span>
                <p className="text-[#5E5D59] leading-relaxed">
                  Docker, Linux, Git, Vercel, AWS, CI/CD Actions
                </p>
              </div>
            </div>
          </section>

          {/* Current Focus & Location */}
          <section className="border-t border-[#EAE8E2] pt-8 sm:pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                  Current Focus
                </h2>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  Deepening work on high-throughput columnar databases, local-first offline
                  synchronization algorithms, and exploring calm software philosophies.
                </p>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-widest text-[#84837E] font-medium mb-3">
                  Location & Availability
                </h2>
                <p className="text-sm text-[#5E5D59] leading-relaxed">
                  Living and working in Kerala, India (UTC +5:30). Available for select
                  remote contract roles, product architecture, and technical consulting.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] hover:opacity-70 transition-opacity"
                  >
                    <span>Get in touch</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
