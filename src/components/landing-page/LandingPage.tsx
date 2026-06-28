import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import type { PortfolioContent } from "@/lib/portfolio/types";

function resolveCtaHref(href: string, email: string) {
  if (href === "#contact" || href === "mailto:contact") {
    return `mailto:${email}`;
  }

  return href;
}

export default function LandingPage({ content }: { content: PortfolioContent }) {
  const primaryHref = resolveCtaHref(
    content.hero.primaryCta.href,
    content.contact.email,
  );
  const secondaryHref = resolveCtaHref(
    content.hero.secondaryCta.href,
    content.contact.email,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbf7] text-[#151815]">
      <PortfolioHeader
        active="home"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="flex flex-1">
        <section className="flex w-full items-center justify-center px-5 py-16 text-center sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6b48] sm:text-sm">
              {content.hero.badge}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-none text-[#111611] sm:text-6xl lg:text-7xl">
              {content.hero.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-2xl leading-tight text-[#28362d] sm:text-3xl">
              {content.hero.headline}
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#536059] sm:text-lg">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={primaryHref}
                className="inline-flex h-11 items-center justify-center bg-[#0f6b48] px-5 text-sm font-semibold text-white transition hover:bg-[#0b5137]"
              >
                {content.hero.primaryCta.label}
              </a>
              {content.hero.secondaryCta.label && secondaryHref ? (
                <a
                  href={secondaryHref}
                  className="inline-flex h-11 items-center justify-center border border-black/10 bg-white px-5 text-sm font-semibold text-[#263129] transition hover:border-[#0f6b48]/40 hover:text-[#0f6b48]"
                >
                  {content.hero.secondaryCta.label}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <PortfolioFooter
        name={content.hero.name}
        contactEmail={content.contact.email}
        socialLinks={content.socialLinks}
      />
    </div>
  );
}
