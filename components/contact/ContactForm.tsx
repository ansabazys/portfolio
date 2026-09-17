"use client";

import React, { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate clean, quiet submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", project: "", message: "" });
    }, 600);
  };

  if (status === "success") {
    return (
      <div className="py-8 border-y border-[#EAE8E2] text-sm text-[#141413] space-y-2">
        <p className="font-medium">Message sent successfully.</p>
        <p className="text-[#5E5D59]">
          Thank you for reaching out. I typically review inquiries and reply within 24
          hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs underline text-[#84837E] hover:text-[#141413] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-wider text-[#84837E] font-medium"
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
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-[#141413] focus:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wider text-[#84837E] font-medium"
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
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-[#141413] focus:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Project Type */}
      <div className="space-y-1.5">
        <label
          htmlFor="project"
          className="block text-xs uppercase tracking-wider text-[#84837E] font-medium"
        >
          Project
        </label>
        <input
          id="project"
          type="text"
          value={formData.project}
          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          placeholder="SaaS platform, E-commerce, MVP, or consulting"
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-[#141413] focus:outline-none transition-colors rounded-none"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider text-[#84837E] font-medium"
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
          className="w-full bg-transparent border-b border-[#EAE8E2] py-2 text-sm text-[#141413] placeholder-[#B5B3AC] focus:border-[#141413] focus:outline-none transition-colors rounded-none resize-none"
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
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
