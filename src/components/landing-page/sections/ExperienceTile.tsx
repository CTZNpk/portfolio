import type { experience } from "@/components/landing-page/const";

type ExperienceItem = (typeof experience)[number];

export function ExperienceTile({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <article className="flex min-h-[330px] w-full min-w-0 flex-col justify-between gap-8 border border-emerald-900/10 bg-[#fbfdfb] p-5 shadow-[0_14px_42px_rgba(16,96,64,0.08)] sm:p-6 lg:h-[420px] lg:w-[470px] lg:shrink-0 lg:p-7">
      <div>
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-xs text-emerald-700">
            0{index + 1}
          </p>
          <p className="text-right text-xs font-semibold text-[#5a7064]">
            {item.period}
          </p>
        </div>
        <p className="mt-8 text-xs font-semibold uppercase text-emerald-700 lg:mt-12">
          {item.focus}
        </p>
        <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight text-emerald-950 sm:text-3xl lg:text-4xl">
          {item.role}
        </h3>
        <p className="mt-3 text-base font-medium text-emerald-700">
          {item.company}
        </p>
      </div>
      <p className="text-sm leading-7 text-[#43584d] sm:text-base">
        {item.summary}
      </p>
    </article>
  );
}
