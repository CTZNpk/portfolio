"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  getAdminSession,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/session";
import {
  normalizePortfolioContent,
  readPortfolioContent,
  savePortfolioContent,
} from "@/lib/portfolio/content";

function revalidatePortfolioRoutes() {
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/experience");
  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const valid = await verifyAdminCredentials(username, password);

  if (!valid) {
    redirect("/admin?error=invalid");
  }

  await setAdminSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function savePortfolioJsonAction(formData: FormData) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin?error=session");
  }

  const rawContent = String(formData.get("content") || "");
  let parsedContent: unknown;

  try {
    parsedContent = JSON.parse(rawContent);
  } catch {
    redirect("/admin?error=json");
  }

  const content = normalizePortfolioContent(
    parsedContent &&
      typeof parsedContent === "object" &&
      "content" in parsedContent
      ? parsedContent.content
      : parsedContent,
  );

  await savePortfolioContent(content);
  revalidatePortfolioRoutes();
  redirect("/admin?saved=1");
}

export async function saveResumeConfigAction(formData: FormData) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin?error=session");
  }

  const currentContent = await readPortfolioContent();
  const field = (name: string, fallback: string) => {
    const value = String(formData.get(name) || "").trim();
    return value || fallback;
  };
  const nextContent = normalizePortfolioContent({
    ...currentContent,
    resume: {
      eyebrow: field("resumeEyebrow", currentContent.resume.eyebrow),
      title: field("resumeTitle", currentContent.resume.title),
      description: field(
        "resumeDescription",
        currentContent.resume.description,
      ),
      pdfUrl: field("resumePdfUrl", currentContent.resume.pdfUrl),
      openLabel: field("resumeOpenLabel", currentContent.resume.openLabel),
      fallbackLabel: field(
        "resumeFallbackLabel",
        currentContent.resume.fallbackLabel,
      ),
    },
  });

  await savePortfolioContent(nextContent);
  revalidatePortfolioRoutes();
  redirect("/admin?saved=resume");
}
