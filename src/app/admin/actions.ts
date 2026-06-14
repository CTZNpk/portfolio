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
  savePortfolioContent,
} from "@/lib/portfolio/content";

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
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=1");
}
