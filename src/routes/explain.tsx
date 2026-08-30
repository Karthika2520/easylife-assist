import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { explainTerms, type ExplainTerm } from "@/lib/mock-data";

export const Route = createFileRoute("/explain")({
  head: () => ({
    meta: [
      { title: "Explain This — Difficult words in plain language | EASYLIFE" },
      {
        name: "description",
        content:
          "OTP, UPI, KYC, PIN, QR code and more, explained in short simple sentences with a safety tip. Search for a word and hear it read aloud.",
      },
      {
        property: "og:title",
        content: "Explain This — Difficult words in plain language | EASYLIFE",
      },
      {
        property: "og:description",
        content: "Confusing tech words explained in short, simple sentences.",
      },
    ],
  }),
  component: ExplainPage,
});

function ExplainPage() {
  const { t, lang, readAloud, speechSupported } = useAccessibility();
  const [selected, setSelected] = useState<ExplainTerm | null>(null);
  const [simpler, setSimpler] = useState(false);
  const [query, setQuery] = useState("");

  if (selected) {
    const term = lang === "ta" ? selected.termTa : selected.term;
    const normal = lang === "ta" ? selected.simpleTa : selected.simple;
    const easiest = lang === "ta" ? selected.simplerTa : selected.simpler;
    const explanation = simpler ? easiest : normal;
    const safety = lang === "ta" ? selected.safetyTa : selected.safety;

    return (
      <Page>
        <div className="card-surface flex flex-col gap-6 p-6 sm:p-8">
          <h1 className="text-h1 font-bold text-foreground">{term}</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-lead font-bold text-primary">{t("explainAnswerTitle")}</h2>
            <p className="text-h2 leading-snug text-foreground">{explanation}</p>
          </div>
          <p className="rounded-2xl border-2 border-border bg-primary-soft p-5 text-lead font-semibold text-foreground">
            <span aria-hidden="true">🛡 </span>
            {safety}
          </p>

          <div className="flex flex-col gap-4">
            {speechSupported ? (
              <button
                type="button"
                onClick={() => readAloud(`${term}. ${explanation}. ${safety}`)}
                className="tap-target min-h-[4.5rem] w-full gap-3 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
              >
                <span aria-hidden="true">🔊</span>
                <span>Read Explanation Aloud</span>
              </button>
            ) : (
              <p className="text-body text-muted-foreground">{t("notSupportedRead")}</p>
            )}
            <button
              type="button"
              onClick={() => setSimpler((value) => !value)}
              aria-pressed={simpler}
              className="tap-target min-h-[4.5rem] w-full gap-3 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              <span aria-hidden="true">💡</span>
              <span>{simpler ? "Show the full explanation" : "Explain More Simply"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setSimpler(false);
              }}
              className="tap-target min-h-[4.5rem] w-full rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              <span aria-hidden="true">←</span>
              <span>{t("chooseAnother")}</span>
            </button>
          </div>
        </div>
      </Page>
    );
  }

  const needle = query.trim().toLowerCase();
  const results = needle
    ? explainTerms.filter((item) =>
        `${item.term} ${item.termTa} ${item.simple}`.toLowerCase().includes(needle),
      )
    : explainTerms;

  return (
    <Page showBack>
      <PageHeading title={t("explainTitle")} intro={t("explainIntro")} />

      <div className="flex flex-col gap-3">
        <label htmlFor="explain-search" className="text-lead font-bold text-foreground">
          Search for a word
        </label>
        <input
          id="explain-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="OTP"
          className="min-h-[4.5rem] rounded-xl border-2 border-border-strong bg-background px-5 text-action text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {results.length === 0 ? (
        <p className="text-lead text-foreground">
          We do not have that word yet. Try OTP, UPI, KYC, PIN or QR Code.
        </p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-5 md:grid-cols-2">
          {results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(item);
                  setSimpler(false);
                }}
                className="card-surface flex min-h-[7rem] w-full flex-col items-start gap-2 px-6 py-5 text-left hover:bg-primary-soft"
              >
                <span className="flex items-center gap-4">
                  <span aria-hidden="true" className="shrink-0 text-[2rem] leading-none">
                    💡
                  </span>
                  <span className="min-w-0 text-action font-bold text-foreground">
                    {lang === "ta" ? item.termTa : item.term}
                  </span>
                </span>
                <span className="text-body text-muted-foreground">
                  {lang === "ta" ? item.simplerTa : item.simpler}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
