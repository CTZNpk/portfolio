import Link from "next/link";
import ScrollProgress from "@/components/ui/ScrollProgress";
import type { NavItem } from "@/lib/portfolio/types";

type HeaderTab = "home" | "blogs" | "experience" | "resume";

const fallbackNavItems: { label: string; href: string; key: HeaderTab }[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Blogs", href: "/blogs", key: "blogs" },
  { label: "Experience", href: "/experience", key: "experience" },
  { label: "Resume", href: "/resume", key: "resume" },
];

function getConfiguredNavItems(navItems: NavItem[] | undefined) {
  return fallbackNavItems.map((fallback) => {
    const configured = navItems?.find((item) => item.id === fallback.key);

    return {
      ...fallback,
      label: configured?.label || fallback.label,
      href: configured?.href || fallback.href,
    };
  });
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return initials.toUpperCase() || "·";
}

export default function PortfolioHeader({
  active,
  name,
  navItems,
}: {
  active: HeaderTab;
  name: string;
  navItems?: NavItem[];
}) {
  const configuredNavItems = getConfiguredNavItems(navItems);
  const initials = getInitials(name);

  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-brand text-[0.7rem] font-bold tracking-wide text-white shadow-sm transition duration-300 group-hover:-rotate-6 group-hover:bg-brand-deep">
              {initials}
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-ink transition group-hover:text-brand sm:inline">
              {name}
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex min-w-max items-center gap-1 sm:gap-2">
              {configuredNavItems.map((item) => {
                const isActive = active === item.key;

                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative inline-flex h-9 items-center px-2.5 text-sm font-medium transition sm:px-3 ${
                        isActive
                          ? "text-brand"
                          : "text-ink-soft hover:text-brand"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-2.5 bottom-0 h-[2px] origin-left bg-brand transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-3 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
