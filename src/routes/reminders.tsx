import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Page, PageHeading } from "@/components/PageShell";
import { useAccessibility } from "@/lib/accessibility";
import { reminders as mockReminders, type Reminder } from "@/lib/mock-data";

export const Route = createFileRoute("/reminders")({
  head: () => ({
    meta: [
      { title: "Reminders — Medicines & appointments | EASYLIFE" },
      {
        name: "description",
        content:
          "Today's medicines and upcoming appointments in large clear text. Mark one as done, add a new reminder by typing or by speaking.",
      },
      { property: "og:title", content: "Reminders — Medicines & appointments | EASYLIFE" },
      {
        property: "og:description",
        content: "Medicines and appointments, in large clear text with one big button.",
      },
    ],
  }),
  component: RemindersPage,
});

const TIME_CHOICES = [
  "6:00 AM",
  "8:00 AM",
  "10:00 AM",
  "1:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "9:00 PM",
];

const DATE_CHOICES = ["Today", "Tomorrow", "Every day"];

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

type Draft = {
  id?: string;
  title: string;
  time: string;
  date: string;
  kind: Reminder["kind"];
  note: string;
};

const EMPTY_DRAFT: Draft = {
  title: "",
  time: "8:00 AM",
  date: "Today",
  kind: "medicine",
  note: "",
};

/** Turns "Remind me to take medicine at 8 pm" into a draft. */
function parseSpeech(text: string): Draft {
  const lower = text.toLowerCase();
  const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  let time = "8:00 PM";
  if (timeMatch) {
    const hour = timeMatch[1];
    const minutes = timeMatch[2] ?? "00";
    time = `${hour}:${minutes} ${timeMatch[3]!.toUpperCase()}`;
  }
  let title = lower
    .replace(/^(please\s+)?remind me (to|about)\s*/, "")
    .replace(/\bat\b.*$/, "")
    .trim();
  if (!title) title = "New reminder";
  return {
    ...EMPTY_DRAFT,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    time,
    kind: /medicine|tablet|pill|மருந்து/.test(lower) ? "medicine" : "appointment",
    note: "Added by voice",
  };
}

