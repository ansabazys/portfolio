import type {
  GithubCommit,
  GithubLanguage,
  GithubProject,
  GithubRepositorySummary,
  GithubStats,
} from "@/types/github";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "ansabazys";
const REVALIDATE_SECONDS = 3600;

interface GraphqlError {
  message: string;
}

interface GraphqlResponse<T> {
  data?: T;
  errors?: GraphqlError[];
}

interface RepositoryTopicNode {
  topic: {
    name: string;
  };
}

interface RepositoryNode {
  id: string;
  name: string;
  description: string | null;
  homepageUrl: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: GithubLanguage | null;
  repositoryTopics: {
    nodes: RepositoryTopicNode[];
  };
  defaultBranchRef: {
    target: {
      history?: {
        nodes: GithubCommitNode[];
      };
    } | null;
  } | null;
}

interface GithubCommitNode {
  message: string;
  committedDate: string;
  url: string;
  oid: string;
  repository: {
    name: string;
    url: string;
  };
}

interface RepositoriesPage {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
  nodes: RepositoryNode[];
}

interface GithubUserNode {
  login: string;
  avatarUrl: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: RepositoriesPage;
  latestRepositoryUpdated: {
    nodes: RepositoryNode[];
  };
  pinnedItems: {
    nodes: RepositoryNode[];
  };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
}

interface GithubUserResponse {
  user: GithubUserNode | null;
}

interface GithubPinnedResponse {
  user: {
    pinnedItems: {
      nodes: RepositoryNode[];
    };
  } | null;
}

const USER_FIELDS = `
  login
  avatarUrl
  followers {
    totalCount
  }
  following {
    totalCount
  }
  contributionsCollection {
    contributionCalendar {
      totalContributions
    }
  }
`;

const REPOSITORY_FIELDS = `
  id
  name
  description
  homepageUrl
  url
  stargazerCount
  forkCount
  updatedAt
  primaryLanguage {
    name
    color
  }
  repositoryTopics(first: 10) {
    nodes {
      topic {
        name
      }
    }
  }
  defaultBranchRef {
    target {
      ... on Commit {
        history(first: 1) {
          nodes {
            message
            committedDate
            url
            oid
            repository {
              name
              url
            }
          }
        }
      }
    }
  }
`;

