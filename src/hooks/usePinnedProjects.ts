"use client";

import { useEffect, useState } from "react";
import type { GithubProject } from "@/types/github";

interface PinnedProjectsState {
  data: GithubProject[];
  isLoading: boolean;
  error: string | null;
}

export function usePinnedProjects(): PinnedProjectsState {
  const [state, setState] = useState<PinnedProjectsState>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPinnedProjects() {
      try {
        const response = await fetch("/api/github/pinned", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("GitHub service unavailable.");
        }

        const data = (await response.json()) as GithubProject[];
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          data: [],
          isLoading: false,
          error: "GitHub service unavailable.",
        });
      }
    }

    void loadPinnedProjects();

    return () => controller.abort();
  }, []);

  return state;
}
