"use client";

import { useState } from "react";
import type { Location } from "@/lib/locations";
import { PhotoGallery, type GalleryLayout } from "./PhotoGallery";
import { InkRevealMask } from "./InkRevealMask";

interface MemoryRevealProps {
  location: Location;
  visible: boolean;
  onBack: () => void;
}

export function MemoryReveal({ location, visible, onBack }: MemoryRevealProps) {
  const [layout, setLayout] = useState<GalleryLayout>("grid");

  return (
    <div className="memory-reveal w-full" data-visible={visible}>
      <header className="sticky top-0 z-40 flex items-center gap-2 px-2 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to the map"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--ink-dark)]"
        >
          <BackIcon />
        </button>
        <h2 className="ink-etched flex-1 truncate text-center font-[var(--font-ink)] text-2xl text-[var(--ink-dark)]">
          {location.name}
        </h2>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            aria-label="Grid view"
            aria-pressed={layout === "grid"}
            className={`flex h-11 w-11 items-center justify-center ${
              layout === "grid" ? "text-[var(--seal-burgundy)]" : "text-[var(--ink-fade)]"
            }`}
          >
            <GridIcon />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            aria-label="List view"
            aria-pressed={layout === "list"}
            className={`flex h-11 w-11 items-center justify-center ${
              layout === "list" ? "text-[var(--seal-burgundy)]" : "text-[var(--ink-fade)]"
            }`}
          >
            <ListIcon />
          </button>
        </div>
      </header>

      <div className="px-4 pb-12 pt-6">
        <InkRevealMask>
          <PhotoGallery photos={location.photos} locationName={location.name} layout={layout} />
        </InkRevealMask>
      </div>
    </div>
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="15" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="12.5" width="15" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
