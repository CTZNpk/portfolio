import type { Metadata } from "next";
import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import BlogNotifyForm from "@/components/landing-page/sections/BlogNotifyForm";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
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
  const posts = content.blog.posts;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <PortfolioHeader
        active="blogs"
        name={content.hero.name}
        navItems={content.navItems}
      />

      <main className="relative flex-1 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora-b absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-bright/12 blur-3xl" />
        </div>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionIntro
            eyebrow={content.blog.eyebrow}
            title={content.blog.title}
            description={content.blog.description}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            {posts.length > 0 ? (
              <div className="grid gap-4">
                {posts.map((post, index) => (
                  <Reveal key={post.title} delay={index * 80}>
                    <article className="card-lift group border border-line bg-card p-6 shadow-sm hover:border-brand/30 hover:shadow-[0_22px_50px_-28px_rgba(16,80,52,0.5)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                        {post.date}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-ink transition group-hover:text-brand">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">
                        {post.summary}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal direction="left">
                <div className="flex h-full flex-col items-start justify-center border border-dashed border-brand/30 bg-card/60 p-8">
                  <span className="relative mb-5 flex h-12 w-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/30" />
                    <span className="animate-pulse-soft relative inline-flex h-3 w-3 rounded-full bg-brand" />
                  </span>
                  <p className="text-xl font-semibold text-ink">
                    The first post is brewing
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-ink-soft">
                    Notes on building for the web, lessons from shipping
                    software, and the occasional deep dive — landing here soon.
                    Drop your email and I&apos;ll let you know the moment it does.
                  </p>
                </div>
              </Reveal>
            )}

            <Reveal direction="right" delay={80}>
              <BlogNotifyForm
                content={content.blog}
                contactEmail={content.contact.email}
              />
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
