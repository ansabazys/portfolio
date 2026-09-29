import { notFound } from "next/navigation";
import { EntryForm } from "@/components/admin/EntryForm";
import { Container } from "@/components/ui/Container";
import { getAdminIdentity } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function EditEntryPage({ params }: PageProps<"/admin/edit/[id]">) {
  const { id } = await params;
  const admin = await getAdminIdentity();
  if (!admin) notFound();

  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("entries")
    .select("id, kind, title, slug, excerpt, content, published")
    .eq("id", id)
    .eq("user_id", admin.id)
    .maybeSingle();

  if (!entry || (entry.kind !== "blog" && entry.kind !== "thought")) notFound();

  return (
    <main className="pt-12 pb-20 sm:pt-20 md:pt-24">
      <Container size="md">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Edit entry</p>
        <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Refine your writing.</h1>
        <EntryForm entry={entry} />
      </Container>
    </main>
  );
}
