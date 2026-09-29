"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function signIn(formData: FormData) {
    setPending(true);
    setError(null);
    const { error: signInError } = await createClient().auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form action={signIn} className="mt-8 space-y-5">
      <label className="block text-sm text-[var(--text-secondary)]">
        Email
        <input name="email" type="email" autoComplete="email" required className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]" />
      </label>
      <label className="block text-sm text-[var(--text-secondary)]">
        Password
        <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]" />
      </label>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button disabled={pending} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