function RemindersPage() {
  const { t, lang, readAloud, speechSupported, recognitionSupported } = useAccessibility();
  const [items, setItems] = useState<Reminder[]>(mockReminders);
  const [announcement, setAnnouncement] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [voiceDraft, setVoiceDraft] = useState<Draft | null>(null);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [details, setDetails] = useState<Reminder | null>(null);
  const recognitionRef = useRef<unknown>(null);

  const markDone = (item: Reminder) => {
    const at = nowLabel();
    setItems((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, done: true, doneAt: at } : r)),
    );
    setAnnouncement(`${item.title} — done at ${at}`);
  };

  const remove = (item: Reminder) => {
    setItems((prev) => prev.filter((r) => r.id !== item.id));
    setAnnouncement(`${item.title} was removed.`);
  };

  const saveDraft = (value: Draft) => {
    const title = value.title.trim() || "New reminder";
    if (value.id) {
      setItems((prev) =>
        prev.map((r) =>
          r.id === value.id
            ? { ...r, title, titleTa: title, time: value.time, date: value.date, kind: value.kind, note: value.note, noteTa: value.note }
            : r,
        ),
      );
      setAnnouncement(`${title} was changed.`);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: `r${Date.now()}`,
          title,
          titleTa: title,
          time: value.time,
          date: value.date,
          kind: value.kind,
          note: value.note,
          noteTa: value.note,
          done: false,
        },
      ]);
      setAnnouncement(`${title} was added at ${value.time}.`);
    }
    setDraft(null);
    setVoiceDraft(null);
  };

  const startListening = () => {
    const w = window as unknown as Record<string, unknown>;
    const Ctor = (w["SpeechRecognition"] ?? w["webkitSpeechRecognition"]) as
      | (new () => {
          lang: string;
          start: () => void;
          stop: () => void;
          onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
          onend: (() => void) | null;
          onerror: (() => void) | null;
        })
      | undefined;
    if (!Ctor) return;
    const recognition = new Ctor();
    recognitionRef.current = recognition;
    recognition.lang = lang === "ta" ? "ta-IN" : "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setHeard(transcript);
      setVoiceDraft(parseSpeech(transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    setListening(true);
    setHeard("");
    recognition.start();
  };

  const simulateVoice = () => {
    const example = "Remind me to take medicine at 8 pm";
    setHeard(example);
    setVoiceDraft(parseSpeech(example));
  };

  const medicines = items.filter((i) => i.kind === "medicine");
  const appointments = items.filter((i) => i.kind === "appointment");

  if (details) {
    return (
      <Page>
        <div className="card-surface flex flex-col gap-5 p-6 sm:p-8">
          <p className="text-lead font-bold text-primary">{t("appointment")}</p>
          <h1 className="text-h1 font-bold text-foreground">
            {lang === "ta" ? details.titleTa : details.title}
          </h1>
          <p className="text-h2 font-bold text-foreground">
            {details.date} · {details.time}
          </p>
          <p className="text-lead text-foreground">
            {lang === "ta" ? details.noteTa : details.note}
          </p>
          {details.doctor ? (
            <p className="text-lead text-foreground">Doctor: {details.doctor}</p>
          ) : null}
          {details.place ? (
            <p className="text-lead text-foreground">Place: {details.place}</p>
          ) : null}
          <div className="flex flex-col gap-4 sm:flex-row">
            {speechSupported ? (
              <button
                type="button"
                onClick={() =>
                  readAloud(
                    `${details.title}. ${details.date} at ${details.time}. ${details.note}. ${details.place ?? ""}`,
                  )
                }
                className="tap-target min-h-[4rem] flex-1 gap-3 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground hover:opacity-90"
              >
                <span aria-hidden="true">🔊</span>
                <span>{t("readAloud")}</span>
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setDetails(null)}
              className="tap-target min-h-[4rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              <span aria-hidden="true">←</span>
              <span>Back to reminders</span>
            </button>
          </div>
        </div>
      </Page>
    );
  }

  if (draft) {
    return (
      <Page>
        <ReminderForm
          draft={draft}
          onChange={setDraft}
          onSave={saveDraft}
          onCancel={() => setDraft(null)}
        />
      </Page>
    );
  }

  return (
    <Page showBack>
      <PageHeading title={t("remindersTitle")} intro={t("remindersIntro")} />

      <p aria-live="polite" className="text-lead font-bold text-success">
        {announcement}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => setDraft({ ...EMPTY_DRAFT })}
          className="tap-target min-h-[4.5rem] flex-1 gap-3 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
        >
          <span aria-hidden="true">＋</span>
          <span>Add a reminder</span>
        </button>
        <button
          type="button"
          onClick={recognitionSupported ? startListening : simulateVoice}
          className="tap-target min-h-[4.5rem] flex-1 gap-3 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-bold text-foreground hover:bg-primary-soft"
        >
          <span aria-hidden="true">🎤</span>
          <span>{listening ? t("listening") : "Add using voice"}</span>
        </button>
      </div>

      {!recognitionSupported ? (
        <p className="text-body text-muted-foreground">{t("notSupportedSpeak")}</p>
      ) : (
        <p className="text-body text-muted-foreground">
          Try saying: “Remind me to take medicine at 8 PM”.
        </p>
      )}

      {voiceDraft ? (
        <section
          aria-labelledby="voice-heading"
          className="card-surface flex flex-col gap-4 border-primary p-6"
        >
          <h2 id="voice-heading" className="text-h2 font-bold text-foreground">
            I understood:
          </h2>
          {heard ? (
            <p className="text-body text-muted-foreground">
              {t("heardYouSay")} “{heard}”
            </p>
          ) : null}
          <p className="text-h2 leading-snug text-foreground">
            {voiceDraft.title}, {voiceDraft.date}, {voiceDraft.time}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => saveDraft(voiceDraft)}
              className="tap-target min-h-[4.5rem] flex-1 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
            >
              Confirm Reminder
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(voiceDraft);
                setVoiceDraft(null);
              }}
              className="tap-target min-h-[4.5rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
            >
              Change
            </button>
          </div>
        </section>
      ) : null}

      <ReminderList
        heading={t("medicine")}
        items={medicines}
        lang={lang}
        onDone={markDone}
        onEdit={(item) =>
          setDraft({
            id: item.id,
            title: item.title,
            time: item.time,
            date: item.date,
            kind: item.kind,
            note: item.note,
          })
        }
        onDelete={remove}
        doneLabel={t("markDone")}
      />

      <section aria-labelledby="appointments-heading" className="flex flex-col gap-5">
        <h2 id="appointments-heading" className="text-h2 font-bold text-foreground">
          {t("appointment")}
        </h2>
        <ul className="flex list-none flex-col gap-6">
          {appointments.map((item) => (
            <li key={item.id} className="card-surface flex flex-col gap-4 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span aria-hidden="true" className="text-[2rem] leading-none">
                  🏥
                </span>
                <span className="text-lead font-bold text-foreground">
                  {item.date} · {item.time}
                </span>
              </div>
              <h3 className="text-h2 font-bold text-foreground">
                {lang === "ta" ? item.titleTa : item.title}
              </h3>
              <p className="text-lead text-muted-foreground">
                {lang === "ta" ? item.noteTa : item.note}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setDetails(item)}
                  className="tap-target min-h-[4rem] flex-1 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground hover:opacity-90"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="tap-target min-h-[4rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}

function ReminderList({
  heading,
  items,
  lang,
  onDone,
  onEdit,
  onDelete,
  doneLabel,
}: {
  heading: string;
  items: Reminder[];
  lang: string;
  onDone: (item: Reminder) => void;
  onEdit: (item: Reminder) => void;
  onDelete: (item: Reminder) => void;
  doneLabel: string;
}) {
  return (
    <section aria-labelledby="medicines-heading" className="flex flex-col gap-5">
      <h2 id="medicines-heading" className="text-h2 font-bold text-foreground">
        {heading}
      </h2>
      <ul className="flex list-none flex-col gap-6">
        {items.map((item) => (
          <li key={item.id} className="card-surface flex flex-col gap-4 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span aria-hidden="true" className="text-[2rem] leading-none">
                💊
              </span>
              <span className="text-lead font-bold text-foreground">
                {item.date} · {item.time}
              </span>
            </div>

            <h3 className="text-h2 font-bold text-foreground">
              {lang === "ta" ? item.titleTa : item.title}
            </h3>
            <p className="text-lead text-muted-foreground">
              {lang === "ta" ? item.noteTa : item.note}
            </p>

            {item.done ? (
              <p className="tap-target justify-start gap-3 rounded-xl bg-success-soft px-6 text-action font-bold text-success">
                <span aria-hidden="true">✓</span>
                <span>Done at {item.doneAt}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => onDone(item)}
                className="tap-target min-h-[4.5rem] w-full gap-3 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
              >
                <span aria-hidden="true">✓</span>
                <span>
                  {doneLabel}: {lang === "ta" ? item.titleTa : item.title}
                </span>
              </button>
            )}

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="tap-target min-h-[4rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
              >
                <span aria-hidden="true">✎</span>
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="tap-target min-h-[4rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
              >
                <span aria-hidden="true">🗑</span>
                <span>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReminderForm({
  draft,
  onChange,
  onSave,
  onCancel,
}: {
  draft: Draft;
  onChange: (value: Draft) => void;
  onSave: (value: Draft) => void;
  onCancel: () => void;
}) {
  return (
    <form
      className="card-surface flex flex-col gap-7 p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <h1 className="text-h1 font-bold text-foreground">
        {draft.id ? "Change this reminder" : "Add a reminder"}
      </h1>

      <div className="flex flex-col gap-3">
        <label htmlFor="r-title" className="text-lead font-bold text-foreground">
          What should we remind you about?
        </label>
        <input
          id="r-title"
          value={draft.title}
          onChange={(event) => onChange({ ...draft, title: event.target.value })}
          placeholder="Morning Medicine"
          className="min-h-[4.5rem] rounded-xl border-2 border-border-strong bg-background px-5 text-action text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-lead font-bold text-foreground">What kind is it?</legend>
        <div className="flex flex-col gap-4 sm:flex-row">
          {(
            [
              { value: "medicine", label: "💊 Medicine" },
              { value: "appointment", label: "🏥 Appointment" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`tap-target min-h-[4.5rem] flex-1 cursor-pointer justify-center gap-3 rounded-xl border-2 px-6 text-action font-semibold ${
                draft.kind === option.value
                  ? "border-primary bg-primary-soft text-foreground"
                  : "border-border-strong bg-card text-foreground"
              }`}
            >
              <input
                type="radio"
                name="kind"
                value={option.value}
                checked={draft.kind === option.value}
                onChange={() => onChange({ ...draft, kind: option.value })}
                className="h-6 w-6"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label htmlFor="r-date" className="text-lead font-bold text-foreground">
          Which day?
        </label>
        <select
          id="r-date"
          value={draft.date}
          onChange={(event) => onChange({ ...draft, date: event.target.value })}
          className="min-h-[4.5rem] rounded-xl border-2 border-border-strong bg-background px-5 text-action text-foreground"
        >
          {[...new Set([...DATE_CHOICES, draft.date])].map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="r-time" className="text-lead font-bold text-foreground">
          What time?
        </label>
        <select
          id="r-time"
          value={draft.time}
          onChange={(event) => onChange({ ...draft, time: event.target.value })}
          className="min-h-[4.5rem] rounded-xl border-2 border-border-strong bg-background px-5 text-action text-foreground"
        >
          {[...new Set([...TIME_CHOICES, draft.time])].map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="r-note" className="text-lead font-bold text-foreground">
          Anything to remember? (you can leave this empty)
        </label>
        <input
          id="r-note"
          value={draft.note}
          onChange={(event) => onChange({ ...draft, note: event.target.value })}
          placeholder="Take 1 tablet after breakfast"
          className="min-h-[4.5rem] rounded-xl border-2 border-border-strong bg-background px-5 text-action text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          className="tap-target min-h-[4.5rem] flex-1 rounded-xl bg-primary px-6 text-action font-bold text-primary-foreground hover:opacity-90"
        >
          Save reminder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="tap-target min-h-[4.5rem] flex-1 rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
