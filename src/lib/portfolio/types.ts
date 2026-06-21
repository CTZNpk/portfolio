export type NavItem = {
  label: string;
  id: string;
};

export type HeroContent = {
  badge: string;
  name: string;
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: string[];
  stack: string[];
};

export type ExperienceContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: ExperienceItem[];
};

export type BlogPost = {
  title: string;
  date: string;
  summary: string;
};

export type BlogContent = {
  eyebrow: string;
  title: string;
  description: string;
  posts: BlogPost[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type SkillsContent = {
  eyebrow: string;
  title: string;
  description: string;
  groups: SkillGroup[];
};

export type ProjectItem = {
  name: string;
  type: string;
  description: string;
};

export type ProjectsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: ProjectItem[];
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
  emailLabel: string;
};

export type PortfolioContent = {
  metadata: {
    title: string;
    description: string;
  };
  navItems: NavItem[];
  hero: HeroContent;
  experience: ExperienceContent;
  blog: BlogContent;
  skills: SkillsContent;
  projects: ProjectsContent;
  contact: ContactContent;
};
