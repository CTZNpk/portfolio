import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
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

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbf7] text-[#151815]">
      <PortfolioHeader
        active="resume"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="flex-1 px-5 py-16 sm:px-8 lg:px-12">
        <section className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f6b48]">
                {content.resume.eyebrow}
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#111611] sm:text-4xl">
                {content.resume.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-[#536059]">
                {content.resume.description}
              </p>
            </div>

            <a
              href={content.resume.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center bg-[#0f6b48] px-5 text-sm font-semibold text-white transition hover:bg-[#0b5137]"
            >
              {content.resume.openLabel}
            </a>
          </div>

          <object
            data={content.resume.pdfUrl}
            type="application/pdf"
            className="mt-10 h-[70vh] w-full border border-black/10 bg-white"
          >
            <a
              href={content.resume.pdfUrl}
              className="font-semibold text-[#0f6b48] underline-offset-4 hover:underline"
            >
              {content.resume.fallbackLabel}
            </a>
          </object>
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
