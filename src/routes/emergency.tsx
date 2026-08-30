import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { familyMembers } from "@/lib/mock-data";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency SOS — Get help now | EASYLIFE" },
      {
        name: "description",
        content:
          "Hold one large red button for three seconds to alert your emergency contact. Clear confirmation and an easy way to cancel.",
      },
      { property: "og:title", content: "Emergency SOS — Get help now | EASYLIFE" },
      {
        property: "og:description",
        content: "Hold the red button for three seconds to call for help.",
      },
    ],
  }),
  component: EmergencyPage,
});

const HOLD_MS = 3000;

function EmergencyPage() {
  const { t } = useAccessibility();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contact = familyMembers[0];

  const clear = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => clear, []);

  const start = () => {
    if (status !== "idle" || timerRef.current) return;
    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startedAt) / HOLD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clear();
        setStatus("sending");
        window.setTimeout(() => setStatus("sent"), 1200);
      }
    }, 100);
  };

  const cancel = () => {
    clear();
    setProgress(0);
  };

  const reset = () => {
    clear();
    setProgress(0);
    setStatus("idle");
  };

  return (
    <Page showBack>
      <PageHeading title={t("sosTitle")} intro={t("sosIntro")} />

      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-emergency bg-emergency-soft p-6 sm:p-8">
        {status === "sent" ? (
          <>
            <p aria-hidden="true" className="text-[3rem] leading-none">
              ✅
            </p>
            <p
              role="status"
              className="max-w-2xl text-center text-h2 font-bold text-foreground"
            >
              {t("sosSent")}
            </p>
            <p className="text-lead text-foreground">
              {contact.name} · {contact.phone}
            </p>
            <button
              type="button"
              onClick={reset}
              className="tap-target min-h-[4rem] w-full max-w-md rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              {t("sosCancel")}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onPointerDown={start}
              onPointerUp={cancel}
              onPointerLeave={cancel}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") start();
              }}
              onKeyUp={cancel}
              disabled={status === "sending"}
              aria-describedby="sos-help"
              className="flex min-h-[10rem] w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-3xl bg-emergency px-8 py-6 text-center text-emergency-foreground hover:opacity-95 disabled:opacity-80"
            >
              <span aria-hidden="true" className="text-[3rem] leading-none">
                🆘
              </span>
              <span className="text-[1.75rem] font-bold leading-tight">
                {status === "sending" ? t("sosSending") : t("sosHold")}
              </span>
            </button>

            <div
              className="h-6 w-full max-w-2xl overflow-hidden rounded-full border-2 border-emergency bg-card"
              role="progressbar"
              aria-label={t("sosHold")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full bg-emergency"
                style={{ width: `${status === "sending" ? 100 : progress}%` }}
              />
            </div>

            <p id="sos-help" className="text-lead text-foreground">
              {t("sosNoEmergency")}
            </p>
          </>
        )}
      </div>

      <section aria-labelledby="sos-contact" className="card-surface flex flex-col gap-3 p-6">
        <h2 id="sos-contact" className="text-h2 font-bold text-foreground">
          {t("emergencyContact")}
        </h2>
        <p className="text-lead text-foreground">
          {contact.name} — {contact.phone}
        </p>
      </section>
    </Page>
  );
}
