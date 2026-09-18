"use client";

import React, { useState } from "react";

import { siteConfig } from "@/lib/seo";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
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
    setStatus("submitting");

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
    setFormData({ name: "", email: "", project: "", message: "" });

    // Open user's default email client with pre-filled details
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus("success");
    }, 400);
  };

  if (status === "success") {
    const backupMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Project Inquiry from ${submittedData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${submittedData.name}\nEmail: ${submittedData.email}\n\n${submittedData.message}`
    )}`;

    return (
      <div className="py-8 border-y border-[#EAE8E2] text-sm text-[#141413] space-y-3">
        <p className="font-medium text-base">Inquiry initiated.</p>
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
            onClick={() => setStatus("idle")}
            className="animated-underline text-xs text-[#666561]"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 font-medium transition-colors"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-blue-600 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 font-medium transition-colors"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="name@domain.com"
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-blue-600 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Project Type */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="project"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 font-medium transition-colors"
        >
          Project
        </label>
        <input
          id="project"
          type="text"
          value={formData.project}
          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          placeholder="SaaS platform, E-commerce, MVP, or consulting"
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-blue-600 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5 group">
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider text-[#84837E] group-focus-within:text-blue-600 font-medium transition-colors"
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
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-blue-600 outline-none focus:outline-none focus-visible:outline-none transition-colors rounded-none resize-none"
        />
      </div>

      {/* Action */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#141413] hover:opacity-70 disabled:opacity-50 transition-opacity"
        >
          <span>{status === "submitting" ? "Sending..." : "Send"}</span>
        </button>
      </div>
    </form>
  );
}
