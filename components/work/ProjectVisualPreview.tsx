import React from "react";

interface ProjectVisualPreviewProps {
  slug: string;
  className?: string;
}

export function ProjectVisualPreview({
  slug,
  className = "",
}: ProjectVisualPreviewProps) {
  if (slug === "traqory") {
    return (
      <div
        className={`w-full rounded-md border border-[#EAE8E2] bg-[#F7F6F2] p-5 sm:p-7 text-[#141413] select-none ${className}`}
        aria-label="Traqory Interface Preview"
      >
        {/* Window Frame Bar */}
        <div className="flex items-center justify-between border-b border-[#EAE8E2] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="ml-2 font-mono text-[11px] text-[#666561] tracking-wide">
              traqory.com / live-analytics
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Real-Time Edge
          </span>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#FAFAF8] p-3 rounded border border-[#EAE8E2]">
            <span className="block text-[11px] uppercase tracking-wider text-[#666561]">
              Monthly Events
            </span>
            <span className="text-xl font-semibold text-[#141413] tracking-tight mt-0.5 block font-mono">
              24.8M
            </span>
          </div>
          <div className="bg-[#FAFAF8] p-3 rounded border border-[#EAE8E2]">
            <span className="block text-[11px] uppercase tracking-wider text-[#666561]">
              Query Latency
            </span>
            <span className="text-xl font-semibold text-[#141413] tracking-tight mt-0.5 block font-mono">
              38ms
            </span>
          </div>
          <div className="bg-[#FAFAF8] p-3 rounded border border-[#EAE8E2]">
            <span className="block text-[11px] uppercase tracking-wider text-[#666561]">
              Payload Size
            </span>
            <span className="text-xl font-semibold text-[#141413] tracking-tight mt-0.5 block font-mono">
              &lt; 1.2 KB
            </span>
          </div>
          <div className="bg-[#FAFAF8] p-3 rounded border border-[#EAE8E2]">
            <span className="block text-[11px] uppercase tracking-wider text-[#666561]">
              Compression
            </span>
            <span className="text-xl font-semibold text-[#141413] tracking-tight mt-0.5 block font-mono">
              18.4x
            </span>
          </div>
        </div>

        {/* Simulated Telemetry Curve & Data Rows */}
        <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-medium text-[#141413]">Ingestion Volume (ClickHouse Event Warehouse)</span>
            <span className="font-mono text-[11px] text-[#666561]">Last 24 hours</span>
          </div>
          <svg
            viewBox="0 0 600 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-20 text-blue-600"
          >
            <path
              d="M0 70 Q 60 65, 120 40 T 240 45 T 360 20 T 480 30 T 600 10 L 600 90 L 0 90 Z"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <path
              d="M0 70 Q 60 65, 120 40 T 240 45 T 360 20 T 480 30 T 600 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (slug === "healix") {
    return (
      <div
        className={`w-full rounded-md border border-[#EAE8E2] bg-[#F7F6F2] p-5 sm:p-7 text-[#141413] select-none ${className}`}
        aria-label="Healix Interface Preview"
      >
        {/* Window Frame Bar */}
        <div className="flex items-center justify-between border-b border-[#EAE8E2] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="ml-2 font-mono text-[11px] text-[#666561] tracking-wide">
              healix.health / subscription-gateway
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            gRPC Microservices
          </span>
        </div>

        {/* Regimen Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666561] block mb-1">
              Active Regimen
            </span>
            <span className="font-medium text-sm text-[#141413] block">
              Biomarker Formula #08
            </span>
            <span className="text-xs text-[#666561] mt-1 block leading-relaxed">
              Targeted micronutrient stack customized for metabolic recovery.
            </span>
          </div>
          <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666561] block mb-1">
              Fulfillment
            </span>
            <span className="font-medium text-sm text-[#141413] block">
              30-Day Recurring Batch
            </span>
            <span className="text-xs text-[#666561] mt-1 block leading-relaxed">
              Automated idempotency key guarantees zero duplicate dispatch.
            </span>
          </div>
          <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666561] block mb-1">
              Uptime
            </span>
            <span className="font-medium text-sm text-[#141413] block font-mono">
              99.98% SLA
            </span>
            <span className="text-xs text-[#666561] mt-1 block leading-relaxed">
              Zero-downtime rolling container deployments across services.
            </span>
          </div>
        </div>

        {/* Microservice Topology Snippet */}
        <div className="bg-[#FAFAF8] p-3.5 rounded border border-[#EAE8E2] flex items-center justify-between text-xs">
          <span className="text-[#666561]">Catalog &amp; Subscription Gateway</span>
          <span className="font-mono text-[11px] text-[#141413]">
            Protocol Buffers v3 · Sub-10ms inter-service RPC
          </span>
        </div>
      </div>
    );
  }

  if (slug === "purchase-management-system") {
    return (
      <div
        className={`w-full rounded-md border border-[#EAE8E2] bg-[#F7F6F2] p-5 sm:p-7 text-[#141413] select-none ${className}`}
        aria-label="Purchase Management System Interface Preview"
      >
        {/* Window Frame Bar */}
        <div className="flex items-center justify-between border-b border-[#EAE8E2] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D3CC]" />
            <span className="ml-2 font-mono text-[11px] text-[#666561] tracking-wide">
              warehouse-pms / offline-sqlite
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Offline-First Local DB
          </span>
        </div>

        {/* Procurement Transaction Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] font-medium text-[#141413]">PO-2023-9481</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Verified Local
              </span>
            </div>
            <p className="text-xs text-[#666561] leading-relaxed">
              1,200 Units Timber Ply Grade-A · Thermal barcode scanned &amp; signed off in zero-connectivity loading dock.
            </p>
          </div>
          <div className="bg-[#FAFAF8] p-4 rounded border border-[#EAE8E2]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] font-medium text-[#141413]">Sync Queue Daemon</span>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                Delta Sync
              </span>
            </div>
            <p className="text-xs text-[#666561] leading-relaxed">
              WatermelonDB vector clocks · 50,000+ orders committed with zero data loss on intermittent 2G cellular.
            </p>
          </div>
        </div>

        {/* Barcode & Storage Status */}
        <div className="bg-[#FAFAF8] p-3.5 rounded border border-[#EAE8E2] flex items-center justify-between text-xs">
          <span className="text-[#666561]">Encrypted Local Storage</span>
          <span className="font-mono text-[11px] text-[#141413]">
            AES-256 SQLite · 60fps Native React Native UI
          </span>
        </div>
      </div>
    );
  }

  return null;
}
