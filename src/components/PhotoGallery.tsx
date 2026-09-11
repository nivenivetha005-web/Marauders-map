"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/lib/locations";
import { Polaroid } from "./Polaroid";

export type GalleryLayout = "grid" | "list";

interface PhotoGalleryProps {
  photos: Photo[];
  locationName: string;
  layout: GalleryLayout;
}

export function PhotoGallery({ photos, locationName, layout }: PhotoGalleryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (expandedIndex === null) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setExpandedIndex(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex]);

  return (
    <div className="w-full">
      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"}>
        {photos.map((photo, index) => (
          <Polaroid
            key={photo.src}
            photo={photo}
            alt={`Memory from ${locationName}`}
            onClick={() => setExpandedIndex(index)}
          />
        ))}
      </div>

      {expandedIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 animate-[fade-in_200ms_ease]"
            role="dialog"
            aria-modal="true"
            onClick={() => setExpandedIndex(null)}
          >
            <div
              className="w-full max-w-xs"
              onClick={(event) => event.stopPropagation()}
            >
              <Polaroid
                photo={photos[expandedIndex]}
                alt={`Memory from ${locationName}`}
                size="expanded"
              />
              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                className="mx-auto mt-2 flex min-h-11 items-center justify-center px-4 text-sm text-[var(--parchment-light)] underline decoration-dotted"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
