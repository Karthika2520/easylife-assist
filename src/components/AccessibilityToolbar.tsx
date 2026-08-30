import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MAX_SCALE, MIN_SCALE, useAccessibility } from "@/lib/accessibility";
import { LANGUAGES } from "@/lib/i18n";

type MinimalRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

const VOICE_ROUTES: { to: string; words: string[] }[] = [
  { to: "/reminders", words: ["reminder", "reminders", "medicine", "medicines", "நினைவூட்டல்", "மருந்து"] },
  { to: "/family", words: ["family", "call", "daughter", "son", "குடும்பம்", "அழை"] },
  { to: "/emergency", words: ["emergency", "sos", "help", "அவசரம்", "உதவி"] },
  { to: "/explain", words: ["explain", "meaning", "word", "விளக்கம்"] },
  { to: "/settings", words: ["settings", "setting", "அமைப்பு"] },
  { to: "/", words: ["home", "முகப்பு"] },
];

export function AccessibilityToolbar() {
  const {
    scale,
    setScale,
    highContrast,
    setHighContrast,
    lang,
    setLang,
    t,
    speechSupported,
    recognitionSupported,
    isReading,
    readAloud,
    stopReading,
  } = useAccessibility();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<MinimalRecognition | null>(null);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const handleRead = useCallback(() => {
    if (!speechSupported) {
      setMessage(t("notSupportedRead"));
      return;
    }
    setMessage("");
    if (isReading) {
      stopReading();
      return;
    }
    const main = document.getElementById("main-content");
    const text = (main?.innerText ?? "").replace(/\s+/g, " ").trim();
    readAloud(text || t("appName"));
  }, [speechSupported, isReading, readAloud, stopReading, t]);

  const handleSpeak = useCallback(() => {
    const Ctor =
      (window as unknown as { SpeechRecognition?: new () => MinimalRecognition })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => MinimalRecognition })
        .webkitSpeechRecognition;
    if (!Ctor) {
      setMessage(t("notSupportedSpeak"));
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new Ctor();
    recognitionRef.current = recognition;
    recognition.lang = LANGUAGES.find((l) => l.code === lang)?.speechLocale ?? "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const said = String(event.results[0]?.[0]?.transcript ?? "").toLowerCase();
      setMessage(`${t("heardYouSay")} "${said}"`);
      const match = VOICE_ROUTES.find((route) =>
        route.words.some((word) => said.includes(word)),
      );
      if (match) navigate({ to: match.to });
      else setMessage(t("didNotUnderstand"));
    };
    recognition.onerror = () => {
      setListening(false);
      setMessage(t("notSupportedSpeak"));
    };
    recognition.onend = () => setListening(false);
    setMessage(t("listening"));
    setListening(true);
    recognition.start();
  }, [lang, listening, navigate, t]);

  const buttonClass =
    "tap-target gap-3 rounded-xl border-2 border-border-strong bg-card px-5 text-lead font-semibold text-foreground transition-colors hover:bg-primary-soft";

  return (
    <section
      aria-label={t("toolbarTitle")}
      className="border-b-2 border-border bg-surface"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="text-size-slider"
            className="text-lead font-bold text-foreground"
          >
            {t("textSize")}: {scale}%
          </label>
          <p className="text-body text-muted-foreground">{t("textSizeHelp")}</p>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <input
              id="text-size-slider"
              type="range"
              min={MIN_SCALE}
              max={MAX_SCALE}
              step={10}
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              aria-valuetext={`${scale} percent`}
              className="h-12 w-full min-w-0 cursor-pointer accent-primary"
            />
            <button
              type="button"
              onClick={() => setScale(100)}
              className="tap-target shrink-0 rounded-xl border-2 border-border-strong bg-card px-4 text-body font-semibold text-foreground hover:bg-primary-soft"
            >
              100%
              <span className="sr-only"> — {t("resetTextSize")}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleRead} className={buttonClass}>
            <span aria-hidden="true">🔊</span>
            <span>{isReading ? t("stopReading") : t("readAloud")}</span>
          </button>

          <button
            type="button"
            onClick={handleSpeak}
            aria-pressed={listening}
            className={buttonClass}
          >
            <span aria-hidden="true">🎤</span>
            <span>{listening ? t("listening") : t("speak")}</span>
          </button>

          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}
            className={buttonClass}
          >
            <span aria-hidden="true">◐</span>
            <span>{highContrast ? t("highContrastOn") : t("highContrastOff")}</span>
          </button>

          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <label htmlFor="language-select" className="text-lead font-semibold">
              <span aria-hidden="true">🌐</span> {t("language")}
            </label>
            <select
              id="language-select"
              value={lang}
              onChange={(event) => setLang(event.target.value as typeof lang)}
              className="tap-target rounded-xl border-2 border-border-strong bg-card px-4 text-lead font-semibold text-foreground"
            >
              {LANGUAGES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p aria-live="polite" className="text-body font-semibold text-foreground">
          {message}
        </p>
        {!speechSupported || !recognitionSupported ? (
          <p className="text-body text-muted-foreground">
            {!speechSupported ? t("notSupportedRead") : t("notSupportedSpeak")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
