"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "down";
type TransitionPhase = "idle" | "covering" | "revealing";

const navItems = [
  { label: "Home", id: "top" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const experience = [
  {
    role: "Software Developer",
    company: "Your Company",
    period: "2024 - Present",
    summary:
      "Building reliable web applications with modern frontend and backend tools, focusing on clean interfaces, performance, and maintainable code.",
  },
  {
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2022 - 2024",
    summary:
      "Created responsive user experiences, reusable React components, and production-ready pages for business-critical products.",
  },
];

const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    school: "Your University",
    period: "2018 - 2022",
  },
  {
    degree: "Professional Development",
    school: "Modern Web Engineering",
    period: "Ongoing",
  },
];

const projects = [
  {
    name: "Portfolio Website",
    type: "Personal Brand",
    description:
      "A polished portfolio site designed to present experience, education, projects, and contact details in one professional place.",
  },
  {
    name: "SaaS Dashboard",
    type: "Web Application",
    description:
      "A responsive dashboard concept with analytics, data tables, and workflow-focused UI patterns.",
  },
  {
    name: "API Platform",
    type: "Backend System",
    description:
      "A structured API project with authentication, database models, and clean service boundaries.",
  },
];

const sectionTransition = {
  duration: 0.72,
  ease: [0.76, 0, 0.24, 1],
} as const;

const contentTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("down");
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const isTransitioning = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const goToSection = useCallback(
    (nextIndex: number) => {
      if (
        nextIndex === activeIndex ||
        nextIndex < 0 ||
        nextIndex >= navItems.length ||
        isTransitioning.current
      ) {
        return;
      }

      const nextDirection: Direction = nextIndex > activeIndex ? "down" : "up";
      setDirection(nextDirection);

      if (prefersReducedMotion) {
        setActiveIndex(nextIndex);
        return;
      }

      isTransitioning.current = true;
      setPhase("covering");

      window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setPhase("revealing");
      }, 520);

      window.setTimeout(() => {
        setPhase("idle");
        isTransitioning.current = false;
      }, 1120);
    },
    [activeIndex, prefersReducedMotion],
  );

  const moveBy = useCallback(
    (offset: number) => {
      goToSection(activeIndex + offset);
    },
    [activeIndex, goToSection],
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) {
        return;
      }

      event.preventDefault();
      moveBy(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        moveBy(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveBy(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSection(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSection(navItems.length - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToSection, moveBy]);

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartY === null) {
      return;
    }

    const distance = touchStartY - event.changedTouches[0].clientY;

    if (Math.abs(distance) > 40) {
      moveBy(distance > 0 ? 1 : -1);
    }

    setTouchStartY(null);
  };

  const progress = ((activeIndex + 1) / navItems.length) * 100;

  return (
    <main
      className="relative h-svh overflow-hidden bg-[#f7fbf7] text-[#102018]"
      onTouchStart={(event) => setTouchStartY(event.touches[0].clientY)}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-1 bg-emerald-500"
        animate={{ width: `${progress}%` }}
        transition={contentTransition}
      />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-emerald-900/10 bg-[#f7fbf7]/86 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <button
            type="button"
            onClick={() => goToSection(0)}
            className="text-lg font-semibold text-emerald-950"
          >
            CTZNpk
          </button>
          <div className="hidden items-center gap-7 text-sm font-medium text-[#395246] sm:flex">
            {navItems.slice(1).map((item, index) => {
              const sectionIndex = index + 1;

              return (
                <button
                  className={`transition hover:text-emerald-700 ${
                    activeIndex === sectionIndex
                      ? "text-emerald-700"
                      : "text-[#395246]"
                  }`}
                  onClick={() => goToSection(sectionIndex)}
                  type="button"
                  key={item.id}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <SectionViewport activeIndex={activeIndex} direction={direction}>
        {activeIndex === 0 && (
          <HeroSection
            onViewProjects={() => goToSection(3)}
            onContact={() => goToSection(4)}
          />
        )}
        {activeIndex === 1 && <ExperienceSection />}
        {activeIndex === 2 && <EducationSection />}
        {activeIndex === 3 && <ProjectsSection onContact={() => goToSection(4)} />}
        {activeIndex === 4 && <ContactSection />}
      </SectionViewport>

      <SectionRail activeIndex={activeIndex} goToSection={goToSection} />
      <StripTransition direction={direction} phase={phase} />
    </main>
  );
}

function SectionViewport({
  activeIndex,
  direction,
  children,
}: {
  activeIndex: number;
  direction: Direction;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={activeIndex}
      className="h-full"
      initial={{
        opacity: 0,
        y: direction === "down" ? 28 : -28,
        scale: 0.985,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={contentTransition}
    >
      {children}
    </motion.div>
  );
}

function HeroSection({
  onViewProjects,
  onContact,
}: {
  onViewProjects: () => void;
  onContact: () => void;
}) {
  return (
    <section
      id="top"
      className="flex h-svh items-center px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={contentTransition}
        >
          <p className="mb-5 inline-flex border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            Software Developer
          </p>
          <h1 className="text-5xl font-semibold leading-[1.04] text-emerald-950 sm:text-6xl lg:text-7xl">
            Building clean, useful software for the web.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#41594c] sm:text-xl">
            I am a software developer focused on creating thoughtful digital
            products with strong engineering foundations, polished interfaces,
            and practical user experiences.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onViewProjects}
              type="button"
              className="inline-flex h-12 items-center justify-center bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              View Projects
            </button>
            <button
              onClick={onContact}
              type="button"
              className="inline-flex h-12 items-center justify-center border border-emerald-900/15 bg-white px-6 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:text-emerald-700"
            >
              Email Me
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden border border-emerald-900/10 bg-white shadow-[0_24px_80px_rgba(16,96,64,0.16)]"
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...contentTransition, delay: 0.12 }}
        >
          <Image
            src="/profile-placeholder.svg"
            alt="Profile placeholder for portfolio owner"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 430px, 90vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <AnimatedSection id="experience" tone="white">
      <SectionHeader
        label="Experience"
        title="Engineering work with product sense."
        description="Placeholder roles for now, ready to replace with your real work history."
      />
      <CardGrid className="lg:grid-cols-2">
        {experience.map((item) => (
          <MotionCard key={`${item.role}-${item.company}`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-emerald-950">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-emerald-700">
                  {item.company}
                </p>
              </div>
              <p className="text-sm font-semibold text-[#5a7064]">
                {item.period}
              </p>
            </div>
            <p className="mt-5 leading-7 text-[#43584d]">{item.summary}</p>
          </MotionCard>
        ))}
      </CardGrid>
    </AnimatedSection>
  );
}

function EducationSection() {
  return (
    <AnimatedSection id="education" tone="green">
      <SectionHeader
        label="Education"
        title="A foundation for solving real problems."
        description="Use this section for degrees, certifications, and focused learning."
      />
      <CardGrid className="md:grid-cols-2">
        {education.map((item) => (
          <MotionCard key={`${item.degree}-${item.school}`}>
            <p className="text-sm font-semibold text-emerald-700">
              {item.period}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-emerald-950">
              {item.degree}
            </h3>
            <p className="mt-2 text-[#4b6155]">{item.school}</p>
          </MotionCard>
        ))}
      </CardGrid>
    </AnimatedSection>
  );
}

function ProjectsSection({ onContact }: { onContact: () => void }) {
  return (
    <AnimatedSection id="projects" tone="white">
      <SectionHeader
        label="Projects"
        title="Selected work and product ideas."
        description="Placeholder projects that can be swapped with live links, case studies, and GitHub repositories."
      />
      <CardGrid className="lg:grid-cols-3">
        {projects.map((project) => (
          <MotionCard
            className="flex min-h-64 flex-col justify-between hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-[0_18px_48px_rgba(16,96,64,0.12)]"
            key={project.name}
          >
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                {project.type}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-emerald-950">
                {project.name}
              </h3>
              <p className="mt-5 leading-7 text-[#43584d]">
                {project.description}
              </p>
            </div>
            <button
              onClick={onContact}
              type="button"
              className="mt-8 text-left text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Request details
            </button>
          </MotionCard>
        ))}
      </CardGrid>
    </AnimatedSection>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="flex h-svh items-center bg-emerald-950 px-6 py-24 text-white sm:px-10 lg:px-14"
    >
      <motion.div
        className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={contentTransition}
      >
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">
            Email Me
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Let&apos;s build something useful.
          </h2>
        </div>
        <motion.div
          className="border border-white/10 bg-white/5 p-6 sm:p-8"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...contentTransition, delay: 0.12 }}
        >
          <p className="text-lg leading-8 text-emerald-50/85">
            Have a project, collaboration, or role in mind? Send me an email and
            I&apos;ll get back to you.
          </p>
          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-semibold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            hello@example.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AnimatedSection({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "green" | "white";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`flex h-svh items-center overflow-y-auto px-6 py-24 sm:px-10 lg:px-14 ${
        tone === "white" ? "bg-white" : "bg-[#f7fbf7]"
      }`}
    >
      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={contentTransition}
      >
        {children}
      </motion.div>
    </section>
  );
}

function CardGrid({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`mt-10 grid gap-5 ${className}`}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function MotionCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      className={`border border-emerald-900/10 bg-[#fbfdfb] p-6 transition ${className}`}
      variants={{
        hidden: { opacity: 0, y: 42, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: contentTransition,
        },
      }}
    >
      {children}
    </motion.article>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-emerald-700">
        {label}
      </p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[#4b6155]">{description}</p>
    </div>
  );
}

function StripTransition({
  direction,
  phase,
}: {
  direction: Direction;
  phase: TransitionPhase;
}) {
  const hiddenPosition = direction === "down" ? "100%" : "-100%";
  const exitPosition = direction === "down" ? "-100%" : "100%";
  const targetY =
    phase === "covering" ? "0%" : phase === "revealing" ? exitPosition : hiddenPosition;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] grid grid-cols-4"
    >
      {[0, 1, 2, 3].map((strip) => (
        <motion.div
          key={strip}
          className={`h-full ${
            strip % 2 === 0 ? "bg-emerald-950" : "bg-emerald-800"
          }`}
          initial={false}
          animate={{ y: targetY }}
          transition={{
            ...sectionTransition,
            delay:
              phase === "covering"
                ? strip * 0.045
                : (3 - strip) * 0.045,
          }}
        />
      ))}
    </div>
  );
}

function SectionRail({
  activeIndex,
  goToSection,
}: {
  activeIndex: number;
  goToSection: (index: number) => void;
}) {
  return (
    <div className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {navItems.map((item, index) => (
        <button
          key={item.id}
          type="button"
          aria-label={`Go to ${item.label}`}
          onClick={() => goToSection(index)}
          className={`h-2.5 w-2.5 border transition ${
            activeIndex === index
              ? "scale-125 border-emerald-700 bg-emerald-700"
              : "border-emerald-700/40 bg-white/70 hover:border-emerald-700"
          }`}
        />
      ))}
    </div>
  );
}
