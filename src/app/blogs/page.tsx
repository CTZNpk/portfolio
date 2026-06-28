import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import BlogNotifyForm from "@/components/landing-page/sections/BlogNotifyForm";
import { getPublicPortfolioContent } from "@/lib/portfolio/public-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicPortfolioContent();

  return {
    title: `${content.blog.title} | ${content.hero.name}`,
    description: content.blog.description,
  };
}

export default async function BlogsPage() {
  const content = await getPublicPortfolioContent();

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#151815]">
      <PortfolioHeader
        active="blogs"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="flex-1 px-5 py-16 sm:px-8 lg:px-12">
        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f6b48]">
              {content.blog.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#111611] sm:text-4xl">
              {content.blog.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-[#536059]">
              {content.blog.description}
            </p>
          </div>

          <BlogNotifyForm
            content={content.blog}
            contactEmail={content.contact.email}
          />
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
