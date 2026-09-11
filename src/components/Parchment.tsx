import type { ReactNode } from "react";

export type ParchmentStage =
  | "closed"
  | "unfurling"
  | "ready"
  | "listening"
  | "accepted"
  | "revealing"
  | "revealed"
  | "invalid";

interface ParchmentProps {
  stage: ParchmentStage;
  children: ReactNode;
  className?: string;
}

export function Parchment({ stage, children, className = "" }: ParchmentProps) {
  return (
    <div
      className={`parchment-sheet ${className}`}
      data-stage={stage}
    >
      {children}
    </div>
  );
}
