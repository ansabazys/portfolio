import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { articles } from "@/lib/articles";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Writing",
  description:
    "Essays and engineering notes on distributed systems, offline architectures, and calm software design.",
});

export default function WritingPage() {
  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Header */}
        <header className="mb-14 sm:mb-20">
          <h1 className="text-xs uppercase tracking-widest text-[#84837E] font-medium select-none">
            Writing
          </h1>
          <p className="mt-4 text-base text-[#5E5D59] leading-relaxed max-w-lg">
            Thoughts, technical retrospectives, and engineering patterns gathered from
            building production applications.
          </p>
        </header>

        {/* Article Listing */}
        <div className="divide-y divide-[#EAE8E2]">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link
                href={`/writing/${article.slug}`}
                className="group block py-8 sm:py-10 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-[#84837E] mb-2 font-mono">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readingTime}</span>
                </div>

                <h2 className="text-lg font-medium text-[#141413] tracking-tight group-hover:text-[#141413] transition-transform duration-200 ease-out group-hover:translate-x-1">
                  {article.title}
                </h2>

                <p className="mt-2 text-sm text-[#5E5D59] leading-relaxed max-w-2xl">
                  {article.description}
                </p>

                <div className="mt-4 inline-flex items-center text-xs font-medium text-[#141413] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>Read article</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
