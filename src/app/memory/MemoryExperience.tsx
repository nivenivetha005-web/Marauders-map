"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLocationById } from "@/lib/locations";
import { Parchment, type ParchmentStage } from "@/components/Parchment";
import { WaxSeal } from "@/components/WaxSeal";
import { SpellInput } from "@/components/SpellInput";
import { MemoryReveal } from "@/components/MemoryReveal";
import { ExitSpellDialog } from "@/components/ExitSpellDialog";
import { InkRevealMask } from "@/components/InkRevealMask";

type Stage = "identified" | ParchmentStage;

export function MemoryExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = useMemo(
    () => getLocationById(searchParams.get("location")),
    [searchParams]
  );

  const [stage, setStage] = useState<Stage>(() =>
    location ? "identified" : "invalid"
  );
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    if (stage !== "identified") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(() => setStage("closed"), prefersReducedMotion ? 400 : 2700);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "closed") return;
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setStage("unfurling"));
    });
    return () => cancelAnimationFrame(raf1);
  }, [stage]);

  useEffect(() => {
    if (stage !== "unfurling") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(() => setStage("ready"), prefersReducedMotion ? 150 : 2700);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "accepted") return;
    const t = setTimeout(() => setStage("revealing"), 700);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "revealing") return;
    const t = setTimeout(() => setStage("revealed"), 750);
    return () => clearTimeout(t);
  }, [stage]);

  function handleListeningChange(isListening: boolean) {
    setStage((current) => {
      if (isListening && current === "ready") return "listening";
      if (!isListening && current === "listening") return "ready";
      return current;
    });
  }

  if (stage === "identified" && location) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <InkRevealMask>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-fade)]">
              The map remembers this place.
            </p>
            <h1 className="ink-etched font-[var(--font-ink)] text-4xl text-[var(--ink-dark)]">
              {location.name}
            </h1>
            <p className="text-[var(--ink-fade)]">{location.shortIntro}</p>
          </div>
        </InkRevealMask>
      </div>
    );
  }

  if (stage === "invalid" || !location) {
    return (
      <>
        <Parchment stage="invalid" className="parchment-page-margins">
          <InkRevealMask>
            <div className="flex flex-col items-center gap-3 text-center">
              <WaxSeal state="broken" />
              <p className="ink-etched font-[var(--font-ink)] text-xl text-[var(--ink-dark)]">
                The map could not find this place.
              </p>
              <p className="text-sm text-[var(--ink-fade)]">
                Scan one of the eight tags to reveal a memory.
              </p>
            </div>
          </InkRevealMask>
        </Parchment>
      </>
    );
  }

  const revealed = stage === "revealing" || stage === "revealed";

  return (
    <>
      {!revealed && stage !== "closed" && (
        <div className="parchment-page-margins w-full px-4">
          <InkRevealMask>
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/textures/emblem.png"
                alt=""
                aria-hidden="true"
                className="w-full max-w-xs"
              />

              {(stage === "ready" || stage === "listening") && (
                <SpellInput
                  onAccepted={() => setStage("accepted")}
                  onListeningChange={handleListeningChange}
                />
              )}

              {stage === "accepted" && (
                <p className="font-[var(--font-hand)] text-xl text-[var(--ink-dark)]">
                  The parchment recognizes the words&hellip;
                </p>
              )}
            </div>
          </InkRevealMask>
        </div>
      )}

      {revealed && (
        <MemoryReveal location={location} onBack={() => setShowExitDialog(true)} />
      )}

      {showExitDialog && (
        <ExitSpellDialog
          onAccepted={() => router.push("/")}
          onCancel={() => setShowExitDialog(false)}
        />
      )}
    </>
  );
}
