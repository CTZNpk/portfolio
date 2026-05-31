"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experience } from "@/components/landing-page/const";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-[300svh] bg-white"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              Experience moves sideways while the page keeps scrolling.
            </h2>
          </div>
        </div>

        <motion.div
          className="mt-10 flex w-max gap-4 pl-6 sm:pl-10 lg:gap-5 lg:pl-[max(3.5rem,calc((100vw-80rem)/2+3.5rem))]"
          style={{ x }}
        >
          {experience.map((item, index) => (
            <article
              key={`${item.role}-${item.company}`}
              className="flex h-[390px] w-[78vw] max-w-[520px] shrink-0 flex-col justify-between border border-emerald-900/10 bg-[#fbfdfb] p-6 shadow-[0_14px_42px_rgba(16,96,64,0.08)] sm:w-[500px] lg:h-[420px] lg:w-[470px] lg:p-7"
            >
              <div>
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-xs text-emerald-700">
                    0{index + 1}
                  </p>
                  <p className="text-right text-xs font-semibold text-[#5a7064]">
                    {item.period}
                  </p>
                </div>
                <p className="mt-12 text-xs font-semibold uppercase text-emerald-700">
                  {item.focus}
                </p>
                <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
                  {item.role}
                </h3>
                <p className="mt-3 text-base font-medium text-emerald-700">
                  {item.company}
                </p>
              </div>
              <p className="text-base leading-7 text-[#43584d]">
                {item.summary}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
