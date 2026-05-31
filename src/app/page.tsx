"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, -70]);

  return (
    <main className="min-h-screen bg-[#f7fbf7] text-[#102018]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-emerald-600"
        style={{ scaleX: progressScale }}
      />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-emerald-900/10 bg-[#f7fbf7]/86 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <a href="#top" className="text-lg font-semibold text-emerald-950">
            CTZNpk
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-[#395246] sm:flex">
            {navItems.map((item) => (
              <a
                className="transition hover:text-emerald-700"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="snap-y snap-mandatory overflow-x-hidden">
        <section
          id="top"
          className="flex min-h-screen snap-start items-center px-6 py-24 sm:px-10 lg:px-14"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={sectionTransition}
            >
              <motion.p
                className="mb-5 inline-flex border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...sectionTransition, delay: 0.12 }}
              >
                Software Developer
              </motion.p>
              <h1 className="text-5xl font-semibold leading-[1.04] text-emerald-950 sm:text-6xl lg:text-7xl">
                Building clean, useful software for the web.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#41594c] sm:text-xl">
                I am a software developer focused on creating thoughtful digital
                products with strong engineering foundations, polished
                interfaces, and practical user experiences.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center border border-emerald-900/15 bg-white px-6 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:text-emerald-700"
                >
                  Email Me
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden border border-emerald-900/10 bg-white shadow-[0_24px_80px_rgba(16,96,64,0.16)]"
              initial={{ opacity: 0, scale: 0.94, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.18 }}
              style={{ y: heroImageY }}
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

        <AnimatedSection id="experience" tone="white">
          <SectionHeader
            label="Experience"
            title="Engineering work with product sense."
            description="Placeholder roles for now, ready to replace with your real work history."
          />
          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.32 }}
          >
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
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="education" tone="green">
          <SectionHeader
            label="Education"
            title="A foundation for solving real problems."
            description="Use this section for degrees, certifications, and focused learning."
          />
          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.32 }}
          >
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
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="projects" tone="white">
          <SectionHeader
            label="Projects"
            title="Selected work and product ideas."
            description="Placeholder projects that can be swapped with live links, case studies, and GitHub repositories."
          />
          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
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
                <a
                  href="#contact"
                  className="mt-8 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Request details
                </a>
              </MotionCard>
            ))}
          </motion.div>
        </AnimatedSection>

        <section
          id="contact"
          className="flex min-h-screen snap-start items-center bg-emerald-950 px-6 py-24 text-white sm:px-10 lg:px-14"
        >
          <motion.div
            className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={sectionTransition}
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
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ ...sectionTransition, delay: 0.12 }}
            >
              <p className="text-lg leading-8 text-emerald-50/85">
                Have a project, collaboration, or role in mind? Send me an email
                and I&apos;ll get back to you.
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
      </div>
    </main>
  );
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 42, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: sectionTransition,
  },
};

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
      className={`flex min-h-screen snap-start items-center px-6 py-24 sm:px-10 lg:px-14 ${
        tone === "white" ? "bg-white" : "bg-[#f7fbf7]"
      }`}
    >
      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={sectionTransition}
      >
        {children}
      </motion.div>
    </section>
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
      variants={cardVariants}
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
