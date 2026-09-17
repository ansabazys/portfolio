export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  content: {
    heading?: string;
    paragraphs: string[];
    quote?: string;
    list?: string[];
  }[];
}

export const articles: Article[] = [
  {
    slug: "architecting-offline-first-mobile-apps",
    title: "Architecting Offline-First Mobile Applications with SQLite and Delta Sync",
    description: "Lessons learned building enterprise procurement tools for zero-connectivity environments: why optimistic UI isn't enough, and how delta synchronization preserves data integrity.",
    date: "February 12, 2026",
    readingTime: "6 min read",
    category: "Architecture",
    content: [
      {
        heading: "The Illusion of Constant Connectivity",
        paragraphs: [
          "Most mobile applications are built on an unspoken assumption: the device always has an active, reliable internet connection. We construct UI layers that show loading spinners on every tap, dispatching HTTP requests and praying the cellular handoff between cell towers doesn't drop the packet midway.",
          "When you build software for warehouse floors, shipping yards, or rural transit points, this assumption collapses immediately. If an agent cannot record a transaction because the WiFi dropped in an underground storage bay, operations stall. Building offline-first is not a feature you bolt onto an existing web API; it is a fundamental architectural commitment."
        ]
      },
      {
        heading: "The Local Database as the Source of Truth",
        paragraphs: [
          "In a true offline-first system, the network is never in the critical rendering path. Every user interaction—every form submission, barcode scan, or state toggle—writes directly and synchronously to a local SQLite database on the client.",
          "Because the local disk responds in sub-5ms, the user interface remains fluid at 60 frames per second. There are no spinners, no frozen buttons, and no ambiguous retry states. The UI simply renders the state of the local database."
        ],
        quote: "The single most transformative decision in offline engineering is treating the remote server not as the immediate target of writes, but as an eventual synchronization partner."
      },
      {
        heading: "Delta Synchronization and Conflict Resolution",
        paragraphs: [
          "The challenging part of offline systems is not storing data locally; it is bringing that data back into consensus with the central server when connectivity returns. Naive implementations try to upload full database snapshots or replay raw HTTP logs, both of which collapse under high concurrency.",
          "We utilized a delta synchronization protocol governed by monotonic timestamps and vector revisions. When a client reconnects, it asks the server: 'Give me all changes with revision greater than my last known checkmark.' Simultaneously, it pushes only modified rows in a compact JSON payload.",
          "For conflict resolution, deterministic domain rules must take precedence over generic last-write-wins algorithms. In procurement workflows, appending to audit logs and tracking revision counts ensures that no purchase line item is ever silently overwritten."
        ],
        list: [
          "Never block UI interactions on remote HTTP responses.",
          "Keep local schemas strictly typed with migrations bundled in the app binary.",
          "Implement deterministic conflict resolution at the domain layer.",
          "Compress synchronization payloads using compact delta vectors."
        ]
      }
    ]
  },
  {
    slug: "scaling-analytics-with-clickhouse-and-nextjs",
    title: "Processing Millions of Events Under 50ms with ClickHouse and Next.js",
    description: "Why traditional relational databases fail at high-throughput analytics, and how pairing columnar event stores with Server Components produces lightning-fast dashboards.",
    date: "January 18, 2026",
    readingTime: "5 min read",
    category: "Databases",
    content: [
      {
        heading: "The Analytical Bottleneck",
        paragraphs: [
          "PostgreSQL is phenomenal for transactional workloads. But when you ask it to compute a distinct count of 15 million user sessions grouped by country, referrer, and custom metadata, row-oriented disk reads quickly become a bottleneck.",
          "In analytical systems, queries rarely need all columns; they need to scan hundreds of millions of rows across three or four specific fields. This is where columnar databases like ClickHouse change the game entirely."
        ]
      },
      {
        heading: "Columnar Storage and Vectorized Execution",
        paragraphs: [
          "Because ClickHouse stores data column-by-column rather than row-by-row, scanning a single integer column across 20 million rows requires reading only a fraction of the disk bytes. Coupled with aggressive compression (frequently exceeding 15x over raw JSON), disk I/O ceases to be the bottleneck.",
          "Furthermore, vectorized SIMD execution allows the CPU to aggregate multiple records in a single instruction cycle, routinely delivering query times under 40 milliseconds for datasets that would cause relational databases to timeout."
        ]
      },
      {
        heading: "Rendering Without Client-Side Bloat",
        paragraphs: [
          "The final piece of high-performance analytics is presentation. In legacy SPAs, developers often fetch raw arrays of thousands of data points to the browser, relying on massive charting libraries that freeze the main thread.",
          "With Next.js App Router and Server Components, all aggregation happens right on the database layer and server runtime. The client receives pre-computed SVG coordinates and pure HTML tables, keeping the client bundle tiny and first paints instantaneous."
        ]
      }
    ]
  },
  {
    slug: "calm-software-principles",
    title: "Calm Software: Designing for Clarity Over Visual Noise",
    description: "An inquiry into why modern web applications feel exhausting to use, and how restrained typography, generous whitespace, and purposeful interaction restore dignity to digital tools.",
    date: "December 04, 2025",
    readingTime: "4 min read",
    category: "Design Philosophy",
    content: [
      {
        heading: "The Attention Economy in Developer Tooling",
        paragraphs: [
          "Somewhere along the way, software design began mistaking stimulation for quality. Developer tools and digital products became filled with neon glowing cards, gratuitous floating particles, infinite toaster notifications, and aggressive animations that call attention to themselves rather than the user's task.",
          "When every button has a rainbow border and every card is floating in artificial 3D space, nothing has hierarchy. The interface screams at the user instead of providing a calm environment for clear thinking."
        ]
      },
      {
        heading: "Principles of Quiet Interfaces",
        paragraphs: [
          "A calm interface respects the user's focus. It uses whitespace not as empty void to be filled, but as structural breathing room that lets typography do the heavy lifting.",
          "When you eliminate decorative noise, every remaining element must be intentional: the font weight differences become meaningful, the hairline dividers create precise boundaries, and subtle transitions communicate system state rather than entertaining the viewer."
        ],
        quote: "Good typography and whitespace do not demand attention; they quietly facilitate comprehension."
      },
      {
        heading: "Building for Longevity",
        paragraphs: [
          "Trendy design aesthetics age within months. A clean, editorial layout grounded in solid typography, fast performance, and accessible contrast remains timeless. As software engineers, our best work often lies in what we choose not to add."
        ]
      }
    ]
  }
];
