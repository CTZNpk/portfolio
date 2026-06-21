import type { SkillsContent } from "@/lib/portfolio/types";

export default function SkillsSection({ content }: { content: SkillsContent }) {
  return (
    <section
      id="skills"
      className="bg-[#f7fbf7] px-6 py-16 sm:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4b6155]">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {content.groups.map((group) => (
            <article
              key={group.category}
              className="border border-emerald-900/10 bg-white p-5 shadow-[0_10px_28px_rgba(16,96,64,0.05)] sm:p-6"
            >
              <h3 className="text-xl font-semibold text-emerald-950">
                {group.category}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-emerald-900/10 bg-[#f7fbf7] px-3 py-2 text-sm font-medium text-[#43584d]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
