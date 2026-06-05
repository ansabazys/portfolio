import { getLatestCommit } from "@/lib/github";
import type { GithubApiError, GithubCommit } from "@/types/github";

export async function GET(): Promise<Response> {
  try {
    const commit = await getLatestCommit();
    return Response.json(commit satisfies GithubCommit | null);
  } catch {
    return Response.json(
      { message: "GitHub service unavailable." } satisfies GithubApiError,
      { status: 503 },
    );
  }
}
