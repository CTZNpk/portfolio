"use client";

import { useCallback, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import { contentTransition, navItems } from "@/components/landing-page/const";
import ContactSection from "@/components/landing-page/sections/ContactSection";
import EducationSection from "@/components/landing-page/sections/EducationSection";
import ExperienceSection from "@/components/landing-page/sections/ExperienceSection";
import HeroSection from "@/components/landing-page/sections/HeroSection";
import ProjectsSection from "@/components/landing-page/sections/ProjectsSection";
import SectionRail from "@/components/landing-page/SectionRail";

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        duration: prefersReducedMotion ? 0 : 1.2,
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 0.9,
      }}
    >
      <LandingPageContent />
    </ReactLenis>
  );
}

function LandingPageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis(({ progress }) => {
    setProgress(progress * 100);
  });

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = navItems.findIndex(
          (item) => item.id === visibleEntry.target.id,
        );

        if (nextIndex >= 0) {
          setActiveIndex(nextIndex);
        }
      },
      { threshold: [0.35, 0.5, 0.65] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const goToSection = useCallback(
    (index: number) => {
      const item = navItems[index];

      if (!item) {
        return;
      }

      const target = `#${item.id}`;

      if (lenis) {
        lenis.scrollTo(target, { duration: 1.15 });
        return;
      }

      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  return (
    <main className="relative min-h-screen bg-[#f7fbf7] text-[#102018]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-1 bg-emerald-500"
        animate={{ width: `${progress}%` }}
        transition={contentTransition}
      />

      <HeroSection
        onViewProjects={() => goToSection(3)}
        onContact={() => goToSection(4)}
      />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection onContact={() => goToSection(4)} />
      <ContactSection />

      <SectionRail activeIndex={activeIndex} goToSection={goToSection} />
    </main>
  );
}
