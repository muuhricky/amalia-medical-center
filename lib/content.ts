import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./content-defaults";
import type { SiteContent } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...defaultContent,
      ...parsed,
      site: { ...defaultContent.site, ...parsed.site },
      hero: { ...defaultContent.hero, ...parsed.hero },
      experience: {
        ...defaultContent.experience,
        ...parsed.experience,
        images:
          parsed.experience?.images?.length === 3
            ? parsed.experience.images
            : defaultContent.experience.images,
      },
      poliUmum: { ...defaultContent.poliUmum, ...parsed.poliUmum },
    };
  } catch {
    await ensureDataDir();
    await fs.writeFile(CONTENT_PATH, JSON.stringify(defaultContent, null, 2), "utf8");
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent) {
  await ensureDataDir();
  const next: SiteContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(CONTENT_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}
