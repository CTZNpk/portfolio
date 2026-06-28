import { cache } from "react";
import type { Collection, Document, OptionalId } from "mongodb";
import {
  getMongoClient,
  getMongoDatabaseName,
  hasMongoConfig,
} from "@/lib/mongodb";
import { defaultPortfolioContent } from "@/lib/portfolio/default-content";
import type {
  BlogContent,
  BlogPost,
  ContactContent,
  ExperienceContent,
  ExperienceItem,
  HeroContent,
  NavItem,
  PortfolioContent,
  ProjectItem,
  ProjectsContent,
  ResumeContent,
  SkillGroup,
  SkillsContent,
  SocialLink,
} from "@/lib/portfolio/types";

const COLLECTION_NAME = "portfolioContent";
const DOCUMENT_ID = "landing";

type PortfolioContentDocument = PortfolioContent & {
  _id: string;
  updatedAt?: string;
};

type PlainRecord = Record<string, unknown>;

function isRecord(value: unknown): value is PlainRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function textArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value.filter((item): item is string => typeof item === "string");
  return items.length > 0 ? items : fallback;
}

function normalizeNavItems(value: unknown, fallback: NavItem[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter(isRecord)
    .map((item, index) => ({
      label: text(item.label, fallback[index]?.label || "Section"),
      id: text(item.id, fallback[index]?.id || "section"),
      href: text(item.href, fallback[index]?.href || ""),
    }));

  return items.length > 0 ? items : fallback;
}

function normalizeHero(value: unknown, fallback: HeroContent): HeroContent {
  const input = isRecord(value) ? value : {};
  const primaryCta = isRecord(input.primaryCta) ? input.primaryCta : {};
  const secondaryCta = isRecord(input.secondaryCta) ? input.secondaryCta : {};

  return {
    badge: text(input.badge, fallback.badge),
    name: text(input.name, fallback.name),
    headline: text(input.headline, fallback.headline),
    description: text(input.description, fallback.description),
    primaryCta: {
      label: text(primaryCta.label, fallback.primaryCta.label),
      href: text(primaryCta.href, fallback.primaryCta.href),
    },
    secondaryCta: {
      label: text(secondaryCta.label, fallback.secondaryCta.label),
      href: text(secondaryCta.href, fallback.secondaryCta.href),
    },
  };
}

function normalizeExperienceItem(
  value: unknown,
  fallback: ExperienceItem,
): ExperienceItem {
  const input = isRecord(value) ? value : {};

  return {
    role: text(input.role, fallback.role),
    company: text(input.company, fallback.company),
    period: text(input.period, fallback.period),
    location: text(input.location, fallback.location),
    type: text(input.type, fallback.type),
    overview: text(input.overview, fallback.overview),
    responsibilities: textArray(
      input.responsibilities,
      fallback.responsibilities,
    ),
    stack: textArray(input.stack, fallback.stack),
  };
}

function normalizeExperience(
  value: unknown,
  fallback: ExperienceContent,
): ExperienceContent {
  const input = isRecord(value) ? value : {};
  const fallbackItems = fallback.items;
  const incomingItems = Array.isArray(input.items) ? input.items : [];

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    items:
      incomingItems.length > 0
        ? incomingItems.map((item, index) =>
            normalizeExperienceItem(
              item,
              fallbackItems[index] || fallbackItems[0],
            ),
          )
        : fallbackItems,
  };
}

function normalizeBlogPost(value: unknown, fallback: BlogPost): BlogPost {
  const input = isRecord(value) ? value : {};

  return {
    title: text(input.title, fallback.title),
    date: text(input.date, fallback.date),
    summary: text(input.summary, fallback.summary),
  };
}

function normalizeBlog(value: unknown, fallback: BlogContent): BlogContent {
  const input = isRecord(value) ? value : {};
  const incomingPosts = Array.isArray(input.posts) ? input.posts : [];
  const fallbackPost = fallback.posts[0] || {
    title: "Untitled",
    date: "Draft",
    summary: "",
  };

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    emailLabel: text(input.emailLabel, fallback.emailLabel),
    emailPlaceholder: text(input.emailPlaceholder, fallback.emailPlaceholder),
    notifyButtonLabel: text(
      input.notifyButtonLabel,
      fallback.notifyButtonLabel,
    ),
    successMessage: text(input.successMessage, fallback.successMessage),
    contactPrompt: text(input.contactPrompt, fallback.contactPrompt),
    posts:
      incomingPosts.length > 0
        ? incomingPosts.map((post, index) =>
            normalizeBlogPost(post, fallback.posts[index] || fallbackPost),
          )
        : fallback.posts,
  };
}

function normalizeSkillGroup(value: unknown, fallback: SkillGroup): SkillGroup {
  const input = isRecord(value) ? value : {};

  return {
    category: text(input.category, fallback.category),
    items: textArray(input.items, fallback.items),
  };
}

function normalizeSkills(value: unknown, fallback: SkillsContent): SkillsContent {
  const input = isRecord(value) ? value : {};
  const incomingGroups = Array.isArray(input.groups) ? input.groups : [];

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    groups:
      incomingGroups.length > 0
        ? incomingGroups.map((group, index) =>
            normalizeSkillGroup(
              group,
              fallback.groups[index] || fallback.groups[0],
            ),
          )
        : fallback.groups,
  };
}

