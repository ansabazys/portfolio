import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase.from("entries").select("id, title, kind, published, created_at").order("created_at", { ascending: false }).limit(6);

  return (
    <main className="pt-12 pb-20 sm:pt-20 md:pt-24">
      <Container size="md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Dashboard</p>
            <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Writing workspace</h1>
          </div>
          <Link href="/admin/new" className="animated-underline text-sm font-medium text-[var(--text-primary)]">New entry</Link>
        </div>
        <section className="mt-12 border-t border-[var(--border-subtle)] pt-5">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">Recent entries</h2>
          <div className="mt-4 space-y-3">
            {entries?.length ? entries.map((entry) => (
              <div key={entry.id} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-[var(--text-primary)]">{entry.title}</span>
                <span className="shrink-0 text-[var(--text-muted)]">{entry.kind} · {entry.published ? "Published" : "Draft"}</span>
              </div>
            )) : <p className="text-sm text-[var(--text-muted)]">No entries yet. Start with a blog or thought.</p>}
          </div>
        </section>
      </Container>
    </main>
  );
}

