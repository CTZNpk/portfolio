"use client";

import { navItems } from "@/components/landing-page/const";

export default function SectionRail({
  activeIndex,
  goToSection,
}: {
  activeIndex: number;
  goToSection: (index: number) => void;
}) {
  return (
    <div className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {navItems.map((item, index) => (
        <button
          key={item.id}
          type="button"
          aria-label={`Go to ${item.label}`}
          onClick={() => goToSection(index)}
          className={`h-2.5 w-2.5 border transition ${
            activeIndex === index
              ? "scale-125 border-emerald-700 bg-emerald-700"
              : "border-emerald-700/40 bg-white/70 hover:border-emerald-700"
          }`}
        />
      ))}
    </div>
  );
}
