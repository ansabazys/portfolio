"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import GrubPageShell from "@/components/GrubPageShell";
import { usePinnedProjects } from "@/hooks/usePinnedProjects";
import type { GithubProject } from "@/types/github";

function toDirectoryName(projectName: string): string {
  return `${projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}/`;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default function ProjectsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { data: projects, isLoading, error } = usePinnedProjects();
  const activeIndex = projects.length > 0 ? Math.min(selectedIndex, projects.length - 1) : 0;
  const activeProject: GithubProject | null = projects[activeIndex] ?? null;

  const loadingMessages = useMemo(() => [
    "Loading GitHub profile...",
    "Loading repositories...",
    "Loading pinned projects...",
    "Loading commit history...",
    "Done.",
  ], []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (projects.length === 0 && e.key !== "Escape") return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? Math.min(prev - 1, projects.length - 1) : projects.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
          break;
        case "Escape":
          e.preventDefault();
          router.push("/grub");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length, router]);

  return (
    <GrubPageShell title="PROJECTS" footerLeft="Use the Up and Down keys to inspect pinned repositories." footerRight="Module: ACTIVE.">
      <div className="leading-[16px]">
        <p>
          <span className="system-green">ansab@portfolio:~$</span> ls projects
        </p>

        {isLoading && (
          <div className="mt-[16px] grub-muted">
            {loadingMessages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <p className="mt-[16px] system-yellow">GitHub service unavailable.</p>
        )}

        {!isLoading && !error && projects.length === 0 && (
          <p className="mt-[16px] grub-muted">No pinned repositories found.</p>
        )}

        {!isLoading && !error && projects.length > 0 && activeProject && (
          <div className="mt-[16px] grid grid-cols-1 gap-[32px] md:grid-cols-[42ch_1fr]">
            <div>
              <div className="h-[16px]" aria-hidden="true" />
              <div className="mt-[16px]">
                {projects.map((project, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      type="button"
                      key={project.githubUrl}
                      className={`grub-menu-line system-link-line cursor-pointer ${isSelected ? "system-project-selected" : "text-white"}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      {isSelected ? "*" : " "} {toDirectoryName(project.name)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p>
                <span className="system-green">ansab@portfolio</span>:{toDirectoryName(activeProject.name)}$ cat project-info
              </p>
              <div className="mt-[16px]">
                <p><span className="system-cyan">Project Name :</span> {activeProject.name}</p>
                <p><span className="system-cyan">Description  :</span> {activeProject.description ?? "No description provided."}</p>
                <p><span className="system-cyan">Language     :</span> {activeProject.language?.name ?? "Unknown"}</p>
                <p><span className="system-cyan">Stars        :</span> {activeProject.stars}</p>
                <p><span className="system-cyan">Forks        :</span> {activeProject.forks}</p>
                <p><span className="system-cyan">Topics       :</span> {activeProject.topics.length > 0 ? activeProject.topics.join(", ") : "None"}</p>
                <p><span className="system-cyan">Last Updated :</span> {formatDate(activeProject.updatedAt)}</p>
                <p>
                  <span className="system-cyan">GitHub URL   :</span>{" "}
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="grub-link">
                    {activeProject.githubUrl}
                  </a>
                </p>
                <p>
                  <span className="system-cyan">Live URL     :</span>{" "}
                  {activeProject.homepageUrl ? (
                    <a href={activeProject.homepageUrl} target="_blank" rel="noopener noreferrer" className="grub-link">
                      {activeProject.homepageUrl}
                    </a>
                  ) : (
                    "Not configured"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </GrubPageShell>
  );
}