async function githubGraphql<TData>(
  query: string,
  variables: Record<string, string | number | boolean | null>,
): Promise<TData> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN");
  }

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL failed with ${response.status}`);
  }

  const payload = (await response.json()) as GraphqlResponse<TData>;

  if (payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message ?? "GitHub GraphQL returned no data");
  }

  return payload.data;
}

function toGithubProject(repository: RepositoryNode): GithubProject {
  return {
    name: repository.name,
    description: repository.description,
    stars: repository.stargazerCount,
    forks: repository.forkCount,
    language: repository.primaryLanguage,
    topics: repository.repositoryTopics.nodes.map((node) => node.topic.name),
    githubUrl: repository.url,
    homepageUrl: repository.homepageUrl,
    updatedAt: repository.updatedAt,
  };
}

function toRepositorySummary(repository: RepositoryNode): GithubRepositorySummary {
  return {
    name: repository.name,
    description: repository.description,
    url: repository.url,
    updatedAt: repository.updatedAt,
  };
}

function getLatestCommitFromRepositories(repositories: RepositoryNode[]): GithubCommit | null {
  const commits = repositories
    .flatMap((repository) => repository.defaultBranchRef?.target?.history?.nodes ?? [])
    .sort((a, b) => Date.parse(b.committedDate) - Date.parse(a.committedDate));

  const commit = commits[0];

  if (!commit) {
    return null;
  }

  return {
    message: commit.message,
    committedDate: commit.committedDate,
    url: commit.url,
    oid: commit.oid,
    repositoryName: commit.repository.name,
    repositoryUrl: commit.repository.url,
  };
}

async function getAllPublicRepositories(): Promise<RepositoriesPage> {
  const nodes: RepositoryNode[] = [];
  let endCursor: string | null = null;
  let hasNextPage = true;
  let totalCount = 0;

  while (hasNextPage) {
    const data: GithubUserResponse = await githubGraphql<GithubUserResponse>(
      `
        query PublicRepositories($login: String!, $cursor: String) {
          user(login: $login) {
            repositories(
              first: 100
              after: $cursor
              privacy: PUBLIC
              ownerAffiliations: OWNER
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                ${REPOSITORY_FIELDS}
              }
            }
          }
        }
      `,
      { login: GITHUB_USERNAME, cursor: endCursor },
    );

    if (!data.user) {
      throw new Error("GitHub user not found");
    }

    totalCount = data.user.repositories.totalCount;
    nodes.push(...data.user.repositories.nodes);
    hasNextPage = data.user.repositories.pageInfo.hasNextPage;
    endCursor = data.user.repositories.pageInfo.endCursor;
  }

  return {
    totalCount,
    pageInfo: {
      hasNextPage: false,
      endCursor,
    },
    nodes,
  };
}

export async function getPinnedRepositories(): Promise<GithubProject[]> {
  const data: GithubPinnedResponse = await githubGraphql<GithubPinnedResponse>(
    `
      query PinnedRepositories($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                ${REPOSITORY_FIELDS}
              }
            }
          }
        }
      }
    `,
    { login: GITHUB_USERNAME },
  );

  if (!data.user) {
    throw new Error("GitHub user not found");
  }

  return data.user.pinnedItems.nodes.map(toGithubProject);
}

export async function getGithubStats(): Promise<GithubStats> {
  const profilePromise: Promise<GithubUserResponse> = githubGraphql<GithubUserResponse>(
    `
      query GithubProfile($login: String!) {
        user(login: $login) {
          ${USER_FIELDS}
          repositories(first: 1, privacy: PUBLIC, ownerAffiliations: OWNER) {
            totalCount
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              ${REPOSITORY_FIELDS}
            }
          }
          latestRepositoryUpdated: repositories(
            first: 1
            privacy: PUBLIC
            ownerAffiliations: OWNER
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              ${REPOSITORY_FIELDS}
            }
          }
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                ${REPOSITORY_FIELDS}
              }
            }
          }
        }
      }
    `,
    { login: GITHUB_USERNAME },
  );
  const repositoriesPromise: Promise<RepositoriesPage> = getAllPublicRepositories();
  const pinnedPromise: Promise<GithubProject[]> = getPinnedRepositories();
  const [profileData, repositories, pinnedRepositories] = await Promise.all([
    profilePromise,
    repositoriesPromise,
    pinnedPromise,
  ]);

  if (!profileData.user) {
    throw new Error("GitHub user not found");
  }

  const totalStars = repositories.nodes.reduce((total, repository) => total + repository.stargazerCount, 0);
  const totalForks = repositories.nodes.reduce((total, repository) => total + repository.forkCount, 0);
  const latestRepository = profileData.user.latestRepositoryUpdated.nodes[0] ?? repositories.nodes[0] ?? null;

  return {
    username: profileData.user.login,
    avatarUrl: profileData.user.avatarUrl,
    followers: profileData.user.followers.totalCount,
    following: profileData.user.following.totalCount,
    repositories: repositories.totalCount,
    totalStars,
    totalForks,
    contributionCount: profileData.user.contributionsCollection.contributionCalendar.totalContributions,
    latestCommit: getLatestCommitFromRepositories(repositories.nodes),
    latestRepositoryUpdated: latestRepository ? toRepositorySummary(latestRepository) : null,
    pinnedRepositories,
  };
}

export async function getLatestCommit(): Promise<GithubCommit | null> {
  const repositories = await getAllPublicRepositories();

  return getLatestCommitFromRepositories(repositories.nodes);
}
