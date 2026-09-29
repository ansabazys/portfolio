"use client";

import { useState } from "react";
import { createEntry, updateEntry } from "@/app/admin/actions";

type EntryFormEntry = {
  id: string;
  kind: "blog" | "thought";
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
};

export function EntryForm({ entry }: { entry?: EntryFormEntry }) {
  const [kind, setKind] = useState<"blog" | "thought">(entry?.kind ?? "blog");
  const isThought = kind === "thought";
  const action = entry ? updateEntry : createEntry;

  return (
    <form action={action} className="mt-10 space-y-6">
      {entry && <input name="id" type="hidden" value={entry.id} />}
      <label className="block text-sm text-[var(--text-secondary)]">
        Type
        <select
          name="kind"
          value={kind}
          onChange={(event) => setKind(event.target.value as "blog" | "thought")}
          className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]"
        >
          <option value="blog">Blog</option>
          <option value="thought">Thought</option>
        </select>
      </label>

      <label className="block text-sm text-[var(--text-secondary)]">
        Title
        <input name="title" required defaultValue={entry?.title} className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]" />
      </label>

      {!isThought && (
        <>
          <label className="block text-sm text-[var(--text-secondary)]">
            Slug <span className="text-[var(--text-muted)]">(optional)</span>
            <input name="slug" defaultValue={entry?.slug} className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]" />
          </label>
          <label className="block text-sm text-[var(--text-secondary)]">
            Short description <span className="text-[var(--text-muted)]">(optional)</span>
            <textarea name="excerpt" rows={2} defaultValue={entry?.excerpt ?? ""} className="mt-2 w-full resize-y border-b border-[var(--border-strong)] bg-transparent py-2 text-base text-[var(--text-primary)]" />
          </label>
        </>
      )}

      <label className="block text-sm text-[var(--text-secondary)]">
        Content
        <textarea name="content" required rows={14} defaultValue={entry?.content} className="mt-2 w-full resize-y border border-[var(--border-strong)] bg-transparent p-3 text-base leading-relaxed text-[var(--text-primary)]" />
      </label>

      {isThought ? <input type="hidden" name="published" value="on" /> : <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><input name="published" type="checkbox" defaultChecked={entry?.published} /> Publish now</label>}
      <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)]">{entry ? "Update entry" : "Save entry"}</button>
    </form>
  );
}

