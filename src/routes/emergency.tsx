import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { emergencyContact } from "@/lib/mock-data";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency SOS — Get help now | EASYLIFE" },
      {
        name: "description",
        content:
          "Ask for emergency help in two clear steps. We show your emergency contact, your location status and the time help was requested.",
      },
      { property: "og:title", content: "Emergency SOS — Get help now | EASYLIFE" },
      {
        property: "og:description",
        content: "Two simple steps to call your emergency contact for help.",
      },
    ],
  }),
  component: EmergencyPage,
});

type Step = "start" | "confirm" | "calling" | "done";

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function DemoNote() {
  return (
    <p className="rounded-2xl border-2 border-border bg-muted p-4 text-body font-semibold text-foreground">
      <span aria-hidden="true">ℹ️ </span>
      Demo only: this is a prototype. No real call, message or location is sent.
    </p>
  );
}

function EmergencyPage() {
  const { t } = useAccessibility();
  const [step, setStep] = useState<Step>("start");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (step !== "calling") return;
    const id = window.setTimeout(() => {
      setTime(nowLabel());
      setStep("done");
    }, 1800);
    return () => window.clearTimeout(id);
  }, [step]);

  return (
    <Page showBack>
      <PageHeading
        title={t("sosTitle")}
        intro="Ask for help in two simple steps. Nothing happens until you press Yes."
      />
      <DemoNote />

      {step === "start" ? (
        <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-emergency bg-emergency-soft p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setStep("confirm")}
            className="flex min-h-[10rem] w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-3xl bg-emergency px-8 py-6 text-center text-emergency-foreground hover:opacity-95"
          >
            <span aria-hidden="true" className="text-[3rem] leading-none">
              🆘
            </span>
            <span className="text-[1.75rem] font-bold leading-tight">
              I need emergency help
            </span>
          </button>
          <p className="text-lead text-foreground">
            You will be asked to confirm first, so nothing happens by mistake.
          </p>
        </div>
      ) : null}

      {step === "confirm" ? (
        <section
          aria-labelledby="sos-confirm-heading"
          className="flex flex-col gap-6 rounded-3xl border-2 border-emergency bg-emergency-soft p-6 sm:p-8"
        >
          <h2
            id="sos-confirm-heading"
            className="text-h1 font-bold leading-snug text-foreground"
          >
            Do you need emergency help?
          </h2>
          <p className="text-lead text-foreground">
            We will call {emergencyContact.name} ({emergencyContact.relation}) on{" "}
            {emergencyContact.phone} and share where you are.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep("calling")}
              className="tap-target min-h-[4.5rem] flex-1 gap-3 rounded-xl bg-emergency px-6 text-action font-bold text-emergency-foreground hover:opacity-95"
            >
              <span aria-hidden="true">📞</span>
              <span>Yes, Call Now</span>
            </button>
            <button
              type="button"
              onClick={() => setStep("start")}
              className="tap-target min-h-[4.5rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              Cancel
            </button>
          </div>
        </section>
      ) : null}

      {step === "calling" ? (
        <section className="flex flex-col items-center gap-5 rounded-3xl border-2 border-emergency bg-emergency-soft p-8 text-center">
          <p aria-hidden="true" className="text-[3rem] leading-none">
            📞
          </p>
          <p role="status" className="text-h2 font-bold text-foreground">
            Calling your emergency contact…
          </p>
          <p className="text-lead text-foreground">
            {emergencyContact.name} · {emergencyContact.phone}
          </p>
          <p className="text-lead text-foreground">Please stay where you are.</p>
        </section>
      ) : null}

      {step === "done" ? (
        <section
          aria-labelledby="sos-done-heading"
          className="flex flex-col gap-6 rounded-3xl border-2 border-emergency bg-card p-6 sm:p-8"
        >
          <h2 id="sos-done-heading" className="text-h1 font-bold text-foreground" role="status">
            Help has been requested
          </h2>

          <ul className="flex list-none flex-col gap-4">
            {[
              "Emergency contact notified",
              "Location shared",
              "Help request created",
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-4 rounded-2xl bg-success-soft px-5 py-4 text-action font-bold text-success"
              >
                <span aria-hidden="true">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-1 gap-4 text-lead text-foreground sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-border p-5">
              <dt className="font-bold text-primary">{t("emergencyContact")}</dt>
              <dd>
                {emergencyContact.name} ({emergencyContact.relation})
              </dd>
            </div>
            <div className="rounded-2xl border-2 border-border p-5">
              <dt className="font-bold text-primary">Phone number</dt>
              <dd>{emergencyContact.phone}</dd>
            </div>
            <div className="rounded-2xl border-2 border-border p-5">
              <dt className="font-bold text-primary">Location</dt>
              <dd>Shared — 14 Gandhi Street, Chennai (demo)</dd>
            </div>
            <div className="rounded-2xl border-2 border-border p-5">
              <dt className="font-bold text-primary">Time</dt>
              <dd>Today at {time}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setStep("start")}
            className="tap-target min-h-[4.5rem] w-full rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
          >
            {t("sosCancel")}
          </button>
        </section>
      ) : null}
    </Page>
  );
}
