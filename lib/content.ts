import { readFileSync } from "fs";
import { join } from "path";
import type { EducationItem, ExperienceItem, ProjectItem, PublicationItem } from "./data";

export type Profile = {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  scholar: string;
  tagline: string;
  heroImage: string;
  aboutImage: string;
};

export type SkillGroup = {
  title: string;
  icon: string;
  items: string[];
};

export type RecommendationItem = {
  recommender: string;
  title: string;
  relationship: string;
  body: string;
  note: string;
  image: string;
};

async function readSection<T>(section: string): Promise<T> {
  // Production: try Netlify Blobs first, fall back to JSON file
  if (process.env.NODE_ENV === "production") {
    try {
      const { getStore } = await import("@netlify/blobs");
      const store = getStore("portfolio-content");
      const raw = await store.get(section, { type: "text" });
      if (raw) return JSON.parse(raw) as T;
    } catch {
      // Blob not found yet — fall through to file
    }
  }

  // Development (or blob not set yet): read from content/ JSON files
  const filePath = join(process.cwd(), "content", `${section}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function getProfile(): Promise<Profile> {
  return readSection<Profile>("profile");
}

export async function getEducation(): Promise<EducationItem[]> {
  return readSection<EducationItem[]>("education");
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return readSection<ExperienceItem[]>("experience");
}

export async function getProjects(): Promise<ProjectItem[]> {
  return readSection<ProjectItem[]>("projects");
}

export async function getPublications(): Promise<PublicationItem[]> {
  return readSection<PublicationItem[]>("publications");
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return readSection<SkillGroup[]>("skills");
}

export async function getRecommendations(): Promise<RecommendationItem[]> {
  return readSection<RecommendationItem[]>("recommendations");
}
