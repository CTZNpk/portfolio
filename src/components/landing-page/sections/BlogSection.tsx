import type { BlogContent } from "@/lib/portfolio/types";

export default function BlogSection({ content }: { content: BlogContent }) {
  return (
    <section
      id="blog"
      className="bg-[#f7fbf7] px-6 py-16 sm:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.72fr_1fr]">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4b6155]">
            {content.description}
          </p>
        </div>

        <div className="grid gap-4">
          {content.posts.map((post) => (
            <article
              key={post.title}
              className="border border-emerald-900/10 bg-white p-5 shadow-[0_10px_28px_rgba(16,96,64,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,96,64,0.08)] sm:p-6"
            >
              <p className="text-xs font-semibold uppercase text-emerald-700">
                {post.date}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-emerald-950">
                {post.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#43584d]">
                {post.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
