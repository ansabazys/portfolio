import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPublishedEntry } from "@/lib/content";

export default async function ThoughtEntryPage({ params }: PageProps<"/thoughts/[slug]">) {
  const { slug } = await params;
  const entry = await getPublishedEntry("thought", slug);
  if (!entry) notFound();
  const readMinutes = Math.max(1, Math.ceil(entry.content.trim().split(/\s+/).filter(Boolean).length / 200));
  const publishedDate = entry.published_at
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(entry.published_at))
    : null;

  return (
    <main className="pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
      <Container size="md">
        <article className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{entry.title}</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {publishedDate && <time dateTime={entry.published_at ?? undefined}>{publishedDate}</time>}
            {publishedDate && " • "}
            {readMinutes} min read
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--text-secondary)]">
            {entry.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </Container>
    </main>
  );
}

