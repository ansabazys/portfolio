"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const starterPrompts = [
  "What services do you offer?",
  "Tell me about Ansab's tech stack",
  "What projects have you built?",
  "How can I hire or contact Ansab?",
];

function InlineFormatting({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-inherit">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-xs"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const labelMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (labelMatch) {
        const [, label, url] = labelMatch;
        parts.push(
          <a
            key={match.index}
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {label}
          </a>
        );
      } else {
        parts.push(token);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

function FormattedMessage({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-1 leading-normal">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
        const textContent = isBullet ? trimmed.slice(2) : trimmed;

        return (
          <div
            key={idx}
            className={isBullet ? "flex items-start gap-2" : ""}
          >
            {isBullet && (
              <span className="text-[#84837E] select-none text-xs leading-5">•</span>
            )}
            <span className="flex-1 min-w-0">
              <InlineFormatting text={textContent} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for "Typing..." indicator dots
  useEffect(() => {
    if (!isLoading) {
      setTypingDots("");
      return;
    }

    const interval = setInterval(() => {
      setTypingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 380);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Typewriter effect rotating suggested prompts every ~5 seconds
  useEffect(() => {
    if (input.length > 0) return;

    const currentPrompt = starterPrompts[promptIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPrompt.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3500);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length - 1));
        }, 18);
      } else {
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % starterPrompts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, promptIndex, input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || input.trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = { role: "user", content: messageContent };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch response.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantMessage,
            };
            return updated;
          });
        }
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err?.message ||
            "Sorry, I encountered an issue connecting to the AI server. Please check GROQ_API_KEY in .env.local.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = input.trim() || displayText;
    if (!textToSend || isLoading) return;
    sendMessage(textToSend);
  };

  const handleClear = () => {
    setMessages([]);
  };

  useEffect(() => {
    const handleClearEvent = () => {
      handleClear();
    };
    window.addEventListener("clear-chat", handleClearEvent);
    return () => {
      window.removeEventListener("clear-chat", handleClearEvent);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full w-full">
      {/* Messages Stream */}
      <div className="flex-1 min-h-0 overflow-y-auto pt-1 pb-4 space-y-3.5 no-scrollbar">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pt-1 pb-2"
          >
            <h3 className="text-base font-medium text-[#141413] dark:text-[#EDEDEB] tracking-tight">
              Ansab Azys — AI Assistant
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5E5D59] dark:text-[#A3A29D]">
              Designer &amp; Full-Stack Developer based in Kerala, India. Ask anything about services, projects, tech stack, or availability.
            </p>
          </motion.div>
        ) : (
          messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-xl px-3.5 py-2 text-sm leading-normal ${
                  m.role === "user"
                    ? "bg-[#141413] dark:bg-[#EDEDEB] text-[#FAFAF8] dark:text-[#121211] font-normal"
                    : "bg-[#F3F2EE] dark:bg-[#1B1A19] text-[#141413] dark:text-[#EDEDEB] border border-[#EAE8E2] dark:border-[#242321]"
                }`}
              >
                {m.content ? (
                  <FormattedMessage content={m.content} />
                ) : (
                  isLoading && idx === messages.length - 1 && "..."
                )}
              </div>
            </motion.div>
          ))
        )}

        {isLoading && (
          <div className="text-xs text-[#84837E] pt-1 select-none flex items-center font-normal">
            <span>Typing</span>
            <span className="inline-block w-3 text-left tracking-tight">{typingDots}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="pt-4 flex items-center gap-2.5 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !input && displayText) {
              e.preventDefault();
              setInput(displayText);
            }
          }}
          placeholder={displayText || "Ask a question..."}
          disabled={isLoading}
          className="h-10 flex-1 bg-transparent border border-black dark:border-white text-[#141413] dark:text-[#EDEDEB] placeholder:text-[#84837E] text-sm px-3.5 rounded-none focus:outline-none focus:border-black dark:focus:border-white transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={(!input.trim() && !displayText) || isLoading}
          className="h-10 px-4 rounded-none border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}
