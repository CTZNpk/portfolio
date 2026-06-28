import Reveal from "@/components/ui/Reveal";
import type { ExperienceItem } from "@/lib/portfolio/types";

export function ExperienceEntry({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <li className="relative pb-10 pl-9 last:pb-0 sm:pl-14">
      {/* Timeline rail + node */}
      <span
        aria-hidden
        className="absolute left-1 top-2 h-full w-px bg-gradient-to-b from-brand/45 via-line to-transparent sm:left-2"
      />
      <span
        aria-hidden
        className="absolute left-1 top-2 grid -translate-x-1/2 place-items-center sm:left-2"
      >
        <span className="h-3.5 w-3.5 rounded-full border-2 border-paper bg-brand shadow-[0_0_0_4px_rgba(15,107,72,0.14)]" />
      </span>

      <Reveal delay={index * 70}>
        <article className="card-lift group grid gap-6 border border-line bg-card p-6 shadow-sm hover:border-brand/30 hover:shadow-[0_24px_55px_-30px_rgba(16,80,52,0.55)] sm:p-8 lg:grid-cols-[0.34fr_1fr]">
          <aside className="space-y-3">
            <p className="font-serif text-3xl leading-none text-ink/15 transition-colors duration-300 group-hover:text-brand/40">
              0{index + 1}
            </p>
            <p className="inline-flex w-fit items-center bg-brand-tint px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              {item.period}
            </p>
            <div className="space-y-1 text-sm leading-6 text-ink-soft">
              <p className="font-semibold text-ink">{item.company}</p>
              <p>{item.location}</p>
              <p>{item.type}</p>
            </div>
          </aside>

          <div>
            <h3 className="text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {item.role}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
              {item.overview}
            </p>

            <ul className="mt-6 grid gap-3 text-sm leading-7 text-ink-soft">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((technology) => (
                <span
                  key={technology}
                  className="border border-line bg-paper-2 px-3 py-1.5 text-xs font-semibold text-brand transition hover:border-brand/30 hover:bg-brand-tint"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}
