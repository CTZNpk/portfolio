import type { PortfolioContent } from "@/lib/portfolio/types";

export const defaultPortfolioContent: PortfolioContent = {
  metadata: {
    title: "Haider Sultan | Software Developer",
    description:
      "Minimal portfolio for Haider Sultan with experience, future blog updates, resume, and contact information.",
  },
  navItems: [
    { label: "Home", id: "home", href: "/" },
    { label: "Blogs", id: "blogs", href: "/blogs" },
    { label: "Experience", id: "experience", href: "/experience" },
    { label: "Resume", id: "resume", href: "/resume" },
  ],
  hero: {
    badge: "Software Developer",
    name: "Haider Sultan",
    headline: "Building clean, useful software for the web.",
    description:
      "I am a software developer focused on building practical web products with clean interfaces, maintainable code, and reliable user flows. I enjoy turning rough ideas into usable applications and improving existing systems so they feel simpler, faster, and easier to work with.",
    primaryCta: {
      label: "Get in touch",
      href: "#contact",
    },
    secondaryCta: {
      label: "",
      href: "",
    },
  },
  experience: {
    eyebrow: "Jobs",
    title: "Work experience",
    description:
      "A timeline-style overview built for detailed responsibilities, technologies, and role context.",
    items: [
      {
        role: "Software Developer",
        company: "Current Role",
        period: "2024 - Present",
        location: "Remote / On-site",
        type: "Full-time",
        overview:
          "Building and maintaining web applications with a focus on clean interfaces, practical architecture, and reliable delivery.",
        responsibilities: [
          "Develop user-facing features with reusable React and TypeScript components.",
          "Work across frontend and backend tasks to connect interfaces with APIs and data flows.",
          "Improve existing screens, fix production issues, and keep implementation details maintainable.",
        ],
        stack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      },
      {
        role: "Frontend Developer",
        company: "Previous Role",
        period: "2022 - 2024",
        location: "Remote / On-site",
        type: "Full-time",
        overview:
          "Worked on responsive interfaces and shared UI patterns for web products.",
        responsibilities: [
          "Created responsive layouts that worked across desktop and mobile screens.",
          "Built reusable components to keep product screens consistent.",
          "Collaborated on UI fixes, feature updates, and frontend quality improvements.",
        ],
        stack: ["React", "JavaScript", "CSS", "Responsive UI"],
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "Not any blogs yet",
    description: "Get notified when the first blog is added.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    notifyButtonLabel: "Notify me",
    successMessage: "Thanks. I will use {email} for blog updates.",
    contactPrompt: "This is a placeholder signup for now. You can also reach me at",
    posts: [],
  },
  skills: {
    eyebrow: "Skills",
    title: "Tools and technologies I work with",
    description:
      "A practical stack for building responsive interfaces, backend services, and maintainable web applications.",
    groups: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Backend",
        items: ["Node.js", "REST APIs", "Databases", "Authentication"],
      },
      {
        category: "Workflow",
        items: ["Git", "Responsive UI", "Debugging", "Clean code"],
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected projects",
    description: "Simple tiles for the projects you want to show.",
    items: [
      {
        name: "Portfolio Website",
        type: "Website",
        description:
          "A simple personal site with jobs, writing, projects, and contact.",
      },
      {
        name: "Web Dashboard",
        type: "Application",
        description: "A responsive dashboard layout for tracking product data.",
      },
      {
        name: "API Project",
        type: "Backend",
        description: "A small backend project with structured endpoints.",
      },
    ],
  },
  contact: {
    eyebrow: "Email Me",
    title: "Let's build something useful.",
    description:
      "Have a project, collaboration, or role in mind? Send me an email and I'll get back to you.",
    email: "hello@example.com",
    emailLabel: "hello@example.com",
  },
  resume: {
    eyebrow: "Resume",
    title: "Dummy resume PDF",
    description: "This placeholder is attached until the final resume is ready.",
    pdfUrl: "/resume.pdf",
    openLabel: "Open PDF",
    fallbackLabel: "Open dummy resume PDF",
  },
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-profile",
    },
    {
      label: "Mail",
      href: "mailto:contact",
    },
    {
      label: "GitHub",
      href: "https://github.com/your-username",
    },
  ],
};
