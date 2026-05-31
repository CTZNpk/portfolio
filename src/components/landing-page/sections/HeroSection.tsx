"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { contentTransition } from "@/components/landing-page/const";

export default function HeroSection({
  onViewProjects,
  onContact,
}: {
  onViewProjects: () => void;
  onContact: () => void;
}) {
  return (
    <section id="top" className="bg-[#f7fbf7] px-6 sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="py-24 lg:py-0">
          <motion.div
            className="flex min-h-svh flex-col justify-center"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={contentTransition}
          >
            <p className="mb-5 inline-flex w-fit border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
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
            className="flex min-h-svh flex-col justify-center border-t border-emerald-900/10"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={contentTransition}
          >
            <p className="text-sm font-semibold uppercase text-emerald-700">
              How I work
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">
              Clear interfaces, durable systems, and enough restraint to keep
              products maintainable.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#41594c]">
              I like work that connects product thinking with implementation:
              turning messy requirements into shippable flows, keeping
              components reusable, and making performance part of the design
              conversation.
            </p>
          </motion.div>

          <motion.div
            className="flex min-h-svh flex-col justify-center border-t border-emerald-900/10"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={contentTransition}
          >
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Current focus
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">
              Frontend systems, full stack product work, and polished user
              journeys.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#41594c]">
              The sections below are structured like a case-study portfolio:
              horizontal experience, straightforward education, project stories,
              and a direct contact close.
            </p>
          </motion.div>
        </div>

        <div className="order-first flex items-center pt-24 lg:sticky lg:top-0 lg:order-none lg:h-svh lg:py-24">
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
      </div>
    </section>
  );
}
