import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import { ExperienceEntry } from "@/components/landing-page/sections/ExperienceEntry";
import SectionIntro from "@/components/ui/SectionIntro";
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
  const count = content.experience.items.length;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <PortfolioHeader
        active="experience"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="relative flex-1 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora-a absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />
        </div>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionIntro
              eyebrow={content.experience.eyebrow}
              title={content.experience.title}
              description={content.experience.description}
            />
            {count > 0 ? (
              <p className="font-serif text-6xl leading-none text-brand/15">
                {String(count).padStart(2, "0")}
              </p>
            ) : null}
          </div>

          <ol className="mt-14">
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
