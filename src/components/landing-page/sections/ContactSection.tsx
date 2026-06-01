import { motion } from "motion/react";
import { contentTransition } from "@/components/landing-page/const";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-svh items-center bg-emerald-950 px-6 py-24 text-white sm:px-10 lg:px-14"
    >
      <motion.div
        className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
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
