import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type EntryKind = "blog" | "thought";

export type PublishedEntry = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
};

export async function getPublishedEntries(kind: EntryKind) {
  if (!isSupabaseConfigured()) return [] as PublishedEntry[];

  const supabase = await createClient();
  const { data } = await supabase
    .from("entries")
    .select("title, slug, excerpt, content, published_at")
    .eq("kind", kind)
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (data ?? []) as PublishedEntry[];
}

export async function getPublishedEntry(kind: EntryKind, slug: string) {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("entries")
    .select("title, slug, excerpt, content, published_at")
    .eq("kind", kind)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return (data ?? null) as PublishedEntry | null;
}

