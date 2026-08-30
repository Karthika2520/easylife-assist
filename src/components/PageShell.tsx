import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAccessibility } from "@/lib/accessibility";

export function PageHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-h1 font-bold tracking-tight text-foreground">{title}</h1>
      {intro ? <p className="text-lead text-muted-foreground">{intro}</p> : null}
    </header>
  );
}

export function BackButton() {
  const router = useRouter();
  const { t } = useAccessibility();

  return (
    <button
      type="button"
      onClick={() => {
        if (router.history.canGoBack()) router.history.back();
        else void router.navigate({ to: "/" });
      }}
      className="tap-target gap-3 self-start rounded-xl border-2 border-border-strong bg-card px-6 text-action font-semibold text-foreground hover:bg-primary-soft"
    >
      <span aria-hidden="true">←</span>
      <span>{t("back")}</span>
    </button>
  );
}

export function Page({
  children,
  showBack = false,
}: {
  children: ReactNode;
  showBack?: boolean;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      {showBack ? <BackButton /> : null}
      {children}
    </div>
  );
}
