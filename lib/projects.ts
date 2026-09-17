export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  role: string;
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technicalDecisions: { title: string; explanation: string }[];
  architecture: string;
  myContribution: string;
  outcome: string;
  externalUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "traqory",
    title: "Traqory",
    category: "Analytics SaaS",
    description: "High-throughput analytics platform processing web events in real-time with sub-50ms query latency and privacy-focused telemetry.",
    year: "2025",
    role: "Full-Stack Architect & Lead Developer",
    technologies: ["Next.js", "TypeScript", "ClickHouse", "PostgreSQL", "Tailwind CSS", "Docker"],
    overview: "Traqory is an enterprise-grade, lightweight web analytics platform built for developers and digital teams who demand instant insights without the weight of invasive trackers. Designed from the ground up for minimal payload overhead and immediate aggregate queries.",
    problem: "Most modern analytics tools are either bloated third-party scripts that slow down client websites or expensive enterprise platforms that sell user data. The challenge was building an ingestion engine capable of processing millions of un-sampled events without taxing client browsers or incurring huge cloud database costs.",
    solution: "We engineered a dual-database architecture pairing ClickHouse for columnar event storage with PostgreSQL for account and metadata management. A lightweight (<1.2KB) tracking script streams events to an edge ingestion endpoint that batches writes directly to columnar tables.",
    features: [
      "Sub-1.2KB telemetry client with zero third-party dependencies",
      "Real-time visitor sessions and conversion funnel tracking",
      "Sub-50ms analytical query response time across millions of records",
      "Cookie-free, GDPR and CCPA compliant by default",
      "Custom goal tracking and UTM campaign attribution"
    ],
    technicalDecisions: [
      {
        title: "Columnar Storage with ClickHouse",
        explanation: "Relational databases struggle with ad-hoc analytical queries over millions of rows. ClickHouse provides 10x-20x data compression and processes columnar aggregations in milliseconds."
      },
      {
        title: "Edge Ingestion Buffer",
        explanation: "Rather than opening individual database connections per incoming beacon, events hit an edge worker that buffers and flushes micro-batches every 500ms, preserving database health under traffic surges."
      },
      {
        title: "Server Components Dashboards",
        explanation: "Rendered charts and data tables on the server using Next.js Server Components, drastically cutting client JavaScript bundle size while delivering instant first paints."
      }
    ],
    architecture: "Edge Telemetry Ingestion -> Memory Buffer Queue -> ClickHouse Event Warehouse (Aggregations) + PostgreSQL (Tenant & Config) -> Next.js Server-Rendered Analytics Dashboard.",
    myContribution: "Architected the full database schema, wrote the edge ingestion handler, built the dashboard UI with Next.js, and tuned ClickHouse table partitioning keys.",
    outcome: "Successfully scaled to handle tens of millions of events monthly with predictable response times, giving clients privacy-friendly visibility into their traffic.",
    externalUrl: "https://traqory.com"
  },
  {
    slug: "souqrima",
    title: "Souqrima",
    category: "E-commerce",
    description: "Editorial-driven multi-currency e-commerce platform built for high conversion, minimal latency, and friction-free checkout.",
    year: "2024",
    role: "Full-Stack Engineer",
    technologies: ["Next.js", "Node.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
    overview: "Souqrima is a modern commerce platform tailored for regional and international retail brands. Built with an editorial aesthetic, it blends high-resolution product storytelling with lightning-fast catalog navigation and localized currency checkouts.",
    problem: "Traditional e-commerce platforms suffered from sluggish page loads on mobile networks, slow inventory updates, and clumsy international currency conversions that led to cart abandonment at checkout.",
    solution: "Implemented an App Router storefront utilizing Incremental Static Regeneration (ISR) for instant product detail pages, edge middleware for real-time geolocation and currency switching, and Redis for distributed cart state.",
    features: [
      "Sub-second page transitions via Next.js ISR and prefetching",
      "Dynamic multi-currency pricing and localized tax calculations",
      "Optimistic cart state management with real-time inventory validation",
      "Stripe Elements checkout with one-click payment flows",
      "Custom merchant management portal for catalog and order fulfillment"
    ],
    technicalDecisions: [
      {
        title: "Incremental Static Regeneration",
        explanation: "Pre-rendered thousands of product SKUs statically at build time, revalidating on-demand via webhooks when inventory or price changes occur in the CMS."
      },
      {
        title: "Redis Distributed Inventory Cache",
        explanation: "Prevented overselling during high-volume flash drops by managing stock reservations in Redis with atomic decrement operations."
      }
    ],
    architecture: "Edge Storefront (Next.js ISR) -> API Layer (Node.js & Express) -> Redis Stock Reservation -> PostgreSQL Database -> Stripe Payments.",
    myContribution: "Led the frontend storefront engineering, designed the cart synchronization logic, integrated multi-currency Stripe workflows, and optimized Core Web Vitals to achieve 98+ mobile scores.",
    outcome: "Achieved a 35% reduction in checkout drop-offs and sub-second page loads across both domestic and overseas customer bases.",
    externalUrl: "https://souqrima.com"
  },
  {
    slug: "thynck-os",
    title: "Thynck OS",
    category: "CRM / WhatsApp Sales Automation",
    description: "Conversational CRM and sales workflow automation platform connecting omnichannel customer interactions directly to closing pipelines.",
    year: "2024",
    role: "Full-Stack Developer",
    technologies: ["React", "FastAPI", "Python", "WhatsApp Cloud API", "PostgreSQL", "WebSockets", "Celery"],
    overview: "Thynck OS is a sales operations platform that bridges the gap between conversational messaging and CRM pipeline tracking. It enables high-velocity sales teams to communicate with prospects on WhatsApp while automating lead scoring and follow-ups.",
    problem: "Sales representatives were conducting deals on disparate personal phones, losing conversation history, and failing to update central CRM systems, resulting in lost revenue and untracked leads.",
    solution: "Constructed a centralized omnichannel inbox with bi-directional WhatsApp Cloud API integration, real-time WebSocket messaging, automated workflow triggers, and team routing rules.",
    features: [
      "Unified shared team inbox with real-time message synchronization",
      "Automated lead capture, qualification, and pipeline status triggers",
      "Template messaging with automated delivery status verification",
      "Customizable drip sequences and conditional response rules",
      "Granular team permissions and agent performance analytics"
    ],
    technicalDecisions: [
      {
        title: "Asynchronous Queueing with Celery",
        explanation: "WhatsApp Cloud API enforces strict rate limits. All outbound messages and webhook payloads are processed through Celery worker pools with exponential backoff retries."
      },
      {
        title: "WebSocket Connection Pooling",
        explanation: "Delivered instant chat experience for sales agents using persistent WebSocket rooms keyed by conversation thread."
      }
    ],
    architecture: "WhatsApp Cloud API Webhooks -> FastAPI Ingestion -> Redis/Celery Task Queue -> PostgreSQL Thread Store -> WebSocket Broadcast -> React Agent Dashboard.",
    myContribution: "Engineered the webhook ingestion engine, built the real-time inbox UI, developed WhatsApp template management tooling, and authored automated drip campaign workers.",
    outcome: "Decreased average team response time from 3 hours to under 2 minutes, with zero lost conversation records across thousands of concurrent chats.",
    externalUrl: "https://thynckos.com"
  },
  {
    slug: "healix",
    title: "Healix",
    category: "E-commerce / Microservices",
    description: "Microservices-based personalized health & nutrition platform handling subscription commerce and custom dietary regimens.",
    year: "2024",
    role: "Backend & Systems Engineer",
    technologies: ["Go", "Node.js", "Docker", "PostgreSQL", "gRPC", "Redis", "Next.js"],
    overview: "Healix is a precision wellness platform that formulates custom nutritional regimens based on user biomarkers and health assessments, delivering recurring monthly subscriptions.",
    problem: "The legacy monolithic platform struggled under the weight of recurring billing cron jobs, personalized inventory allocation, and complex subscription modification states.",
    solution: "Decomposed the system into independent microservices (Auth, Catalog, Subscription Engine, Fulfillment) communicating via high-performance gRPC, fronted by an API gateway.",
    features: [
      "Algorithmic supplement formulation based on dynamic questionnaire trees",
      "Automated recurring subscription billing and skip/pause lifecycle management",
      "gRPC inter-service communication with strict protocol buffers",
      "Automated batch fulfillment generation for logistics partners",
      "Zero-downtime rolling deployments via Docker containers"
    ],
    technicalDecisions: [
      {
        title: "gRPC Inter-Service Communication",
        explanation: "Replaced HTTP/REST for internal service calls with gRPC and Protocol Buffers, cutting internal latency and enforcing compile-time type safety across Go and Node microservices."
      },
      {
        title: "Idempotency Engine for Subscriptions",
        explanation: "Designed an idempotency key layer across all payment calls and warehouse dispatch events to eliminate duplicate charges or shipments."
      }
    ],
    architecture: "Next.js Consumer Portal -> API Gateway -> gRPC Microservices (User, Subscription, Inventory) -> Independent PostgreSQL DBs -> Redis Pub/Sub.",
    myContribution: "Architected the subscription lifecycle service in Go, implemented recurring billing queues, defined gRPC schema definitions, and orchestrated Docker deployment configs.",
    outcome: "Eliminated subscription race conditions entirely, scaled fulfillment throughput by 4x, and achieved 99.98% uptime.",
    externalUrl: "https://healix.health"
  },
  {
    slug: "purchase-management-system",
    title: "Purchase Management System",
    category: "Offline Mobile Application",
    description: "Resilient offline-first mobile application for warehouse procurement officers operating in low-to-zero connectivity environments.",
    year: "2023",
    role: "Lead Mobile & Backend Developer",
    technologies: ["React Native", "TypeScript", "SQLite", "WatermelonDB", "Node.js", "PostgreSQL"],
    overview: "An enterprise procurement and inventory application designed specifically for field agents and warehouse supervisors working in basements, rural transit points, and metal warehouses where mobile reception is nonexistent.",
    problem: "Agents logging bulk purchase receipts and quality check inspections regularly suffered total data loss whenever internet dropped midway through an order entry, halting dock operations.",
    solution: "Engineered an offline-first architecture where every action writes directly to an encrypted local SQLite database first. A background synchronization daemon detects network availability and executes bidirectional delta synchronization.",
    features: [
      "100% offline operational capability for catalog search and PO creation",
      "Local SQLite database powered by WatermelonDB for instantaneous queries",
      "Bidirectional delta synchronization with deterministic conflict resolution",
      "High-speed barcode and QR code scanner integration",
      "Automated PDF receipt generation and local thermal printer support"
    ],
    technicalDecisions: [
      {
        title: "Local Database as Single Source of Truth",
        explanation: "The UI never waits for the network. All reads and writes occur against the local SQLite store, ensuring 60fps responsiveness regardless of connection status."
      },
      {
        title: "Timestamp Vector Clock Sync",
        explanation: "Built a revision-based delta sync mechanism that only transmits changed records since last sync timestamp, keeping payload sizes under a few kilobytes."
      }
    ],
    architecture: "React Native UI -> WatermelonDB / SQLite (Encrypted Local) -> Background Sync Engine -> Delta Sync Protocol -> Node.js Backend -> Master PostgreSQL.",
    myContribution: "Spearheaded the mobile architecture from inception, designed the offline sync algorithm, implemented the local SQLite schema, and built the administrative web portal.",
    outcome: "Zero data loss recorded across over 50,000 procurement transactions, saving warehouse teams hours of manual reconciliation every week.",
    externalUrl: "https://github.com/ansab"
  }
];
