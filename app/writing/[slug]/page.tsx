import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { articles, Article } from "@/lib/articles";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return constructMetadata({ title: "Article Not Found" });
  }

  return constructMetadata({
    title: article.title,
    description: article.description,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((a) => a.slug === slug);

  if (articleIndex === -1) {
    notFound();
  }

  const article: Article = articles[articleIndex];

  return (
    <main className="py-20 sm:py-28 md:py-32">
      <Container size="md">
        {/* Navigation back */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-xs text-[#84837E] hover:text-[#141413] transition-colors"
          >
            <span>←</span>
            <span>Back to Writing</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs text-[#84837E] mb-3 font-mono">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
            <span>·</span>
            <span>{article.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#141413] leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#5E5D59] leading-relaxed">
            {article.description}
          </p>
        </header>

        {/* Article Body */}
        <article className="border-t border-[#EAE8E2] pt-10 sm:pt-14 space-y-10 sm:space-y-12 text-sm sm:text-base leading-relaxed text-[#5E5D59]">
          {article.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-base sm:text-lg font-medium text-[#141413] tracking-tight pt-2">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {section.quote && (
                <blockquote className="my-6 border-l-2 border-[#141413] pl-4 py-1 italic text-[#141413] text-sm sm:text-base">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              )}

              {section.list && (
                <ul className="space-y-2 pt-2">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3">
                      <span className="text-[#84837E] mt-1 text-xs select-none">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Bottom Back Link */}
        <div className="mt-16 pt-8 border-t border-[#EAE8E2]">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-xs text-[#84837E] hover:text-[#141413] transition-colors"
          >
            <span>←</span>
            <span>All Articles</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
