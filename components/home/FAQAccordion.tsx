"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What can you help me with?",
    answer:
      "I work across branding, UI design, websites, SaaS products, and custom applications. I can help shape an idea, design the experience, build the product, or handle the whole process from design to development.",
  },
  {
    question: "Do you take on freelance projects?",
    answer:
      "Yes. I’m available for selected freelance projects, whether you need a new brand identity, a website, an application, or help turning an idea into a working product.",
  },
  {
    question: "Can you work on an existing product?",
    answer:
      "Absolutely. I can work with an existing design or codebase to improve the UI, add features, solve problems, or rethink parts of the product.",
  },
  {
    question: "How does a project usually work?",
    answer:
      "We start with a conversation about what you’re trying to build and what you need. From there, we define the scope, establish the direction, and work through the project in clear stages until it’s ready.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope. Smaller websites and identity projects can take a few weeks, while larger applications and SaaS products naturally take longer. I’ll provide a clearer timeline once I understand the project.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send me a message with a little about what you’re building, what you need help with, and your timeline. We can take it from there.",
  },
];

interface FAQAccordionProps {
  items?: FAQItem[];
  className?: string;
}

export function FAQAccordion({
  items = faqItems,
  className = "",
}: FAQAccordionProps) {
  // Single active state ensures only one item can be open at a time, or all can be closed (null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`border-b transition-colors duration-200 ${
              isOpen ? "border-blue-600" : "border-[#EAE8E2]"
            }`}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="group flex w-full items-center justify-between py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded"
              >
                <span
                  className={`text-base font-medium pr-4 transition-colors ${
                    isOpen
                      ? "text-blue-600"
                      : "text-[#141413] group-hover:text-blue-600"
                  }`}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`shrink-0 transition-colors ${
                    isOpen
                      ? "text-blue-600"
                      : "text-[#84837E] group-hover:text-blue-600"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 pt-0.5 text-sm text-[#5E5D59] leading-relaxed max-w-xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
