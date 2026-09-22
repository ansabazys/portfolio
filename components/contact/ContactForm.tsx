"use client";

import React, { useState } from "react";

import { siteConfig } from "@/lib/seo";
import { StatusMark } from "@/components/ui/StatusMark";
import { ArrowUpRightIcon } from "@/components/icons";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [submittedData, setSubmittedData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("running");

    const subject = encodeURIComponent(
      formData.project
        ? `Project Inquiry: ${formData.project} — ${formData.name}`
        : `Project Inquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setSubmittedData(formData);

    // Open user's default email client with pre-filled details
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus("done");
    }, 1100);
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({ name: "", email: "", project: "", message: "" });
  };

  const backupMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Project Inquiry from ${submittedData.name || "visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${submittedData.name}\nEmail: ${submittedData.email}\n\n${submittedData.message}`
  )}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 font-medium transition-colors"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="w-full bg-transparent border-b border-[#EAE8E2] dark:border-[#242321] py-2 text-sm text-[#141413] dark:text-[#EDEDEB] placeholder-[#B5B3AC] focus:border-blue-600 dark:focus:border-blue-500 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 font-medium transition-colors"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="name@domain.com"
          className="w-full bg-transparent border-b border-[#EAE8E2] dark:border-[#242321] py-2 text-sm text-[#141413] dark:text-[#EDEDEB] placeholder-[#B5B3AC] focus:border-blue-600 dark:focus:border-blue-500 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Project Type */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="project"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 font-medium transition-colors"
        >
          Project
        </label>
        <input
          id="project"
          type="text"
          value={formData.project}
          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          placeholder="SaaS platform, E-commerce, MVP, or consulting"
          className="w-full bg-transparent border-b border-[#EAE8E2] dark:border-[#242321] py-2 text-sm text-[#141413] dark:text-[#EDEDEB] placeholder-[#B5B3AC] focus:border-blue-600 dark:focus:border-blue-500 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 font-medium transition-colors"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Brief summary of your timeline, objectives, or current challenges"
          className="w-full bg-transparent border-b border-[#EAE8E2] dark:border-[#242321] py-2 text-sm text-[#141413] dark:text-[#EDEDEB] placeholder-[#B5B3AC] focus:border-blue-600 dark:focus:border-blue-500 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none resize-none"
        />
      </div>

      {/* Action */}
      <div className="pt-4 flex flex-col gap-4">
        <div className="flex items-center min-h-[40px]">
          {status === "idle" ? (
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium text-[#141413] dark:text-[#EDEDEB] bg-transparent border border-[#141413] dark:border-[#EDEDEB] rounded-none hover:bg-[#141413] hover:text-[#FAFAF8] dark:hover:bg-[#EDEDEB] dark:hover:text-[#121211] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] dark:focus-visible:ring-[#EDEDEB] transition-all cursor-pointer"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRightIcon
                size={17}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          ) : (
            <StatusMark
              status={status}
              label={status === "running" ? "Sending..." : "Success"}
              size={18}
              strokeWidth={2}
              doneColor="#22c55e"
              fontSize={14}
              strike={false}
              style={{ "--sm-label-o": "0.9" } as React.CSSProperties}
            />
          )}
        </div>

        {status === "done" && (
          <div className="mt-2 pt-6 border-t border-[#EAE8E2] text-sm text-[#141413] space-y-3">
            <p className="font-medium text-base text-[#141413]">Inquiry initiated.</p>
            <p className="text-[#5E5D59] leading-relaxed">
              Your default email application was prompted with your project details. If it didn&apos;t open automatically, you can{" "}
              <a
                href={backupMailto}
                className="animated-underline font-medium text-[#141413]"
              >
                send the email directly here
              </a>
              .
            </p>
            <p className="text-xs text-[#666561]">
              I typically review inquiries and reply within 24 hours.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="animated-underline text-xs text-[#666561] cursor-pointer"
              >
                Send another message
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
