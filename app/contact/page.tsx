import React from "react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { KeralaTime } from "@/components/contact/KeralaTime";
import { siteConfig, constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Mohammed Ansab K for SaaS engineering, web development, and consulting engagements.",
});

export default function ContactPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Header */}
        <header className="mb-14 sm:mb-20">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            Contact
          </h1>
          <h2 className="mt-4 text-2xl font-medium tracking-tight text-[#141413]">
            Have a project in mind?
          </h2>
          <p className="mt-2 text-base text-[#5E5D59] leading-relaxed max-w-lg">
            Tell me what you&apos;re building. I am always happy to discuss new ideas,
            architectural challenges, or potential collaborations.
          </p>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
          {/* Form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          {/* Direct channels */}
          <div className="md:col-span-5 md:pl-6 space-y-8 text-sm">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#84837E] font-medium mb-1">
                Direct Email
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="animated-underline text-[#141413]"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#84837E] font-medium mb-1">
                Profiles
              </span>
              <div className="space-y-1">
                <div>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-[#141413]"
                  >
                    GitHub
                  </a>
                </div>
                <div>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-[#141413]"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#84837E] font-medium mb-1.5">
                Timezone & Local Time
              </span>
              <KeralaTime />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
