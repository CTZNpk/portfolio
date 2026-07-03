import PortfolioFooter from "@/components/landing-page/PortfolioFooter";
import PortfolioHeader from "@/components/landing-page/PortfolioHeader";
import BlogNotifyForm from "@/components/landing-page/sections/BlogNotifyForm";
import DevTerminal from "@/components/terminal/DevTerminal";
import ParticleUniverse from "@/components/three/ParticleUniverse";
import Reveal from "@/components/ui/Reveal";
import SceneNav from "@/components/ui/SceneNav";
import SectionIntro from "@/components/ui/SectionIntro";
import Typewriter from "@/components/ui/Typewriter";
import { ArrowRight } from "@/components/ui/icons";
import type { PortfolioContent } from "@/lib/portfolio/types";

function resolveCtaHref(href: string, email: string) {
  if (href === "#contact" || href === "mailto:contact") {
    return `mailto:${email}`;
  }
  return href;
}

/**
 * The landing page is a single scroll journey rendered over one persistent
 * WebGL particle canvas. Each section carries a `data-scene` marker — the
 * canvas morphs its particle formation to match the section in view:
 * galaxy → helix → lattice → rings → wave → beacon.
 */
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

  const sceneSections = [
    { id: "home", label: "Signal" },
    { id: "experience", label: "Timeline" },
    { id: "skills", label: "Stack" },
    { id: "projects", label: "Orbit" },
    { id: "blog", label: "Log" },
    { id: "contact", label: "Beacon" },
  ];

  return (
    <div className="flex min-h-screen flex-col text-ink">
      <ParticleUniverse />
      <PortfolioHeader
        active="home"
        name={content.hero.name}
        navItems={content.navItems}
      />
      <SceneNav sections={sceneSections} />

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
        {/* ------------------------------------------- 00 · Hero (galaxy) */}
        <section
          id="home"
          data-scene="galaxy"
          className="relative flex min-h-svh flex-col items-center justify-center px-5 py-24 sm:px-8"
        >
          <div className="text-scrim mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal
              as="span"
              direction="scale"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand"
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
              className="mt-7 min-h-[2.5rem] font-mono text-lg text-brand-bright sm:text-2xl"
            >
              <Typewriter
                phrases={[
                  content.hero.headline,
                  "while (alive) { build(); learn(); ship(); }",
                  "git commit -m 'make it better than yesterday'",
                ]}
              />
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
                className="btn-shine group inline-flex h-12 items-center justify-center gap-2 bg-brand px-6 text-sm font-semibold text-brand-ink shadow-[0_0_35px_-10px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-bright"
              >
                {content.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              {content.hero.secondaryCta.label && secondaryHref ? (
                <a
                  href={secondaryHref}
                  className="glass inline-flex h-12 items-center justify-center px-6 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                >
                  {content.hero.secondaryCta.label}
                </a>
              ) : null}
            </Reveal>

            <Reveal
              as="p"
              delay={420}
              className="mt-12 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint sm:block"
            >
              press <span className="text-brand">`</span> for terminal · drag
              the void · secrets included
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

        {/* ------------------------------------- 01 · Experience (helix) */}
        <section
          id="experience"
          data-scene="helix"
          className="relative mx-auto min-h-svh max-w-6xl px-5 py-28 sm:px-8 lg:px-12"
        >
          <SectionIntro
            eyebrow={`01 · ${content.experience.eyebrow}`}
            title={content.experience.title}
            description={content.experience.description}
            className="text-scrim"
          />

          <div className="relative mt-16 space-y-10 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-gradient-to-b before:from-brand/60 before:via-line before:to-transparent sm:space-y-12">
            {content.experience.items.map((item, index) => (
              <Reveal
                key={`${item.company}-${item.period}`}
                delay={index * 90}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center">
                  <span className="h-[9px] w-[9px] rounded-full bg-brand shadow-[0_0_14px_var(--color-brand)]" />
                </span>

                <article className="glass hud-corners card-lift p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                      {item.role}
                      <span className="text-brand"> @ {item.company}</span>
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                      {item.period} · {item.type}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-xs text-ink-faint">
                    {item.location}
                  </p>
                  <p className="mt-4 leading-8 text-ink-soft">{item.overview}</p>
                  <ul className="mt-4 space-y-2">
                    {item.responsibilities.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm leading-7 text-ink-soft"
                      >
                        <span aria-hidden className="mt-2 text-brand">
                          ▸
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-brand/20 bg-brand-tint px-2.5 py-1 font-mono text-xs text-brand"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------- 02 · Skills (lattice) */}
        <section
          id="skills"
          data-scene="lattice"
          className="relative mx-auto min-h-svh max-w-6xl px-5 py-28 sm:px-8 lg:px-12"
        >
          <SectionIntro
            eyebrow={`02 · ${content.skills.eyebrow}`}
            title={content.skills.title}
            description={content.skills.description}
            align="center"
            className="text-scrim"
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.skills.groups.map((group, index) => (
              <Reveal key={group.category} delay={index * 110}>
                <article className="glass hud-corners card-lift h-full p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                    <span className="text-ink-faint">module/</span>
                    {group.category.toLowerCase()}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="border border-line bg-paper-2/70 px-3 py-1.5 text-sm text-ink transition hover:border-brand/40 hover:text-brand"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------- 03 · Projects (rings) */}
        <section
          id="projects"
          data-scene="rings"
          className="relative mx-auto min-h-svh max-w-6xl px-5 py-28 sm:px-8 lg:px-12"
        >
          <SectionIntro
            eyebrow={`03 · ${content.projects.eyebrow}`}
            title={content.projects.title}
            description={content.projects.description}
            className="text-scrim"
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.projects.items.map((project, index) => (
              <Reveal key={project.name} delay={index * 110}>
                <article className="glass card-lift group relative h-full overflow-hidden p-6 sm:p-7">
                  <p
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-5 font-mono text-7xl font-bold text-brand/10 transition group-hover:text-brand/20"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {project.type}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {project.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --------------------------------------------- 04 · Blog (wave) */}
        <section
          id="blog"
          data-scene="wave"
          className="relative mx-auto min-h-svh max-w-6xl content-center px-5 py-28 sm:px-8 lg:px-12"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionIntro
              eyebrow={`04 · ${content.blog.eyebrow}`}
              title={content.blog.title}
              description={content.blog.description}
              className="text-scrim"
            />
            <Reveal delay={140}>
              <BlogNotifyForm
                content={content.blog}
                contactEmail={content.contact.email}
              />
            </Reveal>
          </div>

          {content.blog.posts.length > 0 ? (
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {content.blog.posts.map((post) => (
                <Reveal key={post.title}>
                  <article className="glass card-lift p-6">
                    <p className="font-mono text-xs text-ink-faint">{post.date}</p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      {post.summary}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}
        </section>

        {/* ---------------------------------------- 05 · Contact (beacon) */}
        <section
          id="contact"
          data-scene="beacon"
          className="relative flex min-h-svh items-center justify-center px-5 py-28 sm:px-8"
        >
          <div className="text-scrim mx-auto max-w-2xl text-center">
            <SectionIntro
              eyebrow={`05 · ${content.contact.eyebrow}`}
              title={content.contact.title}
              description={content.contact.description}
              align="center"
            />
            <Reveal delay={210}>
              <a
                href={contactHref}
                className="btn-shine group mt-10 inline-flex h-13 items-center justify-center gap-2 bg-brand px-8 text-sm font-semibold text-brand-ink shadow-[0_0_45px_-8px_var(--color-brand)] transition hover:-translate-y-0.5 hover:bg-brand-bright"
              >
                {content.contact.emailLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
            <Reveal
              as="p"
              delay={300}
              className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-ink-faint"
            >
              or run <span className="text-brand">sudo hire-me</span> in the
              terminal
            </Reveal>
          </div>
        </section>
      </main>

      <PortfolioFooter
        name={content.hero.name}
        contactEmail={content.contact.email}
        socialLinks={content.socialLinks}
      />

      <DevTerminal content={content} />
    </div>
  );
}
