"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experience } from "@/components/landing-page/const";
import { ExperienceTile } from "@/components/landing-page/sections/ExperienceTile";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const updateScrollDistance = () => {
      const sticky = stickyRef.current;
      const track = trackRef.current;

      if (!sticky || !track) {
        return;
      }

      const stickyStyles = window.getComputedStyle(sticky);
      const rightPadding = Number.parseFloat(stickyStyles.paddingRight) || 0;
      const trackLeft = track.offsetLeft;
      const nextDistance = Math.max(
        0,
        trackLeft + track.scrollWidth - sticky.clientWidth + rightPadding,
      );

      setScrollDistance(nextDistance);
    };

    updateScrollDistance();
    window.addEventListener("resize", updateScrollDistance);

    return () => window.removeEventListener("resize", updateScrollDistance);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-white py-20 lg:min-h-[300svh] lg:py-0"
    >
      <div
        ref={stickyRef}
        className="flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:sticky lg:top-0 lg:h-svh lg:px-14 lg:py-16"
      >
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

        <div className="mx-auto mt-10 grid w-full max-w-7xl gap-4 lg:hidden">
          {experience.map((item, index) => (
            <ExperienceTile
              key={`${item.role}-${item.company}`}
              item={item}
              index={index}
            />
          ))}
        </div>

        <motion.div
          ref={trackRef}
          className="mt-10 hidden w-max gap-5 lg:flex lg:pl-[max(3.5rem,calc((100vw-80rem)/2+3.5rem))]"
          style={{ x }}
        >
          {experience.map((item, index) => (
            <ExperienceTile
              key={`${item.role}-${item.company}`}
              item={item}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
