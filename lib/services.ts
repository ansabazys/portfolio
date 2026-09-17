export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
}

export const services: ServiceItem[] = [
  {
    id: "saas-development",
    number: "01",
    title: "SaaS Development",
    tagline: "High-throughput web products engineered for scale, reliability, and recurring customer value.",
    description: "From greenfield architecture to production scaling, I build software-as-a-service platforms that handle complex multi-tenancy, real-time data flows, and secure billing without compromise. Every architecture choice is guided by operational simplicity and sub-100ms user interactions.",
    capabilities: [
      "Multi-tenant database design and isolation strategies",
      "Real-time event processing and telemetry ingestion",
      "Stripe recurring billing, seat management, and usage metering",
      "Role-based access control (RBAC) and enterprise authentication",
      "Automated testing pipelines and containerized cloud deployment"
    ],
    deliverables: [
      "Production-ready Next.js / TypeScript application",
      "Scalable relational or columnar database schema",
      "Resilient background task and queueing system",
      "End-to-end API documentation and cloud infrastructure setup"
    ]
  },
  {
    id: "ecommerce-development",
    number: "02",
    title: "E-commerce Development",
    tagline: "Editorial, high-conversion digital storefronts that load instantly and convert effortlessly.",
    description: "Modern commerce requires more than just templates. I construct bespoke shopping experiences that prioritize typographic elegance, speed, and frictionless checkout. By combining edge caching with optimistic cart states, your storefront feels immediate across any mobile device or network condition.",
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
    ]
  },
  {
    id: "web-application-development",
    number: "03",
    title: "Web Application Development",
    tagline: "Bespoke internal tools, portals, and dashboards that simplify mission-critical workflows.",
    description: "Every business has unique operational bottlenecks that off-the-shelf software cannot solve cleanly. I build custom web applications, workflow automation engines, and internal tooling that streamline team productivity and turn manual spreadsheets into automated software systems.",
    capabilities: [
      "Complex interactive dashboards with server-rendered data tables",
      "Custom API design (REST, GraphQL, gRPC)",
      "Real-time WebSocket collaboration and notification feeds",
      "Third-party integrations (WhatsApp, CRMs, ERPs, Payment rails)",
      "Audit logging, compliance tracking, and robust data exports"
    ],
    deliverables: [
      "Full-stack web application tailored to business requirements",
      "Secure role-specific dashboards and administrative panels",
      "Third-party webhook listeners and integration connectors",
      "Complete deployment documentation and post-launch maintenance"
    ]
  },
  {
    id: "mvp-development",
    number: "04",
    title: "MVP Development",
    tagline: "Rapid, high-fidelity prototypes that turn hypotheses into validated products in weeks.",
    description: "For founders and innovative teams, speed to market is paramount. I help early-stage ventures turn concepts into polished, production-grade MVPs. Without cutting corners on code quality or architecture, we focus ruthlessly on the core value proposition to test real customer demand quickly.",
    capabilities: [
      "Product scoping and architecture roadmapping",
      "Rapid prototyping with modern full-stack frameworks",
      "Authentication, billing, and core feature completion in 3–4 weeks",
      "Instrumented analytics to measure early user retention",
      "Clean codebase ready to scale as soon as product-market fit is achieved"
    ],
    deliverables: [
      "Functional minimum viable product ready for launch",
      "Early user onboarding and analytics instrumentation",
      "Modular codebase engineered for iterative expansion",
      "Direct technical advisory throughout product validation"
    ]
  }
];
