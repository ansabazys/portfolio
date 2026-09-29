import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminIdentity } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto min-h-screen max-w-[712px] px-6 py-20 sm:px-8 md:px-12">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Admin setup</p>
        <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Connect Supabase to continue.</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">Add your Supabase URL and publishable key to <code>.env.local</code>, then add your email address to <code>ADMIN_EMAILS</code>.</p>
      </main>
    );
  }

  const admin = await getAdminIdentity();
  if (!admin) redirect("/admin/login");

  return <AdminShell email={admin.email}>{children}</AdminShell>;
}

