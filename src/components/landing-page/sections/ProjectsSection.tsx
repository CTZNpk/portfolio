"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { contentTransition, projects } from "@/components/landing-page/const";

export default function ProjectsSection({
  onContact,
}: {
  onContact: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    const cards = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-project]") ?? [],
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = Number(
          visibleEntry.target.getAttribute("data-project"),
        );

        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      { threshold: [0.45, 0.6, 0.75] },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-white px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
          <motion.div
            className="relative my-20 aspect-[4/5] w-full overflow-hidden border border-emerald-900/10 bg-white shadow-[0_24px_80px_rgba(16,96,64,0.14)] lg:my-0"
            style={{ background: activeProject.accent }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={contentTransition}
          >
            <motion.div
              key={activeProject.name}
              className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={contentTransition}
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-sm font-semibold uppercase text-emerald-800">
                  Project image
                </p>
                <p className="font-mono text-sm text-emerald-950/60">
                  0{activeIndex + 1}
                </p>
              </div>
              <div>
                <p className="text-6xl font-semibold leading-none text-emerald-950 sm:text-7xl">
                  {activeProject.imageLabel}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="h-24 border border-emerald-950/10 bg-white/45" />
                  <div className="h-24 border border-emerald-950/10 bg-white/35" />
                  <div className="h-24 border border-emerald-950/10 bg-white/25" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="py-20 lg:py-0">
          <div className="flex min-h-svh flex-col justify-center border-b border-emerald-900/10">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Projects
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">
              Project context scrolls while the visual stays pinned.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b6155]">
              Replace these placeholders with real case studies later. The left
              visual is already wired to change as each project becomes active.
            </p>
          </div>

          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              data-project={index}
              className="flex min-h-svh flex-col justify-center border-b border-emerald-900/10 py-20"
              initial={{ opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.55 }}
              transition={contentTransition}
            >
              <p className="text-sm font-semibold uppercase text-emerald-700">
                {project.type}
              </p>
              <h3 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight text-emerald-950 sm:text-6xl">
                {project.name}
              </h3>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-[#43584d]">
                {project.description}
              </p>
              <button
                onClick={onContact}
                type="button"
                className="mt-10 w-fit text-left text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Request details
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
