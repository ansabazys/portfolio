"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cursor from "./Cursor";
import GrubPageShell from "./GrubPageShell";
import { useGithubStats } from "@/hooks/useGithubStats";
import { useLatestCommit } from "@/hooks/useLatestCommit";
import { usePinnedProjects } from "@/hooks/usePinnedProjects";

interface MenuItem {
  key: string;
  label: string;
  route: string;
}

interface TerminalLine {
  command: string;
  output: string;
}

const MENU_ITEMS: MenuItem[] = [
  { key: "1", label: "About Me", route: "/grub/system-info" },
  { key: "2", label: "Projects", route: "/projects" },
  { key: "3", label: "Skills", route: "/skills" },
  { key: "4", label: "Experience", route: "/experience" },
  { key: "5", label: "GitHub Stats", route: "/grub/system-info" },
  { key: "6", label: "Contact", route: "/contact" },
  { key: "7", label: "Resume", route: "/resume" },
  { key: "8", label: "Terminal", route: "/terminal" },
  { key: "9", label: "Analytics Dashboard", route: "/projects" },
  { key: "0", label: "Exit AnsabOS", route: "/grub" },
];

const ASCII_LOGO = String.raw`
 █████╗ ███╗   ██╗███████╗ █████╗ ██████╗
██╔══██╗████╗  ██║██╔════╝██╔══██╗██╔══██╗
███████║██╔██╗ ██║███████╗███████║██████╔╝
██╔══██║██║╚██╗██║╚════██║██╔══██║██╔══██╗
██║  ██║██║ ╚████║███████║██║  ██║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═════╝
`;

const INFO_ROWS = [
  ["User", "Ansab"],
  ["Role", "Full Stack Developer"],
  ["Focus", "Building Traqory Analytics"],
  ["OS", "AnsabOS 1.0"],
  ["Shell", "zsh 5.9"],
  ["Editor", "nvim"],
  ["Location", "Kerala, India"],
  ["Status", "Available for opportunities"],
];

