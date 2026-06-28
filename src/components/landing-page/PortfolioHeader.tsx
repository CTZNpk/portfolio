import Link from "next/link";
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

  return (
    <header className="sticky top-0 z-20 border-b border-[#dce5dc] bg-[#fbfbf7]/90 px-5 backdrop-blur sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold uppercase tracking-[0.16em] text-[#1c2a22] transition hover:text-[#0f6b48]"
        >
          {name}
        </Link>

        <nav
          aria-label="Main navigation"
          className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex min-w-max items-center gap-5">
            {configuredNavItems.map((item) => {
              const isActive = active === item.key;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-flex h-8 items-center text-sm font-medium transition ${
                      isActive
                        ? "text-[#0f6b48] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#0f6b48]"
                        : "text-[#4e5d53] hover:text-[#0f6b48]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
