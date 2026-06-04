"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cursor from "./Cursor";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const COMMAND_LIST = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "resume",
  "clear",
  "whoami",
  "neofetch",
  "sudo hire ansab",
  "rm -rf /",
  "exit",
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "system-init",
      output: (
        <div className="space-y-1 text-neutral-400">
          <p>AnsabOS v1.0 (GNU/Linux 6.8.0-ansabos x86_64)</p>
          <p>Welcome to the interactive portfolio terminal.</p>
          <p>
            Type <span className="font-bold text-yellow-500">help</span> to view available commands, or{" "}
            <span className="font-bold text-cyan-400">exit</span> to return to GRUB.
          </p>
          <p className="text-neutral-500">Shortcut: Press F2 anytime to toggle this terminal.</p>
        </div>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (command: string) => {
    const cmdClean = command.toLowerCase().trim();
    let output: React.ReactNode = null;

    if (cmdClean === "clear") {
      setHistory([]);
      return;
    }

    if (cmdClean === "exit") {
      router.push("/grub");
      return;
    }

    if (cmdClean.startsWith("sudo hire ")) {
      if (cmdClean === "sudo hire ansab") {
        output = (
          <div className="space-y-1 font-mono text-green-500">
            <p>Permission granted.</p>
            <p>Redirecting to contact services...</p>
          </div>
        );
        setTimeout(() => router.push("/contact"), 1500);
      } else {
        output = <div className="text-red-500">sudo: user not found</div>;
      }
    } else {
      switch (cmdClean) {
        case "help":
          output = (
            <div className="grid grid-cols-2 gap-2 font-mono text-sm text-neutral-400 md:grid-cols-4">
              {COMMAND_LIST.map((cmd) => (
                <div key={cmd}>{cmd}</div>
              ))}
            </div>
          );
          break;
        case "whoami":
          output = (
            <div className="font-mono text-neutral-300">
              <p>Ansab</p>
              <p>Full Stack Developer</p>
              <p>Building Traqory Analytics</p>
            </div>
          );
          break;
        case "about":
          output = (
            <div className="max-w-xl space-y-2 font-mono leading-relaxed text-neutral-300">
              <p>
                Hello, I&apos;m Ansab. I specialize in building scalable web systems, analytics platforms, and real-time backend microservices.
              </p>
              <p>Currently focusing on privacy-friendly event tracking solutions and click-stream analytics.</p>
            </div>
          );
          break;
        case "projects":
          output = (
            <div className="space-y-2 font-mono text-neutral-300">
              <div>
                <p className="font-bold text-white">- Traqory Analytics [Active]</p>
                <p className="pl-4 text-neutral-500">Privacy-friendly, real-time analytics platform using NestJS, PostgreSQL, ClickHouse.</p>
              </div>
              <div>
                <p className="font-bold text-white">- Event Tracking SDK</p>
                <p className="pl-4 text-neutral-500">A high-performance JS client SDK for ingesting client-side analytics logs without latency.</p>
              </div>
              <div>
                <p className="font-bold text-white">- Analytics Dashboard</p>
                <p className="pl-4 text-neutral-500">Responsive real-time visualization workspace for active analytics reports.</p>
              </div>
              <div>
                <p className="font-bold text-white">- Authentication Service</p>
                <p className="pl-4 text-neutral-500">OAuth2 authorization platform built with TypeScript and Docker microservices.</p>
              </div>
            </div>
          );
          break;
        case "skills":
          output = (
            <div className="space-y-2 font-mono text-neutral-300">
              <p className="text-neutral-500">$ apt list --installed</p>
              <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
                {["TypeScript", "Next.js", "React", "NestJS", "PostgreSQL", "MongoDB", "ClickHouse", "Docker", "Kubernetes", "AWS"].map((skill) => (
                  <div key={skill}>
                    <span className="font-bold text-green-500">✓</span> {skill}
                  </div>
                ))}
              </div>
            </div>
          );
          break;
        case "experience":
          output = (
            <div className="space-y-1 font-mono text-neutral-300">
              <p>[2026] Building Traqory Analytics (Lead Developer)</p>
              <p>[2025] Full Stack Development (Freelance / Contract)</p>
              <p>[2024] Backend Engineering Intern</p>
            </div>
          );
          break;
        case "contact":
          output = (
            <div className="space-y-2 font-mono text-neutral-300">
              <p>Email:    hello@ansab.dev</p>
              <p>GitHub:   github.com/ansab</p>
              <p>LinkedIn: linkedin.com/in/ansab</p>
            </div>
          );
          break;
        case "resume":
          output = (
            <div className="font-mono text-cyan-400">
              <p>Downloading resume... (ansab_resume.pdf)</p>
            </div>
          );
          if (typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "ansab_resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          break;
        case "neofetch":
          output = (
            <div className="flex flex-col gap-4 font-mono text-sm leading-tight text-neutral-300 md:flex-row">
              <pre className="select-none font-bold leading-none text-cyan-400">
{`       .---.
      /     \\
      \\.@-@./
      /\`\\_/\`\\
     //  _  \\\\
    | \\     / |
   / \\ \\___/ / \\
  /   \\     /   \\
  \\___/     \\___/`}
              </pre>
              <div className="space-y-1">
                <p className="font-bold text-cyan-400">ansab@portfolio</p>
                <p className="text-neutral-500">---------------</p>
                <p><span className="font-bold text-cyan-400">OS:</span> AnsabOS v1.0</p>
                <p><span className="font-bold text-cyan-400">Kernel:</span> Linux 6.8.0-ansabos-x86_64</p>
                <p><span className="font-bold text-cyan-400">Uptime:</span> 12 mins</p>
                <p><span className="font-bold text-cyan-400">Shell:</span> bash 5.2.21</p>
                <p><span className="font-bold text-cyan-400">Resolution:</span> CRT-1024x768</p>
                <p><span className="font-bold text-cyan-400">CPU:</span> Intel Core i9-14900K (24) @ 5.80GHz</p>
                <p><span className="font-bold text-cyan-400">Memory:</span> 8431MiB / 32768MiB (25%)</p>
              </div>
            </div>
          );
          break;
        case "rm -rf /":
          output = <div className="font-bold text-red-500">Nice try. Permissions denied: you are not root user!</div>;
          break;
        default:
          output = <div className="font-mono text-red-500">bash: {command}: command not found. Type &apos;help&apos; for available commands.</div>;
          break;
      }
    }

    setHistory((prev) => [...prev, { command, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputValue.trim();
      if (command) {
        executeCommand(command);
        setCommandHistory((prev) => [...prev, command]);
      } else {
        setHistory((prev) => [...prev, { command: "", output: null }]);
      }
      setInputValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      if (!currentInput) return;
      const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(currentInput));
      if (matches.length === 1) {
        setInputValue(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            command: inputValue,
            output: <div className="font-mono text-neutral-500">{matches.join("    ")}</div>,
          },
        ]);
        setInputValue(currentInput);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div
      className="flex h-full min-h-0 cursor-text select-text flex-col overflow-hidden bg-black text-neutral-300"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2 leading-relaxed">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            {entry.command !== "system-init" && (
              <div className="flex items-center space-x-2">
                <span className="font-bold text-green-500">ansab@portfolio:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && <div className="pl-2">{entry.output}</div>}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div className="mt-4 flex items-center space-x-2 border-t border-neutral-900 pt-2 select-none">
        <span className="font-bold text-green-500">ansab@portfolio:~$</span>
        <div className="relative flex flex-grow items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-none bg-transparent text-white caret-transparent outline-none select-text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <div
            className="absolute pointer-events-none text-white"
            style={{
              left: `${inputValue.length}ch`,
              marginLeft: "1px",
            }}
          >
            <Cursor char="█" />
          </div>
        </div>
      </div>
    </div>
  );
}
