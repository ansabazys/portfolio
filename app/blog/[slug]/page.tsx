import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPublishedEntry } from "@/lib/content";

export default async function BlogEntryPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const entry = await getPublishedEntry("blog", slug);
  if (!entry) notFound();

  return (
    <main className="pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
      <Container size="md">
        <article className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Blog</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{entry.title}</h1>
          {entry.excerpt && <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">{entry.excerpt}</p>}
          <div className="mt-10 space-y-5 border-t border-[var(--border-subtle)] pt-6 text-base leading-relaxed text-[var(--text-secondary)]">
            {entry.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </Container>
    </main>
  );
}

