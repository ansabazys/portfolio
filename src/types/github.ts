export interface GithubLanguage {
  name: string;
  color: string | null;
}

export interface GithubCommit {
  message: string;
  committedDate: string;
  url: string;
  oid: string;
  repositoryName: string;
  repositoryUrl: string;
}

export interface GithubProject {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: GithubLanguage | null;
  topics: string[];
  githubUrl: string;
  homepageUrl: string | null;
  updatedAt: string;
}

export interface GithubRepositorySummary {
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
}

export interface GithubStats {
  username: string;
  avatarUrl: string;
  followers: number;
  following: number;
  repositories: number;
  totalStars: number;
  totalForks: number;
  contributionCount: number | null;
  latestCommit: GithubCommit | null;
  latestRepositoryUpdated: GithubRepositorySummary | null;
  pinnedRepositories: GithubProject[];
}

export interface GithubApiError {
  message: "GitHub service unavailable.";
}
