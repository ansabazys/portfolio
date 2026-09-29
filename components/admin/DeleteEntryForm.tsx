"use client";

import { deleteEntry } from "@/app/admin/actions";

export function DeleteEntryForm({ entryId, title }: { entryId: string; title: string }) {
  const action = deleteEntry.bind(null, entryId);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <button className="text-sm text-red-700 transition-colors hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
        Delete
      </button>
    </form>
  );
}
