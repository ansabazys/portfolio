import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { getPublishedEntries } from "@/lib/content";

export const metadata = constructMetadata({
  title: "Blog",
  description: "Long-form notes on design, engineering, and building thoughtful digital products.",
});

export default async function BlogPage() {
  const entries = await getPublishedEntries("blog");
  return (
    <main className="pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
      <Container size="md">
        <header className="max-w-2xl">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            blog
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Longer notes on design, engineering, and the choices that shape thoughtful digital products.
          </p>
        </header>

        <section className="mt-14 border-t border-[var(--border-subtle)] pt-6">
          {entries.length ? (
            <div className="space-y-6">
              {entries.map((entry) => (
                <article key={entry.slug}>
                  <Link href={`/blog/${entry.slug}`} className="text-base font-medium text-[var(--text-primary)] underline decoration-transparent underline-offset-4 transition hover:decoration-current">
                    {entry.title}
                  </Link>
                  {entry.excerpt && <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{entry.excerpt}</p>}
                </article>
              ))}
            </div>
          ) : <p className="text-sm text-[var(--text-muted)]">New posts are on the way.</p>}
        </section>
      </Container>
    </main>
  );
}
