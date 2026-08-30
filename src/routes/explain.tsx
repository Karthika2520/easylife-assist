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
          "OTP, UPI, Wi-Fi, app updates and more, explained in short simple sentences with a safety tip for each one.",
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

  if (selected) {
    const term = lang === "ta" ? selected.termTa : selected.term;
    const simple = lang === "ta" ? selected.simpleTa : selected.simple;
    const safety = lang === "ta" ? selected.safetyTa : selected.safety;

    return (
      <Page>
        <div className="card-surface flex flex-col gap-6 p-6 sm:p-8">
          <h1 className="text-h1 font-bold text-foreground">{term}</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-lead font-bold text-primary">{t("explainAnswerTitle")}</h2>
            <p className="text-h2 leading-snug text-foreground">{simple}</p>
          </div>
          <p className="rounded-2xl border-2 border-border bg-primary-soft p-5 text-lead font-semibold text-foreground">
            <span aria-hidden="true">🛡 </span>
            {safety}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {speechSupported ? (
              <button
                type="button"
                onClick={() => readAloud(`${term}. ${simple}. ${safety}`)}
                className="tap-target min-h-[4rem] flex-1 gap-3 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground hover:opacity-90"
              >
                <span aria-hidden="true">🔊</span>
                <span>{t("readAloud")}</span>
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="tap-target min-h-[4rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              {t("chooseAnother")}
            </button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page showBack>
      <PageHeading title={t("explainTitle")} intro={t("explainIntro")} />

      <ul className="grid list-none grid-cols-1 gap-5 md:grid-cols-2">
        {explainTerms.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="card-surface flex min-h-[5.5rem] w-full items-center gap-4 px-6 py-5 text-left hover:bg-primary-soft"
            >
              <span aria-hidden="true" className="shrink-0 text-[2rem] leading-none">
                💡
              </span>
              <span className="min-w-0 text-action font-bold text-foreground">
                {lang === "ta" ? item.termTa : item.term}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Page>
  );
}
