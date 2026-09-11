import { Parchment } from "@/components/Parchment";
import { InkRevealMask } from "@/components/InkRevealMask";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <Parchment stage="ready" className="parchment-page-margins">
        <InkRevealMask>
          <div className="flex flex-col items-center gap-3 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/textures/emblem.png"
              alt=""
              aria-hidden="true"
              className="w-full max-w-xs"
            />
            <p className="ink-etched font-[var(--font-ink)] text-xl text-[var(--ink-dark)]">
              The map is quiet.
            </p>
            <p className="text-sm text-[var(--ink-fade)]">
              Scan one of the eight tags to reveal a memory.
            </p>
          </div>
        </InkRevealMask>
      </Parchment>
    </main>
  );
}
