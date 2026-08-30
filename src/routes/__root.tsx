import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AccessibilityProvider, useAccessibility } from "../lib/accessibility";
import { AccessibilityToolbar } from "../components/AccessibilityToolbar";
import { BottomNav } from "../components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-h1 font-bold text-foreground">This page was not found</h1>
        <p className="mt-4 text-lead text-muted-foreground">
          Nothing is broken. Press the big button below to go back to the home page.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="tap-target rounded-xl bg-primary px-8 text-action font-semibold text-primary-foreground hover:opacity-90"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-h1 font-bold text-foreground">This page did not open</h1>
        <p className="mt-4 text-lead text-muted-foreground">
          You did nothing wrong. Please press Try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="tap-target rounded-xl bg-primary px-8 text-action font-semibold text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="tap-target rounded-xl border-2 border-border-strong bg-card px-8 text-action font-semibold text-foreground hover:bg-primary-soft"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EASYLIFE — Digital help for seniors" },
      {
        name: "description",
        content:
          "EASYLIFE is a simple, accessible assistant for people 60+: medicine reminders, family calls, emergency help and plain-language explanations.",
      },
      { name: "author", content: "EASYLIFE" },
      { property: "og:title", content: "EASYLIFE — Digital help for seniors" },
      {
        property: "og:description",
        content: "Technology made simpler, safer, and more human.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppFrame() {
  const { t } = useAccessibility();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only-focusable tap-target z-50 rounded-xl bg-primary px-6 text-action font-semibold text-primary-foreground"
      >
        {t("skipToContent")}
      </a>

      <header className="border-b-2 border-border bg-card">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 sm:px-6">
          <div className="min-w-0">
            <Link to="/" className="text-h2 font-bold tracking-wide text-primary">
              {t("appName")}
            </Link>
            <p className="text-body text-muted-foreground">{t("tagline")}</p>
          </div>
          <Link
            to="/emergency"
            className="tap-target shrink-0 gap-2 rounded-xl bg-emergency px-5 text-action font-bold text-emergency-foreground hover:opacity-90"
          >
            <span aria-hidden="true">🆘</span>
            <span>SOS</span>
          </Link>
        </div>
      </header>

      <AccessibilityToolbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <AppFrame />
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}
