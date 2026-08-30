import { Link } from "@tanstack/react-router";
import { useAccessibility } from "@/lib/accessibility";
import type { StringKey } from "@/lib/i18n";

const ITEMS: { to: string; icon: string; key: StringKey }[] = [
  { to: "/", icon: "🏠", key: "navHome" },
  { to: "/reminders", icon: "💊", key: "navReminders" },
  { to: "/family", icon: "👨‍👩‍👧", key: "navFamily" },
  { to: "/explain", icon: "💡", key: "navExplain" },
  { to: "/settings", icon: "⚙", key: "navSettings" },
];

export function BottomNav() {
  const { t } = useAccessibility();

  return (
    <nav
      aria-label={t("navHome")}
      className="sticky bottom-0 z-20 border-t-2 border-border bg-card"
    >
      <ul className="mx-auto flex w-full max-w-5xl list-none items-stretch">
        {ITEMS.map((item) => (
          <li key={item.to} className="min-w-0 flex-1">
            <Link
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className:
                  "bg-primary-soft text-primary border-t-[6px] border-primary font-bold",
              }}
              inactiveProps={{ className: "text-foreground border-t-[6px] border-transparent" }}
              className="flex min-h-[4.5rem] flex-col items-center justify-center gap-1 px-1 py-3 text-center hover:bg-primary-soft"
            >
              {({ isActive }) => (
                <>
                  <span aria-hidden="true" className="text-[1.6rem] leading-none">
                    {item.icon}
                  </span>
                  <span className="text-[1rem] font-semibold leading-tight">
                    {t(item.key)}
                  </span>
                  {isActive ? <span className="sr-only">({t("currentPage")})</span> : null}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
