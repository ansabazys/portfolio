"use client";

import { useEffect, useState } from "react";
import type { GithubCommit } from "@/types/github";

interface LatestCommitState {
  data: GithubCommit | null;
  isLoading: boolean;
  error: string | null;
}

export function useLatestCommit(): LatestCommitState {
  const [state, setState] = useState<LatestCommitState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLatestCommit() {
      try {
        const response = await fetch("/api/github/latest-commit", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("GitHub service unavailable.");
        }

        const data = (await response.json()) as GithubCommit | null;
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          data: null,
          isLoading: false,
          error: "GitHub service unavailable.",
        });
      }
    }

    void loadLatestCommit();

    return () => controller.abort();
  }, []);

  return state;
}
