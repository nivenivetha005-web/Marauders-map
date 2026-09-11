"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

interface InkRevealMaskProps {
  children: ReactNode;
  className?: string;
}

/* Fractional (0-1) coordinates in the target box's own bounding box
   (maskContentUnits="objectBoundingBox"), so this always covers the
   box exactly regardless of its size or aspect ratio — no coordinate
   translation between a fixed local space and the real element. */
const BLOBS = [
  { cx: 0.35, cy: 0.42, rx: 0.5, ry: 0.62, delay: 0 },
  { cx: 0.68, cy: 0.28, rx: 0.58, ry: 0.48, delay: 120 },
  { cx: 0.52, cy: 0.7, rx: 0.55, ry: 0.6, delay: 270 },
  { cx: 0.22, cy: 0.78, rx: 0.42, ry: 0.5, delay: 180 },
  { cx: 0.8, cy: 0.75, rx: 0.48, ry: 0.55, delay: 390 },
  { cx: 0.5, cy: 0.15, rx: 0.55, ry: 0.4, delay: 60 },
];

/* Small splatter marks that pop just ahead of the main blobs. */
const SPLATTERS = [
  { cx: 0.09, cy: 0.19, r: 0.035 },
  { cx: 0.92, cy: 0.24, r: 0.03 },
  { cx: 0.14, cy: 0.88, r: 0.04 },
  { cx: 0.88, cy: 0.92, r: 0.03 },
  { cx: 0.5, cy: 0.04, r: 0.025 },
  { cx: 0.05, cy: 0.54, r: 0.035 },
];

export function InkRevealMask({ children, className = "" }: InkRevealMaskProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const maskId = `ink-mask-${rawId}`;
  const blobGradId = `ink-blob-grad-${rawId}`;
  const splatterGradId = `ink-splatter-grad-${rawId}`;

  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(#${maskId})`,
    maskImage: `url(#${maskId})`,
  };

  return (
    <div className={`ink-reveal ${className}`}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id={blobGradId}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="62%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={splatterGradId}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            {BLOBS.map((b, i) => (
              <ellipse
                key={`blob-${i}`}
                className="ink-mask-blob"
                cx={b.cx}
                cy={b.cy}
                rx={b.rx}
                ry={b.ry}
                fill={`url(#${blobGradId})`}
                style={{ animationDelay: `${b.delay}ms` }}
              />
            ))}
            {SPLATTERS.map((s, i) => (
              <circle
                key={`splatter-${i}`}
                className="ink-mask-splatter"
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                fill={`url(#${splatterGradId})`}
                style={{ animationDelay: `${i * 15}ms` }}
              />
            ))}
          </mask>
        </defs>
      </svg>
      <div className="ink-reveal-content" style={maskStyle}>
        {children}
      </div>
    </div>
  );
}
