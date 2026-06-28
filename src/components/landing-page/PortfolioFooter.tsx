import type { SocialLink } from "@/lib/portfolio/types";

type SocialKind = "github" | "linkedin" | "mail" | "default";

function resolveSocialHref(href: string, email: string) {
  if (href === "mailto:contact" || href === "#contact") {
    return `mailto:${email}`;
  }

  return href;
}

function getSocialKind(link: SocialLink): SocialKind {
  const value = `${link.label} ${link.href}`.toLowerCase();

  if (value.includes("github")) {
    return "github";
  }

  if (value.includes("linkedin")) {
    return "linkedin";
  }

  if (value.includes("mail") || value.includes("email") || value.includes("@")) {
    return "mail";
  }

  return "default";
}

function SocialIcon({ kind }: { kind: SocialKind }) {
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M5.34 7.43a2.18 2.18 0 1 1 0-4.36 2.18 2.18 0 0 1 0 4.36ZM3.5 20.5h3.68V8.86H3.5V20.5Zm5.95-11.64h3.52v1.59h.05c.49-.93 1.69-1.91 3.48-1.91 3.72 0 4.4 2.45 4.4 5.63v6.33h-3.67v-5.61c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71H9.45V8.86Z"
        />
      </svg>
    );
  }

  if (kind === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M4.75 5.5h14.5c1.24 0 2.25 1.01 2.25 2.25v8.5c0 1.24-1.01 2.25-2.25 2.25H4.75a2.25 2.25 0 0 1-2.25-2.25v-8.5c0-1.24 1.01-2.25 2.25-2.25Zm0 1.75a.5.5 0 0 0-.5.5v.38L12 12.9l7.75-4.77v-.38a.5.5 0 0 0-.5-.5H4.75Zm15 2.93-7.29 4.49a.88.88 0 0 1-.92 0l-7.29-4.49v6.07c0 .28.22.5.5.5h14.5a.5.5 0 0 0 .5-.5v-6.07Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M13.2 4.8a4.25 4.25 0 0 1 6 6l-2.1 2.1a.88.88 0 0 1-1.24-1.24l2.1-2.1a2.5 2.5 0 0 0-3.52-3.52l-2.1 2.1a.88.88 0 0 1-1.24-1.24l2.1-2.1Zm-2.3 4.73a.88.88 0 0 1 1.24 1.24l-1.37 1.37a.88.88 0 0 1-1.24-1.24l1.37-1.37Zm-2.76 2.13a.88.88 0 1 1 1.24 1.24l-2.1 2.1a2.5 2.5 0 0 0 3.52 3.52l2.1-2.1a.88.88 0 0 1 1.24 1.24l-2.1 2.1a4.25 4.25 0 0 1-6-6l2.1-2.1Z"
      />
    </svg>
  );
}

export default function PortfolioFooter({
  name,
  contactEmail,
  socialLinks,
}: {
  name: string;
  contactEmail: string;
  socialLinks: SocialLink[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Let&apos;s talk
            </p>
            <p className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              {name}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="link-sweep mt-3 inline-block text-sm font-medium text-ink-soft transition hover:text-brand"
            >
              {contactEmail}
            </a>
          </div>

          {socialLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => {
                const href = resolveSocialHref(link.href, contactEmail);
                const isExternal = href.startsWith("http");
                const kind = getSocialKind(link);

                return (
                  <li key={`${link.label}-${href}`}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink-soft shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white hover:shadow-md"
                    >
                      <SocialIcon kind={kind} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row">
          <p>
            © {year} {name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Crafted with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
