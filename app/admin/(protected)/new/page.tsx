import { EntryForm } from "@/components/admin/EntryForm";
import { Container } from "@/components/ui/Container";

export default function NewEntryPage() {
  return (
    <main className="pt-12 pb-20 sm:pt-20 md:pt-24">
      <Container size="md">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">New entry</p>
        <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Write something worth keeping.</h1>
        <EntryForm />
      </Container>
    </main>
  );
}

