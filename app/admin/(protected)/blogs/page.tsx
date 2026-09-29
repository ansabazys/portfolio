import Link from "next/link";
import { DeleteEntryForm } from "@/components/admin/DeleteEntryForm";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("entries")
    .select("id, title, published, created_at")
    .eq("kind", "blog")
    .order("created_at", { ascending: false });

  return (
    <main className="pt-12 pb-20 sm:pt-20 md:pt-24">
      <Container size="md">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Blogs</h1>
          <Link href="/admin/new" className="text-sm text-[var(--text-secondary)] hover:text-blue-600">New entry</Link>
        </div>
        <div className="mt-10 space-y-4">
          {entries?.length ? entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="min-w-0">
                <p className="truncate text-[var(--text-primary)]">{entry.title}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{entry.published ? "Published" : "Draft"}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link href={`/admin/edit/${entry.id}`} className="text-sm text-[var(--text-secondary)] hover:text-blue-600">Edit</Link>
                <DeleteEntryForm entryId={entry.id} title={entry.title} />
              </div>
            </div>
          )) : <p className="text-sm text-[var(--text-muted)]">No blog posts yet.</p>}
        </div>
      </Container>
    </main>
  );
}
