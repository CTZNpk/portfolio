import type { ContactContent } from "@/lib/portfolio/types";

export default function ContactSection({
  content,
}: {
  content: ContactContent;
}) {
  return (
    <section
      id="contact"
      className="bg-emerald-950 px-6 py-16 text-white sm:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {content.title}
          </h2>
        </div>
        <div className="border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-lg leading-8 text-emerald-50/85">
            {content.description}
          </p>
          <a
            href={`mailto:${content.email}`}
            className="mt-8 inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-semibold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            {content.emailLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
