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
    <form
      onSubmit={handleSubmit}
      className="border border-black/10 bg-[#fbfbf7] p-5 shadow-[0_18px_45px_rgba(24,32,26,0.06)] sm:p-6"
    >
      <label
        htmlFor="blog-email"
        className="text-sm font-semibold text-[#1c2a22]"
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
          className="h-11 min-w-0 flex-1 border border-black/10 bg-white px-3 text-sm text-[#151815] outline-none transition placeholder:text-[#7d877f] focus:border-[#0f6b48] focus:ring-2 focus:ring-[#0f6b48]/15"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center bg-[#0f6b48] px-5 text-sm font-semibold text-white transition hover:bg-[#0b5137]"
        >
          {content.notifyButtonLabel}
        </button>
      </div>

      {submittedEmail ? (
        <p className="mt-4 text-sm leading-6 text-[#536059]">
          {content.successMessage.replace("{email}", submittedEmail)}
        </p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-[#536059]">
          {content.contactPrompt}{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-semibold text-[#0f6b48] underline-offset-4 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
