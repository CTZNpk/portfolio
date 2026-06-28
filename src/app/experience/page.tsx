import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import { ExperienceEntry } from "@/components/landing-page/sections/ExperienceEntry";
import { getPublicPortfolioContent } from "@/lib/portfolio/public-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicPortfolioContent();

  return {
    title: `Experience | ${content.hero.name}`,
    description: content.experience.description,
  };
}

export default async function ExperiencePage() {
  const content = await getPublicPortfolioContent();

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbf7] text-[#151815]">
      <PortfolioHeader
        active="experience"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="flex-1 px-5 py-16 sm:px-8 lg:px-12">
        <section className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f6b48]">
              {content.experience.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#111611] sm:text-4xl">
              {content.experience.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-[#536059]">
              {content.experience.description}
            </p>
          </div>

          <ol className="mt-12">
            {content.experience.items.map((item, index) => (
              <ExperienceEntry
                key={`${item.role}-${item.company}`}
                item={item}
                index={index}
              />
            ))}
          </ol>
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
