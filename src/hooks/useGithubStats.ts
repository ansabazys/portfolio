"use client";

import { useEffect, useState } from "react";
import type { GithubStats } from "@/types/github";

interface GithubStatsState {
  data: GithubStats | null;
  isLoading: boolean;
  error: string | null;
}

export function useGithubStats(): GithubStatsState {
  const [state, setState] = useState<GithubStatsState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubStats() {
      try {
        const response = await fetch("/api/github/stats", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("GitHub service unavailable.");
        }

        const data = (await response.json()) as GithubStats;
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

    void loadGithubStats();

    return () => controller.abort();
  }, []);

  return state;
}
