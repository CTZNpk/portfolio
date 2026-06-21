import type { Metadata } from "next";
import LandingPage from "@/components/landing-page/LandingPage";
import { defaultPortfolioContent } from "@/lib/portfolio/default-content";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getPublicPortfolioContent() {
  try {
    return await getPortfolioContent();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown MongoDB error";

    console.error(
      "Failed to load portfolio content from MongoDB; using defaults.",
      { message },
    );

    return defaultPortfolioContent;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicPortfolioContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function Home() {
  const content = await getPublicPortfolioContent();

  return <LandingPage content={content} />;
}
