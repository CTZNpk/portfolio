import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { DownloadIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { getPublicPortfolioContent } from "@/lib/portfolio/public-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicPortfolioContent();

  return {
    title: `${content.resume.title} | ${content.hero.name}`,
    description: content.resume.description,
  };
}

export default async function ResumePage() {
  const content = await getPublicPortfolioContent();
  const fileName = content.resume.pdfUrl.split("/").pop() || "resume.pdf";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <PortfolioHeader
        active="resume"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="relative flex-1 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora-a absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />
        </div>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow={content.resume.eyebrow}
              title={content.resume.title}
              description={content.resume.description}
            />

            <Reveal
              delay={120}
              className="flex shrink-0 flex-wrap gap-3"
            >
              <a
                href={content.resume.pdfUrl}
                download
                className="inline-flex h-11 items-center justify-center gap-2 border border-line bg-card px-5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
              >
                <DownloadIcon className="h-4 w-4" />
                Download
              </a>
              <a
                href={content.resume.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-shine inline-flex h-11 items-center justify-center gap-2 bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                {content.resume.openLabel}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <Reveal direction="scale" className="mt-12">
            <div className="overflow-hidden border border-line bg-card shadow-[0_36px_80px_-48px_rgba(16,80,52,0.55)]">
              <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-brand-deep/60" />
                  <span className="h-3 w-3 rounded-full bg-brand/60" />
                  <span className="h-3 w-3 rounded-full bg-brand-bright/60" />
                </span>
                <span className="mx-auto truncate font-mono text-xs text-ink-faint">
                  {fileName}
                </span>
              </div>

              <object
                data={content.resume.pdfUrl}
                type="application/pdf"
                className="h-[72vh] w-full bg-white"
              >
                <div className="flex h-[72vh] flex-col items-center justify-center gap-3 p-8 text-center">
                  <p className="text-sm text-ink-soft">
                    Your browser can&apos;t display the PDF inline.
                  </p>
                  <a
                    href={content.resume.pdfUrl}
                    className="link-sweep font-semibold text-brand"
                  >
                    {content.resume.fallbackLabel}
                  </a>
                </div>
              </object>
            </div>
          </Reveal>
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
