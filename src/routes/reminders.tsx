import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { reminders as mockReminders } from "@/lib/mock-data";

export const Route = createFileRoute("/reminders")({
  head: () => ({
    meta: [
      { title: "Reminders — Medicines & appointments | EASYLIFE" },
      {
        name: "description",
        content:
          "See today's medicines and appointments in large, clear text and mark each one as done with one big button.",
      },
      { property: "og:title", content: "Reminders — Medicines & appointments | EASYLIFE" },
      {
        property: "og:description",
        content: "Today's medicines and appointments, in large clear text.",
      },
    ],
  }),
  component: RemindersPage,
});

function RemindersPage() {
  const { t, lang } = useAccessibility();
  const [items, setItems] = useState(mockReminders);
  const [announcement, setAnnouncement] = useState("");

  const markDone = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: true } : item)));
    setAnnouncement(t("markedDone"));
  };

  return (
    <Page showBack>
      <PageHeading title={t("remindersTitle")} intro={t("remindersIntro")} />

      <p aria-live="polite" className="text-lead font-bold text-success">
        {announcement}
      </p>

      <ul className="flex list-none flex-col gap-6">
        {items.map((item) => (
          <li key={item.id} className="card-surface flex flex-col gap-4 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span aria-hidden="true" className="text-[2rem] leading-none">
                {item.kind === "medicine" ? "💊" : "🩺"}
              </span>
              <span className="text-lead font-bold text-primary">
                {item.kind === "medicine" ? t("medicine") : t("appointment")}
              </span>
              <span className="text-lead font-bold text-foreground">{item.time}</span>
            </div>

            <h2 className="text-h2 font-bold text-foreground">
              {lang === "ta" ? item.titleTa : item.title}
            </h2>
            <p className="text-lead text-muted-foreground">
              {lang === "ta" ? item.noteTa : item.note}
            </p>

            {item.done ? (
              <p className="tap-target justify-start gap-3 rounded-xl bg-success-soft px-6 text-action font-bold text-success">
                <span aria-hidden="true">✓</span>
                <span>{t("completed")}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => markDone(item.id)}
                className="tap-target min-h-[4rem] w-full gap-3 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground hover:opacity-90"
              >
                <span aria-hidden="true">✓</span>
                <span>
                  {t("markDone")}: {lang === "ta" ? item.titleTa : item.title}
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </Page>
  );
}
