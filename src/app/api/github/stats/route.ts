import { getGithubStats } from "@/lib/github";
import type { GithubApiError, GithubStats } from "@/types/github";

export async function GET(): Promise<Response> {
  try {
    const stats = await getGithubStats();
    return Response.json(stats satisfies GithubStats);
  } catch {
    return Response.json(
      { message: "GitHub service unavailable." } satisfies GithubApiError,
      { status: 503 },
    );
  }
}
