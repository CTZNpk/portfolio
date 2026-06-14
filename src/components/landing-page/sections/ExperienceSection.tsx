import { ExperienceEntry } from "@/components/landing-page/sections/ExperienceEntry";
import type { ExperienceContent } from "@/lib/portfolio/types";

export default function ExperienceSection({
  content,
}: {
  content: ExperienceContent;
}) {
  return (
    <section
      id="jobs"
      className="bg-white px-6 py-16 sm:px-10 lg:px-14 lg:py-20"
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

        <ol className="mt-12">
          {content.items.map((item, index) => (
            <ExperienceEntry
              key={`${item.role}-${item.company}`}
              item={item}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
