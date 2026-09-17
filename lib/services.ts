export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  timeline: string;
  capabilities: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  featuredProjectSlugs?: string[];
}

export const services: ServiceItem[] = [
  {
    id: "brand-identity",
    slug: "brand-identity",
    number: "01",
    title: "Brand & Identity",
    tagline: "Logos, visual identities, and cohesive brand systems designed for longevity and digital presence.",
    description: "A strong brand is more than just a logo—it is a visual language that builds trust, sets you apart from competitors, and creates instant recognition. I craft complete brand systems tailored for modern digital companies.",
    overview: "From early-stage startups searching for their visual anchor to established companies refreshing their market presence, I create thoughtful, systematic brand identities. Every asset is created with digital-first application in mind, ensuring crisp rendering across screens, typography scales, and marketing collateral.",
    timeline: "2–3 weeks",
    capabilities: [
      "Visual identity strategy and brand positioning",
      "Primary, secondary, and sub-mark logo systems",
      "Typography selection and typographic hierarchies",
      "Curated color palettes (light, dark, and accessible modes)",
      "Digital brand guidelines and design token documentation"
    ],
    deliverables: [
      "Vector logo assets (SVG, EPS, high-res PNG)",
      "Comprehensive Brand Style Guide (PDF & web tokens)",
      "Social media kit, favicon package, and email templates",
      "Component-ready design tokens for web developers"
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Alignment",
        description: "Understanding your company vision, competitive landscape, target audience, and brand personality."
      },
      {
        step: "02",
        title: "Creative Direction & Concepts",
        description: "Exploring distinct visual directions through curated moodboards, font pairings, and initial logo marks."
      },
      {
        step: "03",
        title: "Refinement & Systems",
        description: "Polishing the chosen concept, stress-testing across devices, and constructing the complete asset ecosystem."
      },
      {
        step: "04",
        title: "Delivery & Documentation",
        description: "Exporting production-ready vector assets and assembling an intuitive brand guideline for your team."
      }
    ]
  },
  {
    id: "product-ui-design",
    slug: "product-ui-design",
    number: "02",
    title: "Product & UI Design",
    tagline: "Interfaces, user flows, and thoughtful design systems engineered for clarity and delightful interactions.",
    description: "Digital products should feel intuitive from the first click. I design web and mobile user interfaces that reduce cognitive friction, elevate brand perception, and guide users effortlessly through critical workflows.",
    overview: "Great UI design is where aesthetics meet engineering precision. I craft component-driven interface designs in Figma that translate directly to production code with zero ambiguity. By focusing on typography, whitespace, and micro-interactions, your application feels premium and effortless to use.",
    timeline: "3–5 weeks",
    capabilities: [
      "User research, mental model mapping, and journey flows",
      "High-fidelity wireframes and interactive prototypes",
      "Component-driven Figma design systems and variant libraries",
      "Information architecture and navigation hierarchies",
      "Accessibility audits (WCAG 2.1 AA compliance)"
    ],
    deliverables: [
      "Complete Figma source file with organized autolayout components",
      "Interactive click-through prototype for user testing",
      "Responsive layouts (Mobile, Tablet, Desktop, Wide)",
      "Developer handoff documentation with spacing tokens and states"
    ],
    process: [
      {
        step: "01",
        title: "UX Architecture",
        description: "Mapping out user personas, primary pathways, data tables, and edge cases before drawing high-fidelity pixels."
      },
      {
        step: "02",
        title: "Design System Foundation",
        description: "Establishing typography, color variables, spacing grids, and atomic UI building blocks."
      },
      {
        step: "03",
        title: "Core Screen Design",
        description: "Designing the primary screens, interactive states (hover, active, disabled, loading, empty), and modal flows."
      },
      {
        step: "04",
        title: "Prototype & Handoff",
        description: "Linking flows for review, conducting user walk-throughs, and preparing pixel-perfect developer specs."
      }
    ],
    featuredProjectSlugs: ["traqory", "healix"]
  },
  {
    id: "web-development",
    slug: "web-development",
    number: "03",
    title: "Web Development",
    tagline: "High-performance websites and digital experiences built with modern frontend engineering and care.",
    description: "From marketing landing pages to full-scale corporate websites, I develop web experiences that are blazing fast, accessible, and structured for organic search engine dominance.",
    overview: "Using Next.js, React, and Tailwind CSS, I build modern web applications with minimal client bundle sizes and sub-second page loads. Every page is optimized for Core Web Vitals, responsive across all screen sizes, and integrated with headless CMS platforms or databases when required.",
    timeline: "2–4 weeks",
    capabilities: [
      "Next.js App Router and React Server Components",
      "Tailwind CSS styling with responsive, fluid typography",
      "Smooth micro-interactions and animations with Framer Motion",
      "Technical SEO, OpenGraph images, and semantic HTML5",
      "Headless CMS integration (Sanity, Strapi, Markdown/MDX)"
    ],
    deliverables: [
      "Production-ready Next.js / TypeScript codebase",
      "100/100 Lighthouse performance and SEO score guarantee",
      "Automated Vercel / Netlify CI/CD deployment pipeline",
      "Full documentation for content updates and future maintenance"
    ],
    process: [
      {
        step: "01",
        title: "Technical Scoping",
        description: "Selecting optimal architectural patterns, static vs dynamic generation strategies, and hosting targets."
      },
      {
        step: "02",
        title: "Component Architecture",
        description: "Building reusable, accessible UI primitives matching the exact visual specifications."
      },
      {
        step: "03",
        title: "Content & Interactivity",
        description: "Integrating CMS or static markdown content, metadata pipelines, and refined micro-animations."
      },
      {
        step: "04",
        title: "Audit, Test & Launch",
        description: "Running cross-browser checks, Core Web Vitals optimizations, domain routing, and DNS configuration."
      }
    ],
    featuredProjectSlugs: ["traqory", "purchase-management-system"]
  },
  {
    id: "application-development",
    slug: "application-development",
    number: "04",
    title: "Application Development",
    tagline: "SaaS products, analytical dashboards, and custom full-stack applications engineered for scale.",
    description: "For startups and businesses needing custom digital tools, I build robust full-stack applications with resilient databases, secure authentication, and real-time synchronization.",
    overview: "I take full-cycle ownership of complex web products—from database modeling in PostgreSQL to edge workers and rich frontend dashboards. Whether you are creating a real-time SaaS platform, an internal operational tool, or an automation pipeline, I deliver production-ready software that scales gracefully.",
    timeline: "4–8 weeks",
    capabilities: [
      "Full-stack Next.js, Node.js, and TypeScript development",
      "Relational & analytical database design (PostgreSQL, ClickHouse)",
      "Authentication & authorization (NextAuth, Clerk, custom RBAC)",
      "Payment gateways & recurring billing (Stripe Elements & Billing)",
      "Asynchronous background queues, WebSockets, and third-party APIs"
    ],
    deliverables: [
      "Enterprise-grade full-stack web application repository",
      "Fully documented REST or tRPC API contracts",
      "Automated testing suite and Docker deployment configuration",
      "Database migration scripts and infrastructure documentation"
    ],
    process: [
      {
        step: "01",
        title: "Schema & Architecture",
        description: "Designing the relational database model, tenant isolation strategy, and security boundaries."
      },
      {
        step: "02",
        title: "Core Engine & APIs",
        description: "Building out authenticated routes, data mutations, background workers, and business logic."
      },
      {
        step: "03",
        title: "Dashboard & Front-End",
        description: "Constructing server-rendered data tables, interactive charts, and optimistic UI mutations."
      },
      {
        step: "04",
        title: "Security & Production Go-Live",
        description: "Conducting load testing, rate limiting, SSL setup, error telemetry, and production deployment."
      }
    ],
    featuredProjectSlugs: ["traqory", "healix", "purchase-management-system"]
  },
  {
    id: "ecommerce-development",
    slug: "ecommerce-development",
    number: "05",
    title: "E-commerce Development",
    tagline: "Editorial, high-conversion digital storefronts that load instantly and convert effortlessly.",
    description: "Modern commerce requires more than just templates. I construct bespoke shopping experiences that prioritize typographic elegance, speed, and frictionless checkout.",
    overview: "By combining Next.js Incremental Static Regeneration with edge caching and optimistic cart states, your storefront feels immediate across any mobile device or network condition. From multi-currency support to custom merchant portals, every layer is engineered for conversion.",
    timeline: "3–6 weeks",
    capabilities: [
      "Headless storefronts powered by Next.js App Router and Edge ISR",
      "Multi-currency pricing, localized tax, and internationalization",
      "Optimistic cart state and real-time inventory locking",
      "Stripe, custom payment gateways, and one-click checkout flows",
      "Custom merchant backoffices for order and catalog operations"
    ],
    deliverables: [
      "High-performance responsive storefront (98+ Core Web Vitals)",
      "Secure checkout integration with webhook verification",
      "Inventory synchronization and order management system",
      "Analytics and conversion event attribution setup"
    ],
    process: [
      {
        step: "01",
        title: "Catalog Modeling",
        description: "Structuring product variants, inventory state, and multi-currency pricing matrix."
      },
      {
        step: "02",
        title: "Storefront Engineering",
        description: "Building lightning-fast product detail pages with static generation and instant image caching."
      },
      {
        step: "03",
        title: "Cart & Checkout Flow",
        description: "Integrating seamless checkout flows, promo code redemption, and secure payment processing."
      },
      {
        step: "04",
        title: "Fulfillment & Go-Live",
        description: "Connecting shipping webhooks, transactional email triggers, and production testing."
      }
    ],
    featuredProjectSlugs: ["traqory"]
  },
  {
    id: "website-redesign",
    slug: "website-redesign",
    number: "06",
    title: "Website Redesign",
    tagline: "Transforming dated, slow websites into modern, high-converting digital assets.",
    description: "If your current website no longer reflects the caliber of your work or struggles with poor performance and low conversion, a complete redesign resets your digital trajectory.",
    overview: "A successful redesign is not just a coat of paint—it is a strategic overhaul of messaging, information hierarchy, speed, and visual appeal. I migrate clunky legacy sites onto modern Next.js foundations, preserving your search ranking equity while multiplying user engagement.",
    timeline: "2–4 weeks",
    capabilities: [
      "Current website audit (UI, UX, performance, and SEO benchmarks)",
      "Information architecture restructuring and content decluttering",
      "Complete visual modernization aligned with brand aspirational goals",
      "301 redirect mapping to preserve existing SEO authority",
      "Core Web Vitals acceleration to 95+ scores"
    ],
    deliverables: [
      "Modernized, responsive Next.js web application",
      "Clean 301 URL redirect map ensuring zero lost traffic",
      "Performance comparison report (Before vs After)",
      "Complete CMS content migration and team training"
    ],
    process: [
      {
        step: "01",
        title: "Audit & Analysis",
        description: "Benchmarking current traffic, bounce points, page speed issues, and ranking keywords."
      },
      {
        step: "02",
        title: "Restructuring & Wireframes",
        description: "Rebuilding page layouts for clarity, stronger calls to action, and intuitive navigation."
      },
      {
        step: "03",
        title: "Design & Development",
        description: "Crafting modern typography-first aesthetics and building cleanly on Next.js."
      },
      {
        step: "04",
        title: "Safe Migration & Launch",
        description: "Implementing 301 redirects, monitoring indexing, and celebrating a smooth launch."
      }
    ],
    featuredProjectSlugs: ["traqory"]
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug || s.id === slug);
}
