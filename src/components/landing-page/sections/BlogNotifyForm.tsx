"use client";

import { FormEvent, useState } from "react";
import type { BlogContent } from "@/lib/portfolio/types";

export default function BlogNotifyForm({
  content,
  contactEmail,
}: {
  content: BlogContent;
  contactEmail: string;
}) {
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();

    if (email) {
      setSubmittedEmail(email);
      event.currentTarget.reset();
    }
  }

  return (
    <div className="relative overflow-hidden border border-line bg-card p-6 shadow-[0_22px_55px_-30px_rgba(16,80,52,0.5)] sm:p-7">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-bright" />

      {submittedEmail ? (
        <div className="flex flex-col items-start gap-4 py-2">
          <span className="animate-pop-in grid h-12 w-12 place-items-center rounded-full bg-brand-tint text-brand">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                d="M4 12.5l5 5 11-11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: 30,
                  animation: "draw-check 0.5s ease forwards 0.18s",
                }}
              />
            </svg>
          </span>
          <div>
            <p className="text-lg font-semibold text-ink">You&apos;re on the list</p>
            <p className="mt-1 text-sm leading-7 text-ink-soft">
              {content.successMessage.replace("{email}", submittedEmail)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmittedEmail("")}
            className="link-sweep text-sm font-medium text-brand"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="blog-email"
            className="text-sm font-semibold text-ink"
          >
            {content.emailLabel}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="blog-email"
              name="email"
              type="email"
              required
              placeholder={content.emailPlaceholder}
              className="h-11 min-w-0 flex-1 border border-line bg-paper px-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
            />
            <button
              type="submit"
              className="btn-shine inline-flex h-11 shrink-0 items-center justify-center bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              {content.notifyButtonLabel}
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-ink-soft">
            {content.contactPrompt}{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="link-sweep font-semibold text-brand"
            >
              {contactEmail}
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
