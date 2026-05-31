import { education } from "@/components/landing-page/const";
import {
  AnimatedSection,
  PortfolioCard,
  SectionHeader,
} from "@/components/landing-page/sections/section-ui";

export default function EducationSection() {
  return (
    <AnimatedSection id="education" tone="green">
      <SectionHeader
        label="Education"
        title="A foundation for solving real problems."
        description="Use this section for degrees, certifications, and focused learning."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <PortfolioCard key={`${item.degree}-${item.school}`}>
            <p className="text-sm font-semibold text-emerald-700">
              {item.period}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-emerald-950">
              {item.degree}
            </h3>
            <p className="mt-2 text-[#4b6155]">{item.school}</p>
          </PortfolioCard>
        ))}
      </div>
    </AnimatedSection>
  );
}
