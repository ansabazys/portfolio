import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base-ui/accordion";

export interface AccordionItemData {
  value: string;
  title: string;
  content: string;
}

const defaultPortfolioItems: AccordionItemData[] = [
  {
    value: "item-1",
    title: "What tech stack and engineering principles do you follow?",
    content:
      "I focus on full-stack web applications with Next.js, React, TypeScript, Node.js, and high-performance databases (PostgreSQL, ClickHouse). I prioritize Server Components, minimal bundle sizes, edge caching, and calm, accessible UI design.",
  },
  {
    value: "item-2",
    title: "What is your availability for freelance or contract roles?",
    content:
      "I am currently available for select full-stack contract roles, technical consulting, architecture audits, and greenfield MVP builds. I work across time zones with transparent asynchronous workflows.",
  },
  {
    value: "item-3",
    title: "How do you approach collaboration and shipping software?",
    content:
      "I take full-cycle ownership—from schema design and API contracts to frontend micro-interactions and CI/CD deployment pipelines. You get clear milestones, regular progress updates, and production-ready code.",
  },
];

interface Accordion5Props {
  items?: AccordionItemData[];
  className?: string;
  defaultValue?: string[];
}

const Accordion5 = ({
  items = defaultPortfolioItems,
  className = "w-full",
  defaultValue = [defaultPortfolioItems[0].value],
}: Accordion5Props) => {
  return (
    <Accordion className={className} type="multiple" defaultValue={defaultValue}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="has-[button[aria-expanded=true]]:border-blue-600 not-last:has-[button[aria-expanded=true]]:border-b-2 has-[button[aria-expanded=true]]:border-b-2 dark:has-[button[aria-expanded=true]]:border-blue-400 transition-colors"
        >
          <AccordionTrigger className="hover:no-underline font-medium text-sm text-[#141413] aria-expanded:text-blue-600 dark:aria-expanded:text-blue-400 [&[aria-expanded=true]>svg]:text-blue-600 dark:[&[aria-expanded=true]>svg]:text-blue-400">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-[#5E5D59] text-sm leading-relaxed">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordion5;
export { Accordion5 };
