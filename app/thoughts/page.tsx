import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { getPublishedEntries } from "@/lib/content";

export const metadata = constructMetadata({
  title: "Thoughts",
  description: "Short notes, observations, and ideas in progress from Ansab Azys.",
});

export default async function ThoughtsPage() {
  const entries = await getPublishedEntries("thought");
  return (
    <main className="pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
      <Container size="md">
        <header>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            thoughts
          </h1>
        </header>

        <section className="mt-5">
          {entries.length ? (
            <div>
              {entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/thoughts/${entry.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-[var(--border-subtle)] py-4 text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="font-medium text-[var(--text-primary)] underline decoration-transparent underline-offset-4 transition group-hover:decoration-current">
                    {entry.title}
                  </span>
                  {entry.published_at && (
                    <time dateTime={entry.published_at} className="shrink-0 text-sm text-[var(--text-secondary)]">
                      {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(entry.published_at))}
                    </time>
                  )}
                </Link>
              ))}
            </div>
          ) : <p className="py-4 text-sm text-[var(--text-muted)]">A collection in progress.</p>}
        </section>
      </Container>
    </main>
  );
}
