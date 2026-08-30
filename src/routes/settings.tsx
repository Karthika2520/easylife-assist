import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeading } from "@/components/PageShell";
import { MAX_SCALE, MIN_SCALE, useAccessibility } from "@/lib/accessibility";
import { LANGUAGES } from "@/lib/i18n";
import { familyMembers } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Text size, contrast and language | EASYLIFE" },
      {
        name: "description",
        content:
          "Change text size up to 300%, turn on high contrast, choose English or Tamil, and check your emergency contact.",
      },
      { property: "og:title", content: "Settings — Text size, contrast and language | EASYLIFE" },
      {
        property: "og:description",
        content: "Text size, high contrast and language, all in one simple page.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t, scale, setScale, highContrast, setHighContrast, lang, setLang } =
    useAccessibility();
  const contact = familyMembers[0];

  return (
    <Page showBack>
      <PageHeading title={t("settingsTitle")} intro={t("settingsIntro")} />

      <section aria-labelledby="settings-text" className="card-surface flex flex-col gap-4 p-6">
        <h2 id="settings-text" className="text-h2 font-bold text-foreground">
          {t("textSize")}: {scale}%
        </h2>
        <p className="text-lead text-muted-foreground">{t("textSizeHelp")}</p>
        <input
          id="settings-text-size"
          aria-labelledby="settings-text"
          type="range"
          min={MIN_SCALE}
          max={MAX_SCALE}
          step={10}
          value={scale}
          onChange={(event) => setScale(Number(event.target.value))}
          className="h-12 w-full cursor-pointer accent-primary"
        />
        <button
          type="button"
          onClick={() => setScale(100)}
          className="tap-target min-h-[4rem] rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
        >
          {t("resetTextSize")}
        </button>
      </section>

      <section
        aria-labelledby="settings-contrast"
        className="card-surface flex flex-col gap-4 p-6"
      >
        <h2 id="settings-contrast" className="text-h2 font-bold text-foreground">
          {t("highContrast")}
        </h2>
        <button
          type="button"
          aria-pressed={highContrast}
          onClick={() => setHighContrast(!highContrast)}
          className="tap-target min-h-[4rem] gap-3 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground hover:opacity-90"
        >
          <span aria-hidden="true">◐</span>
          <span>{highContrast ? t("highContrastOn") : t("highContrastOff")}</span>
        </button>
      </section>

      <section aria-labelledby="settings-lang" className="card-surface flex flex-col gap-4 p-6">
        <h2 id="settings-lang" className="text-h2 font-bold text-foreground">
          {t("language")}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          {LANGUAGES.map((option) => (
            <button
              key={option.code}
              type="button"
              aria-pressed={lang === option.code}
              onClick={() => setLang(option.code)}
              className={`tap-target min-h-[4rem] flex-1 rounded-xl border-2 px-6 text-action font-semibold ${
                lang === option.code
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border-strong bg-card text-foreground hover:bg-primary-soft"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="settings-details"
        className="card-surface flex flex-col gap-3 p-6"
      >
        <h2 id="settings-details" className="text-h2 font-bold text-foreground">
          {t("yourDetails")}
        </h2>
        <p className="text-lead text-foreground">
          <span className="font-bold">{t("name")}:</span> Kamala Raman
        </p>
        <p className="text-lead text-foreground">
          <span className="font-bold">{t("emergencyContact")}:</span>{" "}
          {contact ? `${contact.name} — ${contact.phone}` : "—"}
        </p>
        <p className="text-body text-muted-foreground">{t("saved")}</p>
      </section>
    </Page>
  );
}
