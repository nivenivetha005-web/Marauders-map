import type { Photo } from "@/lib/locations";

interface PolaroidProps {
  photo: Photo;
  alt: string;
  size?: "tile" | "expanded";
  onClick?: () => void;
}

/* Percentages measured against the frame asset's photo window. */
const WINDOW = { left: 6.7, top: 6.4, width: 86.6, height: 72.6 };

export function Polaroid({ photo, alt, size = "tile", onClick }: PolaroidProps) {
  const isExpanded = size === "expanded";

  const card = (
    <div
      className="relative w-full bg-[url(/textures/polaroid-frame.png)] bg-contain bg-center bg-no-repeat drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
      style={{ aspectRatio: "1398 / 1598" }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${WINDOW.left}%`,
          top: `${WINDOW.top}%`,
          width: `${WINDOW.width}%`,
          height: `${WINDOW.height}%`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        className={`absolute left-[12%] right-[12%] top-[81%] bottom-[3%] flex items-center justify-center overflow-hidden text-center font-[var(--font-hand)] text-[var(--ink-dark)] ${
          isExpanded ? "text-sm leading-snug" : "text-xs leading-tight"
        }`}
      >
        <p className={isExpanded ? "line-clamp-2" : "line-clamp-1"}>
          {photo.caption}
        </p>
      </div>
    </div>
  );

  if (!onClick) {
    return card;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] focus-visible:outline-none"
      aria-label={`Expand photo: ${photo.caption}`}
    >
      {card}
    </button>
  );
}
