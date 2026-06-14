import type { ExperienceItem } from "@/lib/portfolio/types";

export function ExperienceEntry({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <li className="relative border-l border-emerald-900/15 pl-7 pb-12 last:pb-0 last:[&>article]:border-b-0 sm:pl-10">
      <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-700 shadow-[0_0_0_4px_rgba(4,120,87,0.12)]" />

      <article className="grid gap-6 border-b border-emerald-900/10 pb-10 lg:grid-cols-[0.32fr_1fr]">
        <aside className="space-y-3">
          <p className="font-mono text-xs font-semibold text-emerald-700">
            0{index + 1}
          </p>
          <p className="text-sm font-semibold text-emerald-950">
            {item.period}
          </p>
          <div className="space-y-1 text-sm leading-6 text-[#5a7064]">
            <p>{item.company}</p>
            <p>{item.location}</p>
            <p>{item.type}</p>
          </div>
        </aside>

        <div>
          <h3 className="text-2xl font-semibold leading-tight text-emerald-950 sm:text-3xl">
            {item.role}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#43584d]">
            {item.overview}
          </p>

          <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#43584d]">
            {item.responsibilities.map((responsibility) => (
              <li key={responsibility} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.stack.map((technology) => (
              <span
                key={technology}
                className="border border-emerald-900/10 bg-[#f7fbf7] px-3 py-1.5 text-xs font-semibold text-emerald-800"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}
