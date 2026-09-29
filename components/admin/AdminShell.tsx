"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/thoughts", label: "Thoughts" },
];

export function AdminShell({ children, email }: { children: React.ReactNode; email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col md:flex-row">
      <aside className="hidden h-screen w-48 shrink-0 flex-col pt-24 pl-6 pr-2 md:sticky md:top-0 md:flex">
        <nav className="flex flex-col space-y-1" aria-label="Admin navigation">
          {adminLinks.map((link) => {
            const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base transition-colors ${active ? "font-semibold text-[var(--text-primary)] underline underline-offset-4" : "text-[var(--text-secondary)] hover:text-blue-600"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 flex items-center gap-3">
          <ThemeToggle className="h-auto w-auto justify-start p-0" />
          <button onClick={signOut} className="text-sm text-[var(--text-secondary)] hover:text-blue-600">
            Sign out
          </button>
        </div>
        <p className="mt-auto pb-10 text-xs text-[var(--text-muted)]">{email}</p>
      </aside>

      <header className="sticky top-0 z-40 pointer-events-none md:hidden">
        <div className="flex w-full items-center justify-between gap-2 bg-transparent p-6">
          <Link
            href="/admin"
            aria-label="Admin home"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[var(--text-primary)] backdrop-blur-xl backdrop-saturate-150 transition-all hover:bg-white/80 dark:border-transparent dark:bg-[#121211]/50 dark:hover:bg-[#121211]/70"
          >
            <Logo className="h-5 w-5" size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/new"
              className="pointer-events-auto flex h-10 items-center justify-center rounded-full border border-white/80 bg-white/60 px-3.5 text-xs font-medium text-[var(--text-primary)] backdrop-blur-xl backdrop-saturate-150 transition-all hover:bg-white/80 hover:text-blue-600 dark:border-transparent dark:bg-[#121211]/50 dark:hover:bg-[#121211]/70 dark:hover:text-blue-400"
            >
              New entry
            </Link>
            <div className="pointer-events-auto">
              <ThemeToggle className="h-10 w-10 rounded-full border border-white/80 bg-white/60 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/80 dark:border-transparent dark:bg-[#121211]/50 dark:hover:bg-[#121211]/70" />
            </div>
          </div>
        </div>
      </header>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

