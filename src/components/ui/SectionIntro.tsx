import Reveal from "@/components/ui/Reveal";

/** Shared eyebrow + title + description block with staggered scroll-reveal. */
export default function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal
        as="p"
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          isDark ? "text-brand-bright" : "text-brand"
        }`}
      >
        <span className="h-px w-6 bg-current opacity-60" />
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={80}
        className={`mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Reveal>
      {description ? (
        <Reveal
          as="p"
          delay={140}
          className={`mt-5 text-base leading-8 ${
            isDark ? "text-white/75" : "text-ink-soft"
          }`}
        >
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
