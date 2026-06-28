import type { Metadata } from "next";
import LandingPage from "@/components/landing-page/LandingPage";
import { getPublicPortfolioContent } from "@/lib/portfolio/public-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
