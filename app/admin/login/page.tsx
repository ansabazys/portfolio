import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[712px] px-6 py-20 sm:px-8 md:px-12">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Admin</p>
      <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Sign in to publish.</h1>
      {isSupabaseConfigured() ? (
        <AdminLoginForm />
      ) : (
        <p className="mt-4 text-base text-[var(--text-secondary)]">Supabase has not been configured yet.</p>
      )}
    </main>
  );
}

