import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { reminders } from "@/lib/mock-data";
import type { StringKey } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EASYLIFE — Home | Simple help for every day" },
      {
        name: "description",
        content:
          "Four large, clear actions: medicine reminders, call family, emergency help and plain-language explanations. Built for people 60 and above.",
      },
      { property: "og:title", content: "EASYLIFE — Home | Simple help for every day" },
      {
        property: "og:description",
        content: "Reminders, family calls, emergency help and simple explanations in one calm place.",
      },
    ],
  }),
  component: HomePage,
});

type ActionCard = {
  to: string;
  icon: string;
  titleKey: StringKey;
  subKey: StringKey;
  emergency?: boolean;
};

const CARDS: ActionCard[] = [
  { to: "/reminders", icon: "💊", titleKey: "cardReminders", subKey: "cardRemindersSub" },
  { to: "/family", icon: "👨‍👩‍👧", titleKey: "cardFamily", subKey: "cardFamilySub" },
  { to: "/emergency", icon: "🆘", titleKey: "cardSos", subKey: "cardSosSub", emergency: true },
  { to: "/explain", icon: "💡", titleKey: "cardExplain", subKey: "cardExplainSub" },
];

function HomePage() {
  const { t, lang } = useAccessibility();
  const [greetingKey, setGreetingKey] = useState<StringKey>("goodMorning");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreetingKey(hour < 12 ? "goodMorning" : hour < 17 ? "goodAfternoon" : "goodEvening");
  }, []);

  return (
    <Page>
      <header className="flex flex-col gap-2">
        <p className="text-h2 font-semibold text-muted-foreground">{t(greetingKey)}</p>
        <h1 className="text-h1 font-bold tracking-tight text-foreground">
          {t("howCanWeHelp")}
        </h1>
      </header>

      <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((card) => (
          <li key={card.to}>
            <Link
              to={card.to}
              className={`flex min-h-[9rem] w-full items-center gap-5 rounded-3xl border-2 p-6 shadow-card transition-colors ${
                card.emergency
                  ? "border-emergency bg-emergency-soft hover:bg-emergency hover:text-emergency-foreground"
                  : "border-border bg-card hover:bg-primary-soft"
              }`}
            >
              <span aria-hidden="true" className="shrink-0 text-[2.75rem] leading-none">
                {card.icon}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span
                  className={`text-action font-bold ${
                    card.emergency ? "text-emergency" : "text-foreground"
                  }`}
                >
                  {t(card.titleKey)}
                </span>
                <span className="text-lead text-muted-foreground">{t(card.subKey)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="today-heading" className="flex flex-col gap-4">
        <h2 id="today-heading" className="text-h2 font-bold text-foreground">
          {t("todaysThings")}
        </h2>
        <ul className="flex list-none flex-col gap-4">
          {reminders.slice(0, 3).map((item) => (
            <li
              key={item.id}
              className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5"
            >
              <div className="min-w-0">
                <p className="text-lead font-bold text-foreground">{item.time}</p>
                <p className="text-lead text-foreground">
                  {lang === "ta" ? item.titleTa : item.title}
                </p>
              </div>
              <p
                className={`shrink-0 rounded-xl px-4 py-2 text-body font-bold ${
                  item.done
                    ? "bg-success-soft text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span aria-hidden="true">{item.done ? "✓ " : "• "}</span>
                {item.done ? t("completed") : t("notYetDone")}
              </p>
            </li>
          ))}
        </ul>
        <Link
          to="/reminders"
          className="tap-target self-start rounded-xl bg-primary px-8 text-action font-semibold text-primary-foreground hover:opacity-90"
        >
          {t("remindersTitle")}
        </Link>
      </section>
    </Page>
  );
}
