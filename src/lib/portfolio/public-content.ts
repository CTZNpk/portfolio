import { defaultPortfolioContent } from "@/lib/portfolio/default-content";
import { getPortfolioContent } from "@/lib/portfolio/content";

export async function getPublicPortfolioContent() {
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