const TECH_STACK = [
  ["Frontend", "React, Next.js, TypeScript", "90%"],
  ["Backend", "NestJS, Node.js, APIs", "92%"],
  ["Database", "PostgreSQL, ClickHouse, MongoDB", "80%"],
  ["DevOps", "Docker, Linux, CI/CD", "70%"],
  ["Product", "Analytics, Dashboards, UX Systems", "85%"],
];

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default function SystemInfo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [command, setCommand] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { command: "system-info", output: "profile modules mounted: info, stack, menu, github, commits" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: githubStats, isLoading: isStatsLoading, error: statsError } = useGithubStats();
  const { data: pinnedProjects, isLoading: isPinnedLoading, error: pinnedError } = usePinnedProjects();
  const { data: latestCommit, isLoading: isCommitLoading, error: commitError } = useLatestCommit();

  const commandMap = useMemo(() => {
    const map = new Map<string, MenuItem>();

    MENU_ITEMS.forEach((item) => {
      map.set(item.key, item);
      map.set(item.label.toLowerCase(), item);
      map.set(item.label.toLowerCase().replace(/\s+/g, "-"), item);
    });

    map.set("about", MENU_ITEMS[0]);
    map.set("github", MENU_ITEMS[4]);
    map.set("git", MENU_ITEMS[4]);
    map.set("stats", MENU_ITEMS[4]);
    map.set("analytics", MENU_ITEMS[8]);
    map.set("dashboard", MENU_ITEMS[8]);
    map.set("exit", MENU_ITEMS[9]);

    return map;
  }, []);

  const navigateToItem = useCallback((item: MenuItem) => {
    router.push(item.route);
  }, [router]);

  const runCommand = useCallback((rawCommand: string) => {
    const clean = rawCommand.trim().toLowerCase();
    if (!clean) return;

    if (clean === "clear") {
      setTerminalLines([]);
      return;
    }

    if (clean === "help" || clean === "menu") {
      setTerminalLines((prev) => [
        ...prev.slice(-3),
        {
          command: rawCommand,
          output: "try: 1-9, 0, about, projects, skills, experience, contact, resume, terminal, github, clear",
        },
      ]);
      return;
    }

    const item = commandMap.get(clean);
    if (item) {
      setTerminalLines((prev) => [
        ...prev.slice(-3),
        { command: rawCommand, output: `loading ${item.label.toLowerCase()}...` },
      ]);
      window.setTimeout(() => navigateToItem(item), 180);
      return;
    }

    setTerminalLines((prev) => [
      ...prev.slice(-3),
      { command: rawCommand, output: `command not found: ${rawCommand}. Type help.` },
    ]);
  }, [commandMap, navigateToItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) {
        if (e.key === "Escape") {
          inputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          router.push("/grub");
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : MENU_ITEMS.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < MENU_ITEMS.length - 1 ? prev + 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          navigateToItem(MENU_ITEMS[selectedIndex]);
          break;
        case "c":
        case "C":
          e.preventDefault();
          setTerminalOpen(true);
          window.setTimeout(() => inputRef.current?.focus(), 0);
          break;
        case "F2":
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
          break;
        default:
          if (/^\d$/.test(e.key)) {
            const index = MENU_ITEMS.findIndex((item) => item.key === e.key);
            if (index >= 0) {
              e.preventDefault();
              setSelectedIndex(index);
              navigateToItem(MENU_ITEMS[index]);
            }
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToItem, router, selectedIndex]);

  return (
    <GrubPageShell
      title="ANSABOS SYSTEM INFO"
      footerLeft="Use the Up and Down keys to inspect menu links."
      footerRight="Status: ACTIVE."
    >
      <div className="system-info-native">
        <section className="system-info-hero" aria-label="profile summary">
          <pre className="system-info-logo" aria-label="AnsabOS ASCII logo">{ASCII_LOGO}</pre>
        </section>

        <div className="system-info-native-grid">
          <section className="leading-[16px]">
            <p className="system-section-title">INFO</p>
            <div className="mt-[16px]">
              {INFO_ROWS.map(([label, value]) => (
                <p key={label}>
                  <span className="system-cyan">{label.padEnd(9, " ")}:</span> {value}
                </p>
              ))}
            </div>
          </section>

          <section className="leading-[16px]">
            <p className="system-section-title">TECH STACK</p>
            <div className="mt-[16px]">
              {TECH_STACK.map(([label, detail, percent], index) => (
                <p key={label}>
                  <span className={index % 2 === 0 ? "system-green" : "system-yellow"}>
                    {label.padEnd(9, " ")}
                  </span>
                  <span className="grub-muted"> [{percent}] </span>
                  {detail}
                </p>
              ))}
            </div>
          </section>

          <section className="leading-[16px]">
            <p className="system-section-title">MENU LINKS</p>
            <div className="mt-[16px]">
              {MENU_ITEMS.map((item, index) => {
                const selected = index === selectedIndex;
                return (
                  <button
                    type="button"
                    key={item.key}
                    className={`grub-menu-line system-link-line cursor-pointer ${selected ? "system-project-selected" : "text-white"}`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => navigateToItem(item)}
                  >
                    {selected ? ">" : " "} [{item.key}] {item.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="leading-[16px]">
            <p className="system-section-title">GITHUB STATS</p>
            {isStatsLoading && (
              <div className="mt-[16px] grub-muted">
                <p>Loading GitHub profile...</p>
                <p>Loading repositories...</p>
                <p>Loading pinned projects...</p>
                <p>Loading commit history...</p>
                <p>Done.</p>
              </div>
            )}

            {!isStatsLoading && statsError && (
              <p className="mt-[16px] system-yellow">GitHub service unavailable.</p>
            )}

            {!isStatsLoading && !statsError && githubStats && (
              <div className="mt-[16px]">
                <p><span className="system-magenta">Username     :</span> {githubStats.username}</p>
                <p><span className="system-green">Repositories :</span> {githubStats.repositories}</p>
                <p><span className="system-yellow">Followers    :</span> {githubStats.followers}</p>
                <p><span className="system-cyan">Following    :</span> {githubStats.following}</p>
                <p><span className="system-magenta">Stars        :</span> {githubStats.totalStars}</p>
                <p><span className="system-green">Forks        :</span> {githubStats.totalForks}</p>
                <p><span className="system-yellow">Contributions:</span> {githubStats.contributionCount ?? "Unavailable"}</p>
              </div>
            )}

            <div className="mt-[24px] system-commit-native">
              <p className="system-section-title">LATEST REPOSITORY</p>
              {isStatsLoading && <p className="mt-[16px] grub-muted">Loading repositories...</p>}
              {!isStatsLoading && statsError && <p className="mt-[16px] system-yellow">GitHub service unavailable.</p>}
              {!isStatsLoading && !statsError && githubStats?.latestRepositoryUpdated && (
                <div className="mt-[16px]">
                  <p className="system-green">{githubStats.latestRepositoryUpdated.name}</p>
                  <p className="grub-muted">{githubStats.latestRepositoryUpdated.description ?? "No description provided."}</p>
                  <p>{formatDate(githubStats.latestRepositoryUpdated.updatedAt)}</p>
                </div>
              )}
            </div>

            <div className="mt-[24px] system-commit-native">
              <p className="system-section-title">LATEST COMMIT</p>
              {isCommitLoading && <p className="mt-[16px] grub-muted">Loading commit history...</p>}
              {!isCommitLoading && commitError && <p className="mt-[16px] system-yellow">GitHub service unavailable.</p>}
              {!isCommitLoading && !commitError && latestCommit && (
                <div className="mt-[16px]">
                  <p className="system-green">{latestCommit.message}</p>
                  <p>{latestCommit.repositoryName}</p>
                  <p className="grub-muted">{formatDate(latestCommit.committedDate)}</p>
                  <p className="system-cyan">{latestCommit.oid.slice(0, 7)}</p>
                </div>
              )}
              {!isCommitLoading && !commitError && !latestCommit && (
                <p className="mt-[16px] grub-muted">No commit history found.</p>
              )}
            </div>

            <div className="mt-[24px] system-commit-native">
              <p className="system-section-title">PINNED PROJECTS COUNT</p>
              {isPinnedLoading && <p className="mt-[16px] grub-muted">Loading pinned projects...</p>}
              {!isPinnedLoading && pinnedError && <p className="mt-[16px] system-yellow">GitHub service unavailable.</p>}
              {!isPinnedLoading && !pinnedError && <p className="mt-[16px] system-green">{pinnedProjects.length}</p>}
            </div>
          </section>
        </div>

        {terminalOpen && (
          <form
            className="system-inline-terminal"
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(command);
              setCommand("");
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <div>
              {terminalLines.slice(-4).map((line, index) => (
                <p key={`${line.command}-${index}`}>
                  <span className="system-green">ansab@portfolio:~$</span> {line.command}
                  <span className="grub-muted"> {line.output}</span>
                </p>
              ))}
            </div>
            <label className="system-command-row">
              <span className="system-green">ansab@portfolio:~$</span>
              <span className="system-command-wrap">
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="system-command-input"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <span className="system-command-cursor" style={{ left: `${command.length}ch` }}>
                  <Cursor char="|" />
                </span>
              </span>
            </label>
          </form>
        )}
      </div>
    </GrubPageShell>
  );
}
