import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LANGUAGES, strings, type Lang, type StringKey } from "./i18n";

const STORAGE_KEY = "easylife-preferences";

export const MIN_SCALE = 100;
export const MAX_SCALE = 300;

type Prefs = { scale: number; highContrast: boolean; lang: Lang };

const DEFAULTS: Prefs = { scale: 100, highContrast: false, lang: "en" };

type AccessibilityValue = {
  scale: number;
  setScale: (value: number) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  lang: Lang;
  setLang: (value: Lang) => void;
  t: (key: StringKey) => string;
  speechSupported: boolean;
  recognitionSupported: boolean;
  isReading: boolean;
  readAloud: (text: string) => void;
  stopReading: () => void;
};

const AccessibilityContext = createContext<AccessibilityValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const readingRef = useRef(false);

  // Read saved preferences after hydration so server and client HTML match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) });
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
    setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    setRecognitionSupported(
      typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window),
    );
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* storage may be unavailable */
    }
    const root = document.documentElement;
    root.style.fontSize = `${(16 * prefs.scale) / 100}px`;
    root.classList.toggle("high-contrast", prefs.highContrast);
    root.lang = prefs.lang;
  }, [prefs, hydrated]);

  const stopReading = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    readingRef.current = false;
    setIsReading(false);
  }, []);

  const readAloud = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        LANGUAGES.find((l) => l.code === prefs.lang)?.speechLocale ?? "en-US";
      utterance.rate = 0.85;
      utterance.onend = () => {
        readingRef.current = false;
        setIsReading(false);
      };
      utterance.onerror = () => {
        readingRef.current = false;
        setIsReading(false);
      };
      readingRef.current = true;
      setIsReading(true);
      window.speechSynthesis.speak(utterance);
    },
    [prefs.lang],
  );

  useEffect(() => () => stopReading(), [stopReading]);

  const value = useMemo<AccessibilityValue>(
    () => ({
      scale: prefs.scale,
      setScale: (scale) =>
        setPrefs((p) => ({ ...p, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale)) })),
      highContrast: prefs.highContrast,
      setHighContrast: (highContrast) => setPrefs((p) => ({ ...p, highContrast })),
      lang: prefs.lang,
      setLang: (lang) => setPrefs((p) => ({ ...p, lang })),
      t: (key) => strings[prefs.lang][key],
      speechSupported,
      recognitionSupported,
      isReading,
      readAloud,
      stopReading,
    }),
    [prefs, speechSupported, recognitionSupported, isReading, readAloud, stopReading],
  );

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used inside AccessibilityProvider");
  return ctx;
}
