export type SealState = "sealed" | "cracking" | "broken";

interface WaxSealProps {
  state: SealState;
}

export function WaxSeal({ state }: WaxSealProps) {
  return (
    <div className="wax-seal" data-state={state} aria-hidden="true">
      <div className="wax-seal-half left" />
      <div className="wax-seal-half right" />
      <div className="wax-seal-sigil">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 3 L20 14 L14 25 L8 14 Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
