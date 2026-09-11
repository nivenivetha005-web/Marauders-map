"use client";

import { useEffect } from "react";
import { matchesClosingPhrase, CLOSING_PHRASE } from "@/lib/oathMatch";
import { Parchment } from "./Parchment";
import { SpellInput } from "./SpellInput";
import { InkRevealMask } from "./InkRevealMask";

interface ExitSpellDialogProps {
  onAccepted: () => void;
  onCancel: () => void;
}

export function ExitSpellDialog({ onAccepted, onCancel }: ExitSpellDialogProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-[fade-in_200ms_ease]"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
        <Parchment stage="ready">
          <InkRevealMask>
            <SpellInput
              phrase={CLOSING_PHRASE}
              matcher={matchesClosingPhrase}
              heading="Speak the Closing Words"
              listeningHeading="Listening…"
              onAccepted={onAccepted}
            />
          </InkRevealMask>
        </Parchment>
        <button
          type="button"
          onClick={onCancel}
          className="mx-auto mt-2 flex min-h-11 items-center justify-center px-4 text-sm text-[var(--parchment-light)] underline decoration-dotted"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
