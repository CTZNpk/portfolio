"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { contentTransition } from "@/components/landing-page/const";

export function AnimatedSection({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "green" | "white";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-svh items-center px-6 py-24 sm:px-10 lg:px-14 ${
        tone === "white" ? "bg-white" : "bg-[#f7fbf7]"
      }`}
    >
      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={contentTransition}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function PortfolioCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`border border-emerald-900/10 bg-[#fbfdfb] p-6 transition ${className}`}
    >
      {children}
    </article>
  );
}

export function SectionHeader({
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