function normalizeProjectItem(
  value: unknown,
  fallback: ProjectItem,
): ProjectItem {
  const input = isRecord(value) ? value : {};

  return {
    name: text(input.name, fallback.name),
    type: text(input.type, fallback.type),
    description: text(input.description, fallback.description),
  };
}

function normalizeProjects(
  value: unknown,
  fallback: ProjectsContent,
): ProjectsContent {
  const input = isRecord(value) ? value : {};
  const incomingItems = Array.isArray(input.items) ? input.items : [];

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    items:
      incomingItems.length > 0
        ? incomingItems.map((item, index) =>
            normalizeProjectItem(
              item,
              fallback.items[index] || fallback.items[0],
            ),
          )
        : fallback.items,
  };
}

function normalizeContact(
  value: unknown,
  fallback: ContactContent,
): ContactContent {
  const input = isRecord(value) ? value : {};

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    email: text(input.email, fallback.email),
    emailLabel: text(input.emailLabel, fallback.emailLabel),
  };
}

function normalizeSocialLink(value: unknown, fallback: SocialLink): SocialLink {
  const input = isRecord(value) ? value : {};

  return {
    label: text(input.label, fallback.label),
    href: text(input.href, fallback.href),
  };
}

function normalizeSocialLinks(value: unknown, fallback: SocialLink[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const fallbackItem = fallback[0] || {
    label: "Link",
    href: "#",
  };
  const links = value
    .filter(isRecord)
    .map((link, index) =>
      normalizeSocialLink(link, fallback[index] || fallbackItem),
    );

  return links;
}

function normalizeResume(
  value: unknown,
  fallback: ResumeContent,
): ResumeContent {
  const input = isRecord(value) ? value : {};

  return {
    eyebrow: text(input.eyebrow, fallback.eyebrow),
    title: text(input.title, fallback.title),
    description: text(input.description, fallback.description),
    pdfUrl: text(input.pdfUrl, fallback.pdfUrl),
    openLabel: text(input.openLabel, fallback.openLabel),
    fallbackLabel: text(input.fallbackLabel, fallback.fallbackLabel),
  };
}

export function normalizePortfolioContent(value: unknown): PortfolioContent {
  const input = isRecord(value) ? value : {};
  const metadata = isRecord(input.metadata) ? input.metadata : {};

  return {
    metadata: {
      title: text(metadata.title, defaultPortfolioContent.metadata.title),
      description: text(
        metadata.description,
        defaultPortfolioContent.metadata.description,
      ),
    },
    navItems: normalizeNavItems(
      input.navItems,
      defaultPortfolioContent.navItems,
    ),
    hero: normalizeHero(input.hero, defaultPortfolioContent.hero),
    experience: normalizeExperience(
      input.experience,
      defaultPortfolioContent.experience,
    ),
    blog: normalizeBlog(input.blog, defaultPortfolioContent.blog),
    skills: normalizeSkills(input.skills, defaultPortfolioContent.skills),
    projects: normalizeProjects(input.projects, defaultPortfolioContent.projects),
    contact: normalizeContact(input.contact, defaultPortfolioContent.contact),
    resume: normalizeResume(input.resume, defaultPortfolioContent.resume),
    socialLinks: normalizeSocialLinks(
      input.socialLinks,
      defaultPortfolioContent.socialLinks,
    ),
  };
}

function deepMerge(base: unknown, updates: unknown): unknown {
  if (!isRecord(base) || !isRecord(updates)) {
    return updates;
  }

  const merged: PlainRecord = { ...base };

  for (const [key, value] of Object.entries(updates)) {
    merged[key] = deepMerge(merged[key], value);
  }

  return merged;
}

export function mergePortfolioContent(
  base: PortfolioContent,
  updates: unknown,
) {
  return normalizePortfolioContent(deepMerge(base, updates));
}

async function getCollection(): Promise<Collection<PortfolioContentDocument>> {
  const client = await getMongoClient();
  return client
    .db(getMongoDatabaseName())
    .collection<PortfolioContentDocument>(COLLECTION_NAME);
}

function stripMongoFields(document: Document | null) {
  if (!document) {
    return null;
  }

  const { _id, updatedAt, ...content } = document;
  void _id;
  void updatedAt;
  return content;
}

export async function readPortfolioContent(): Promise<PortfolioContent> {
  if (!hasMongoConfig()) {
    return defaultPortfolioContent;
  }

  const collection = await getCollection();
  const document = await collection.findOne({ _id: DOCUMENT_ID });

  return normalizePortfolioContent(stripMongoFields(document));
}

export const getPortfolioContent = cache(readPortfolioContent);

export async function savePortfolioContent(content: PortfolioContent) {
  if (!hasMongoConfig()) {
    throw new Error("MONGODB_URI is required to save portfolio content.");
  }

  const normalized = normalizePortfolioContent(content);
  const document: OptionalId<PortfolioContentDocument> = {
    _id: DOCUMENT_ID,
    ...normalized,
    updatedAt: new Date().toISOString(),
  };

  const collection = await getCollection();
  await collection.replaceOne({ _id: DOCUMENT_ID }, document, {
    upsert: true,
  });

  return normalized;
}

export async function seedPortfolioContent() {
  return savePortfolioContent(defaultPortfolioContent);
}
