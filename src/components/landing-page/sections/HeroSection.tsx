import type { HeroContent } from "@/lib/portfolio/types";

export default function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="bg-[#f7fbf7] px-6 sm:px-10 lg:px-14">
      <div className="mx-auto flex min-h-[78svh] max-w-4xl flex-col justify-center py-20">
        <p className="mb-5 inline-flex w-fit border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
          {content.badge}
        </p>
        <p className="mb-4 text-lg font-semibold text-emerald-700 sm:text-xl">
          {content.name}
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
          {content.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#41594c] sm:text-lg">
          {content.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={content.primaryCta.href}
            className="inline-flex h-12 items-center justify-center bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center border border-emerald-900/15 bg-white px-6 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:text-emerald-700"
          >
            {content.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
