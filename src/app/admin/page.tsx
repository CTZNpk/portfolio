import type { Metadata } from "next";
import Link from "next/link";
import { getAdminAuthSetupIssues } from "@/lib/auth/jwt";
import { getAdminSession } from "@/lib/auth/session";
import { hasMongoConfig } from "@/lib/mongodb";
import { readPortfolioContent } from "@/lib/portfolio/content";
import {
  loginAction,
  logoutAction,
  savePortfolioJsonAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin | Portfolio",
  description: "Portfolio content administration.",
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    saved?: string | string[];
  }>;
};

type NoticeTone = "error" | "success" | "warning";
type AdminMessage = {
  tone: NoticeTone;
  text: string;
} | null;

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getMessage(
  error: string | undefined,
  saved: string | undefined,
): AdminMessage {
  if (saved) {
    return {
      tone: "success",
      text: "Portfolio content saved.",
    };
  }

  if (error === "invalid") {
    return {
      tone: "error",
      text: "Invalid admin username or password.",
    };
  }

  if (error === "session") {
    return {
      tone: "error",
      text: "Your admin session expired. Sign in again.",
    };
  }

  if (error === "json") {
    return {
      tone: "error",
      text: "The portfolio JSON is invalid.",
    };
  }

  return null;
}

function Notice({
  tone,
  children,
}: {
  tone: NoticeTone;
  children: React.ReactNode;
}) {
  const className =
    tone === "success"
      ? "border-emerald-700/20 bg-emerald-50 text-emerald-900"
      : tone === "warning"
        ? "border-amber-700/20 bg-amber-50 text-amber-900"
        : "border-red-700/20 bg-red-50 text-red-900";

  return (
    <div className={`border px-4 py-3 text-sm leading-6 ${className}`}>
      {children}
    </div>
  );
}

function LoginView({
  message,
  setupIssues,
}: {
  message: AdminMessage;
  setupIssues: string[];
}) {
  return (
    <main className="min-h-screen bg-[#f7fbf7] px-6 py-12 text-[#102018] sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col justify-center">
        <p className="text-sm font-semibold uppercase text-emerald-700">
          Portfolio Admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-emerald-950">
          Sign in to edit content
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#4b6155]">
          Use the admin credentials from your environment variables. A signed JWT
          is stored in an HTTP-only cookie after login.
        </p>

        <div className="mt-8 space-y-4">
          {message ? <Notice tone={message.tone}>{message.text}</Notice> : null}
          {setupIssues.length > 0 ? (
            <Notice tone="warning">
              <p className="font-semibold">Admin setup is incomplete:</p>
              <ul className="mt-2 list-disc pl-5">
                {setupIssues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </Notice>
          ) : null}
        </div>

        <form
          action={loginAction}
          className="mt-8 grid gap-4 border border-emerald-900/10 bg-white p-6 shadow-[0_10px_28px_rgba(16,96,64,0.06)]"
        >
          <label className="grid gap-2 text-sm font-semibold text-emerald-950">
            Username
            <input
              name="username"
              autoComplete="username"
              defaultValue="admin"
              className="h-11 border border-emerald-900/15 px-3 text-base font-normal outline-none focus:border-emerald-700"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-emerald-950">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-11 border border-emerald-900/15 px-3 text-base font-normal outline-none focus:border-emerald-700"
            />
          </label>
          <button className="mt-2 h-11 bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

async function EditorView({
  message,
}: {
  message: AdminMessage;
}) {
  const content = await readPortfolioContent();
  const mongoConfigured = hasMongoConfig();

  return (
    <main className="min-h-screen bg-[#f7fbf7] px-6 py-10 text-[#102018] sm:px-10 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-5 border-b border-emerald-900/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Portfolio Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
              Edit portfolio content
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4b6155]">
              Update the JSON below to change the homepage content. This editor
              writes through the same MongoDB-backed content layer used by the
              public page.
            </p>
          </div>

          <form action={logoutAction}>
            <button className="h-11 border border-emerald-900/15 bg-white px-5 text-sm font-semibold text-emerald-900 transition hover:border-emerald-700/40 hover:text-emerald-700">
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-6 space-y-4">
          {message ? <Notice tone={message.tone}>{message.text}</Notice> : null}
          {!mongoConfigured ? (
            <Notice tone="warning">
              MONGODB_URI is not configured. The page is showing fallback
              content, and saving will fail until MongoDB is configured.
            </Notice>
          ) : null}
        </div>

        <form action={savePortfolioJsonAction} className="mt-8">
          <label className="block text-sm font-semibold text-emerald-950">
            Portfolio JSON
          </label>
          <textarea
            name="content"
            defaultValue={JSON.stringify(content, null, 2)}
            spellCheck={false}
            className="mt-3 min-h-[62vh] w-full resize-y border border-emerald-900/15 bg-white p-4 font-mono text-sm leading-6 text-[#102018] outline-none focus:border-emerald-700"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button className="h-11 bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Save content
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center border border-emerald-900/15 bg-white px-5 text-sm font-semibold text-emerald-900 transition hover:border-emerald-700/40 hover:text-emerald-700"
            >
              View site
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const query = await searchParams;
  const message = getMessage(
    getFirstParam(query.error),
    getFirstParam(query.saved),
  );
  const session = await getAdminSession();

  if (!session) {
    return (
      <LoginView
        message={message}
        setupIssues={getAdminAuthSetupIssues()}
      />
    );
  }

  return <EditorView message={message} />;
}
