import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { ArrowRight } from "@/components/ui/icons";
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
  const contactHref = `mailto:${content.contact.email}`;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <PortfolioHeader
        active="home"
        name={content.hero.name}
        navItems={content.navItems}
      />

      {/* Side social rail (desktop) */}
      {content.socialLinks.length > 0 ? (
        <div className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
          <span className="h-14 w-px bg-line" />
          {content.socialLinks.map((link) => {
            const href = resolveCtaHref(link.href, content.contact.email);
            const isExternal = href.startsWith("http");
            return (
              <a
                key={`${link.label}-${href}`}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="pointer-events-auto rotate-180 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint transition hover:text-brand [writing-mode:vertical-rl]"
              >
                {link.label}
              </a>
            );
          })}
          <span className="h-14 w-px bg-line" />
        </div>
      ) : null}

      <main className="flex-1">
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_28%,transparent_72%)]" />
            <div className="animate-aurora-a absolute -left-24 top-4 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <div className="animate-aurora-b absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-bright/20 blur-3xl" />
            <div className="animate-aurora-a absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-brand-deep/10 blur-3xl" />
          </div>

          <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
            <Reveal
              as="span"
              direction="scale"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {content.hero.badge}
            </Reveal>

            <Reveal
              as="h1"
              delay={90}
              className="mt-7 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            >
              <span className="text-gradient">{content.hero.name}</span>
            </Reveal>

            <Reveal
              as="p"
              delay={170}
              className="mx-auto mt-6 max-w-2xl text-balance text-2xl font-medium leading-tight text-ink sm:text-3xl"
            >
              {content.hero.headline}
            </Reveal>

            <Reveal
              as="p"
              delay={240}
              className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-soft"
            >
              {content.hero.description}
            </Reveal>

            <Reveal
              delay={310}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href={primaryHref}
                className="btn-shine group inline-flex h-12 items-center justify-center gap-2 bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(15,107,72,0.7)] transition hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                {content.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              {content.hero.secondaryCta.label && secondaryHref ? (
                <a
                  href={secondaryHref}
                  className="inline-flex h-12 items-center justify-center border border-line bg-card px-6 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                >
                  {content.hero.secondaryCta.label}
                </a>
              ) : null}
            </Reveal>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
          >
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-brand/30 p-1.5">
              <span
                className="h-2 w-1 rounded-full bg-brand"
                style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
              />
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------- Contact */}
        <section className="relative overflow-hidden bg-brand-deep px-5 py-24 text-white sm:px-8 lg:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
            <div className="animate-aurora-a absolute -left-12 -top-12 h-72 w-72 rounded-full bg-brand-bright/40 blur-3xl" />
            <div className="animate-aurora-b absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-brand/50 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <SectionIntro
              eyebrow={content.contact.eyebrow}
              title={content.contact.title}
              description={content.contact.description}
              tone="dark"
              align="center"
            />
            <Reveal delay={210}>
              <a
                href={contactHref}
                className="btn-shine group mt-9 inline-flex h-12 items-center justify-center gap-2 bg-white px-7 text-sm font-semibold text-brand-deep transition hover:-translate-y-0.5 hover:bg-brand-tint"
              >
                {content.contact.emailLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
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
