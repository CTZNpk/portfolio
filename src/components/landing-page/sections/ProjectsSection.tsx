import type { ProjectsContent } from "@/lib/portfolio/types";

export default function ProjectsSection({
  content,
}: {
  content: ProjectsContent;
}) {
  return (
    <section
      id="projects"
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

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((project, index) => (
            <article
              key={project.name}
              className="min-h-[230px] border border-emerald-900/10 bg-[#fbfdfb] p-5 shadow-[0_10px_28px_rgba(16,96,64,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,96,64,0.09)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  {project.type}
                </p>
                <p className="font-mono text-xs text-emerald-950/50">
                  0{index + 1}
                </p>
              </div>
              <h3 className="mt-8 text-2xl font-semibold leading-tight text-emerald-950">
                {project.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#43584d]">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
