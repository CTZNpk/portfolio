import BlogSection from "@/components/landing-page/sections/BlogSection";
import ContactSection from "@/components/landing-page/sections/ContactSection";
import ExperienceSection from "@/components/landing-page/sections/ExperienceSection";
import HeroSection from "@/components/landing-page/sections/HeroSection";
import ProjectsSection from "@/components/landing-page/sections/ProjectsSection";
import SkillsSection from "@/components/landing-page/sections/SkillsSection";
import type { PortfolioContent } from "@/lib/portfolio/types";

export default function LandingPage({ content }: { content: PortfolioContent }) {
  return (
    <main className="relative min-h-screen bg-[#f7fbf7] text-[#102018]">
      <HeroSection content={content.hero} />
      <ExperienceSection content={content.experience} />
      <BlogSection content={content.blog} />
      <SkillsSection content={content.skills} />
      <ProjectsSection content={content.projects} />
      <ContactSection content={content.contact} />
    </main>
  );
}
