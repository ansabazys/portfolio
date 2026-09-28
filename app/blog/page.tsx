import { Container } from "@/components/ui/Container";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Blog",
  description: "Long-form notes on design, engineering, and building thoughtful digital products.",
});

export default function BlogPage() {
  return (
    <main className="pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
      <Container size="md">
        <header className="max-w-2xl">
          <h1 className="text-xs font-medium uppercase tracking-widest text-[#84837E]">
            Blog
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Longer notes on design, engineering, and the choices that shape thoughtful digital products.
          </p>
        </header>

        <p className="mt-14 border-t border-[#EAE8E2] pt-6 text-sm text-[var(--text-muted)]">
          New posts are on the way.
        </p>
      </Container>
    </main>
  );
}
