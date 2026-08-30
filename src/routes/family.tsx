import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { familyMembers, type FamilyMember } from "@/lib/mock-data";

export const Route = createFileRoute("/family")({
  head: () => ({
    meta: [
      { title: "Call Family — Contact someone you trust | EASYLIFE" },
      {
        name: "description",
        content:
          "Favourite contacts first: son, daughter, doctor and your emergency contact. One large button to call the people you trust.",
      },
      { property: "og:title", content: "Call Family — Contact someone you trust | EASYLIFE" },
      {
        property: "og:description",
        content: "One large button to call the people you trust.",
      },
    ],
  }),
  component: FamilyPage,
});

function FamilyPage() {
  const { t, lang } = useAccessibility();
  const [calling, setCalling] = useState<FamilyMember | null>(null);

  if (calling) {
    return (
      <Page>
        <div className="card-surface flex flex-col items-center gap-6 p-8 text-center">
          <p className="text-lead font-bold text-primary" aria-live="polite">
            {t("calling")} {calling.name}…
          </p>
          <p aria-hidden="true" className="text-[3rem] leading-none">
            📞
          </p>
          <h1 className="text-h1 font-bold text-foreground">{calling.name}</h1>
          <p className="text-lead text-muted-foreground">
            {lang === "ta" ? calling.relationTa : calling.relation} · {calling.phone}
          </p>
          <p className="text-lead text-foreground">{t("callingHelp")}</p>
          <p className="text-body text-muted-foreground">
            Demo only: this is a prototype, no real call is made.
          </p>
          <button
            type="button"
            onClick={() => setCalling(null)}
            className="tap-target min-h-[4.5rem] w-full max-w-md gap-3 rounded-xl bg-emergency px-6 text-action font-bold text-emergency-foreground hover:opacity-90"
          >
            <span aria-hidden="true">■</span>
            <span>{t("endCall")}</span>
          </button>
        </div>
      </Page>
    );
  }

  const favourites = familyMembers.filter((m) => m.favorite);
  const others = familyMembers.filter((m) => !m.favorite);

  return (
    <Page showBack>
      <PageHeading title={t("familyTitle")} intro={t("familyIntro")} />

      <ContactGroup
        id="favourite-contacts"
        heading="Favourite contacts"
        members={favourites}
        lang={lang}
        onCall={setCalling}
        callLabel={t("callNow")}
      />

      {others.length ? (
        <ContactGroup
          id="other-contacts"
          heading="Other people you trust"
          members={others}
          lang={lang}
          onCall={setCalling}
          callLabel={t("callNow")}
        />
      ) : null}
    </Page>
  );
}

function ContactGroup({
  id,
  heading,
  members,
  lang,
  onCall,
  callLabel,
}: {
  id: string;
  heading: string;
  members: FamilyMember[];
  lang: string;
  onCall: (member: FamilyMember) => void;
  callLabel: string;
}) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <h2 id={id} className="text-h2 font-bold text-foreground">
        {heading}
      </h2>
      <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2">
        {members.map((member) => (
          <li key={member.id} className="card-surface flex flex-col gap-4 p-6">
            <div className="flex min-w-0 items-center gap-4">
              <span
                aria-hidden="true"
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-primary-soft text-h2 font-bold text-primary"
              >
                {member.initials}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-h2 font-bold text-foreground">{member.name}</span>
                <span className="text-lead text-muted-foreground">
                  {lang === "ta" ? member.relationTa : member.relation}
                </span>
                <span className="text-body text-muted-foreground">{member.phone}</span>
                {member.isEmergencyContact ? (
                  <span className="mt-2 w-fit rounded-xl bg-emergency-soft px-3 py-1 text-body font-bold text-emergency">
                    Emergency contact
                  </span>
                ) : null}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onCall(member)}
              className="tap-target min-h-[4.5rem] w-full gap-3 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
            >
              <span aria-hidden="true">📞</span>
              <span>
                {callLabel} {member.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
