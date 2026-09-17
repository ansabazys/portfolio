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
