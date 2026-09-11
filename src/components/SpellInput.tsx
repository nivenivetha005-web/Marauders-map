"use client";

import { useEffect, useRef, useState } from "react";
import { matchesOath, OATH_PHRASE } from "@/lib/oathMatch";

interface SpellInputProps {
  onAccepted: () => void;
  onListeningChange?: (isListening: boolean) => void;
  phrase?: string;
  matcher?: (input: string) => boolean;
  heading?: string;
  listeningHeading?: string;
}

type MicState = "idle" | "listening" | "denied";

export function SpellInput({
  onAccepted,
  onListeningChange,
  phrase = OATH_PHRASE,
  matcher = matchesOath,
  heading = "Speak the Spell",
  listeningHeading = "Listening…",
}: SpellInputProps) {
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [micState, setMicState] = useState<MicState>("idle");
  const [showTextFallback, setShowTextFallback] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const recognitionRef = useRef<InstanceType<
    NonNullable<typeof window.SpeechRecognition>
  > | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- feature detection must run after hydration to avoid an SSR mismatch */
  useEffect(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) {
      setShowTextFallback(true);
      return;
    }
    setVoiceSupported(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function handleAttempt(spoken: string) {
    if (matcher(spoken)) {
      setFeedback(null);
      onAccepted();
      return;
    }
    setFeedback("The parchment doesn't recognize those words. Try again.");
    setMicState("idle");
  }

  function startListening() {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;

    setFeedback(null);
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      handleAttempt(transcript);
    };

    recognition.onerror = (event) => {
      onListeningChange?.(false);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setMicState("denied");
        setShowTextFallback(true);
        return;
      }
      setFeedback("The parchment didn't catch that. Try again.");
      setMicState("idle");
    };

    recognition.onend = () => {
      onListeningChange?.(false);
      setMicState((current) => (current === "listening" ? "idle" : current));
    };

    recognitionRef.current = recognition;
    setMicState("listening");
    onListeningChange?.(true);
    recognition.start();
  }

  function handleTextSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleAttempt(textValue);
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-2">
        <h2 className="ink-etched min-w-0 font-[var(--font-spell)] text-5xl tracking-wide text-[var(--spell-burgundy)]">
          {micState === "listening" ? listeningHeading : heading}
        </h2>
        <button
          type="button"
          onClick={() => setShowHint((current) => !current)}
          aria-expanded={showHint}
          aria-label={showHint ? "Hide the spell" : "Show the spell"}
          className="flex h-11 w-11 items-center justify-center"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--ink-fade)]/50 text-xs leading-none text-[var(--ink-fade)]">
            i
          </span>
        </button>
      </div>

      {showHint && (
        <p className="font-[var(--font-hand)] text-xl leading-snug text-[var(--ink-dark)]">
          &ldquo;{phrase}&rdquo;
        </p>
      )}

      {voiceSupported && (
        <button
          type="button"
          onClick={startListening}
          disabled={micState === "listening"}
          aria-pressed={micState === "listening"}
          className="mic-ring flex h-16 w-16 items-center justify-center rounded-full border border-[var(--seal-burgundy)]/60 bg-[var(--seal-burgundy)] text-2xl text-[var(--parchment-light)] transition-transform active:scale-95 disabled:opacity-80"
          data-listening={micState === "listening"}
        >
          🎙️
        </button>
      )}

      {feedback && (
        <p className="text-sm text-[var(--seal-burgundy)]" role="alert">
          {feedback}
        </p>
      )}

      {micState === "denied" && (
        <p className="text-sm text-[var(--ink-fade)]">
          Microphone access was denied.
        </p>
      )}

      {!showTextFallback && voiceSupported && (
        <button
          type="button"
          onClick={() => setShowTextFallback(true)}
          className="text-sm underline decoration-dotted text-[var(--ink-fade)]"
        >
          Type the words instead
        </button>
      )}

      {showTextFallback && (
        <form onSubmit={handleTextSubmit} className="flex w-full flex-col items-center gap-2">
          <input
            type="text"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            placeholder="Type the spell…"
            className="w-full rounded-sm border border-[var(--ink-fade)]/40 bg-[var(--parchment-light)]/70 px-3 py-2 text-center font-[var(--font-hand)] text-lg text-[var(--ink-dark)] placeholder:text-[var(--ink-fade)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--seal-burgundy)]"
            aria-label="Type the spell"
          />
          <button
            type="submit"
            className="rounded-sm border border-[var(--seal-burgundy)]/60 px-4 py-1.5 text-sm text-[var(--seal-burgundy)]"
          >
            Cast
          </button>
        </form>
      )}
    </div>
  );
}
