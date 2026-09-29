"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminIdentity } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function makeSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

type EntryKind = "blog" | "thought";

function isEntryKind(kind: string): kind is EntryKind {
  return kind === "blog" || kind === "thought";
}

function revalidateEntryPaths(kind: EntryKind, slug: string) {
  const path = kind === "blog" ? "/blog" : "/thoughts";
  revalidatePath(path);
  revalidatePath(`${path}/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/thoughts");
}

export async function createEntry(formData: FormData) {
  const admin = await getAdminIdentity();
  if (!admin) throw new Error("Unauthorized");

  const kind = value(formData, "kind");
  const title = value(formData, "title");
  const excerpt = value(formData, "excerpt");
  const content = value(formData, "content");
  const slug = makeSlug(value(formData, "slug") || title);
  const published = formData.get("published") === "on";

  if (!isEntryKind(kind) || !title || !content || !slug) {
    throw new Error("Add a title, content, and a valid entry type.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("entries").insert({
    user_id: admin.id,
    kind,
    title,
    slug,
    excerpt: excerpt || null,
    content,
    published,
    published_at: published ? new Date().toISOString() : null,
  });

  if (error) throw new Error(error.message);

  revalidateEntryPaths(kind, slug);
  redirect(kind === "blog" ? "/admin/blogs" : "/admin/thoughts");
}

export async function updateEntry(formData: FormData) {
  const admin = await getAdminIdentity();
  if (!admin) throw new Error("Unauthorized");

  const id = value(formData, "id");
  const kind = value(formData, "kind");
  const title = value(formData, "title");
  const excerpt = value(formData, "excerpt");
  const content = value(formData, "content");
  const slug = makeSlug(value(formData, "slug") || title);
  const published = formData.get("published") === "on";

  if (!id || !isEntryKind(kind) || !title || !content || !slug) {
    throw new Error("Add a title, content, and a valid entry type.");
  }

  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("entries")
    .select("kind, slug, published_at")
    .eq("id", id)
    .eq("user_id", admin.id)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (!existing) throw new Error("Entry not found.");

  const { error } = await supabase
    .from("entries")
    .update({
      kind,
      title,
      slug,
      excerpt: excerpt || null,
      content,
      published,
      published_at: published ? existing.published_at ?? new Date().toISOString() : null,
    })
    .eq("id", id)
    .eq("user_id", admin.id);

  if (error) throw new Error(error.message);

  revalidateEntryPaths(existing.kind as EntryKind, existing.slug);
  revalidateEntryPaths(kind, slug);
  redirect(kind === "blog" ? "/admin/blogs" : "/admin/thoughts");
}

export async function deleteEntry(id: string) {
  const admin = await getAdminIdentity();
  if (!admin) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("entries")
    .select("kind, slug")
    .eq("id", id)
    .eq("user_id", admin.id)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (!existing || !isEntryKind(existing.kind)) throw new Error("Entry not found.");

  const { error } = await supabase
    .from("entries")
    .delete()
    .eq("id", id)
    .eq("user_id", admin.id);

  if (error) throw new Error(error.message);

  revalidateEntryPaths(existing.kind, existing.slug);
  redirect(existing.kind === "blog" ? "/admin/blogs" : "/admin/thoughts");
}

