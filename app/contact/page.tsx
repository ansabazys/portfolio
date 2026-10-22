import React from "react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Mohammed Ansab K for SaaS engineering, web development, and consulting engagements.",
});

export default function ContactPage() {
  return (
    <main className="pt-12 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-32">
      <Container size="md">
        {/* Header */}
        <header className="mb-14 sm:mb-20">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            Have a project in mind?
          </h1>
          <p className="mt-2 text-base text-[#5E5D59] leading-relaxed max-w-lg">
            Tell me what you&apos;re building. I am always happy to discuss new ideas,
            architectural challenges, or potential collaborations.
          </p>
        </header>

        <ContactForm />
      </Container>
    </main>
  );
}
