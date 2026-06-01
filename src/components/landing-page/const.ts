export const navItems = [
  { label: "Home", id: "top" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Your Company",
    period: "2024 - Present",
    focus: "Product engineering",
    summary:
      "Building reliable web applications with modern frontend and backend tools, focusing on clean interfaces, performance, and maintainable code.",
  },
  {
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2022 - 2024",
    focus: "Design systems",
    summary:
      "Created responsive user experiences, reusable React components, and production-ready pages for business-critical products.",
  },
  {
    role: "Full Stack Engineer",
    company: "Placeholder Studio",
    period: "2021 - 2022",
    focus: "API platforms",
    summary:
      "Shipped user-facing workflows backed by structured APIs, authentication, database models, and operational tooling.",
  },
  {
    role: "Web Developer",
    company: "Early Team",
    period: "2020 - 2021",
    focus: "Performance",
    summary:
      "Improved page speed, accessibility, and component quality across marketing pages and internal web products.",
  },
];

export const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    school: "Your University",
    period: "2018 - 2022",
  },
  {
    degree: "Professional Development",
    school: "Modern Web Engineering",
    period: "Ongoing",
  },
];

export const projects = [
  {
    name: "Portfolio Website",
    type: "Personal Brand",
    imageLabel: "Portfolio",
    accent:
      "linear-gradient(135deg, rgba(167, 243, 208, 0.9), #ffffff 48%, rgba(217, 249, 157, 0.9))",
    description:
      "A polished portfolio site designed to present experience, education, projects, and contact details in one professional place.",
  },
  {
    name: "SaaS Dashboard",
    type: "Web Application",
    imageLabel: "Dashboard",
    accent:
      "linear-gradient(135deg, rgba(186, 230, 253, 0.9), #ffffff 48%, rgba(209, 250, 229, 0.9))",
    description:
      "A responsive dashboard concept with analytics, data tables, and workflow-focused UI patterns.",
  },
  {
    name: "API Platform",
    type: "Backend System",
    imageLabel: "API",
    accent:
      "linear-gradient(135deg, rgba(228, 228, 231, 0.9), #ffffff 48%, rgba(207, 250, 254, 0.9))",
    description:
      "A structured API project with authentication, database models, and clean service boundaries.",
  },
];

export const contentTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1],
} as const;
