import type { Metadata } from "next";
import LandingPage from "@/components/landing-page/LandingPage";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfolioContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function Home() {
  const content = await getPortfolioContent();

  return <LandingPage content={content} />;
}
