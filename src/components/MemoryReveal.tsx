"use client";

import { useState } from "react";
import type { Location } from "@/lib/locations";
import { PhotoGallery, type GalleryLayout } from "./PhotoGallery";
import { InkRevealMask } from "./InkRevealMask";

interface MemoryRevealProps {
  location: Location;
  onBack: () => void;
}

export function MemoryReveal({ location, onBack }: MemoryRevealProps) {
  const [layout, setLayout] = useState<GalleryLayout>("grid");

  return (
    <InkRevealMask className="w-full">
      <div className="w-full">
        <header className="sticky top-0 z-40 flex w-full items-center gap-1 overflow-hidden px-1 py-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to the map"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--ink-dark)]"
          >
            <BackIcon />
          </button>
          <h2 className="ink-etched min-w-0 flex-1 truncate text-center font-[var(--font-ink)] text-2xl italic text-[var(--ink-dark)]">
            {location.name}
          </h2>
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-[var(--parchment-dark)]/50 bg-[var(--parchment-light)]/80 p-1">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              aria-label="Grid view"
              aria-pressed={layout === "grid"}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                layout === "grid"
                  ? "bg-[var(--seal-burgundy)] text-[var(--parchment-light)]"
                  : "text-[var(--ink-fade)]"
              }`}
            >
              <GridIcon />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              aria-label="List view"
              aria-pressed={layout === "list"}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                layout === "list"
                  ? "bg-[var(--seal-burgundy)] text-[var(--parchment-light)]"
                  : "text-[var(--ink-fade)]"
              }`}
            >
              <ListIcon />
            </button>
          </div>
        </header>

        <div className="px-4 pb-12 pt-6">
          <PhotoGallery photos={location.photos} locationName={location.name} layout={layout} />
        </div>
      </div>
    </InkRevealMask>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.5 4L6.5 10L12.5 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" fill="currentColor" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.2" fill="currentColor" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.2" fill="currentColor" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="15" height="5" rx="1.2" fill="currentColor" />
      <rect x="2.5" y="12.5" width="15" height="5" rx="1.2" fill="currentColor" />
    </svg>
  );
}
