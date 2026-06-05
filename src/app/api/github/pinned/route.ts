import { getPinnedRepositories } from "@/lib/github";
import type { GithubApiError, GithubProject } from "@/types/github";

export async function GET(): Promise<Response> {
  try {
    const projects = await getPinnedRepositories();
    return Response.json(projects satisfies GithubProject[]);
  } catch {
    return Response.json(
      { message: "GitHub service unavailable." } satisfies GithubApiError,
      { status: 503 },
    );
  }
}
