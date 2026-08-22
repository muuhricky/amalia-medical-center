import { promises as fs } from "fs";
import path from "path";
import { defaultBuilder } from "./builder-defaults";
import type { BuilderData, BuilderSection } from "./builder-types";

const DATA_DIR = path.join(process.cwd(), "data");
const BUILDER_PATH = path.join(DATA_DIR, "builder.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function mergeSections(parsed: Partial<BuilderData>): BuilderData {
  const byId = new Map(
    (parsed.sections || []).map((s) => [s.id, s as BuilderSection])
  );
  const sections = defaultBuilder.sections.map((def) => {
    const saved = byId.get(def.id);
    if (!saved) return def;
    return {
      ...def,
      ...saved,
      blocks:
        Array.isArray(saved.blocks) && saved.blocks.length > 0
          ? saved.blocks
          : def.blocks,
    };
  });

  // keep any custom sections admin may have added
  for (const s of parsed.sections || []) {
    if (!sections.find((x) => x.id === s.id)) {
      sections.push(s as BuilderSection);
    }
  }

  return {
    sections,
    updatedAt: parsed.updatedAt || defaultBuilder.updatedAt,
  };
}

export async function getBuilder(): Promise<BuilderData> {
  try {
    const raw = await fs.readFile(BUILDER_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<BuilderData>;
    return mergeSections(parsed);
  } catch {
    await ensureDataDir();
    await fs.writeFile(
      BUILDER_PATH,
      JSON.stringify(defaultBuilder, null, 2),
      "utf8"
    );
    return defaultBuilder;
  }
}

export async function saveBuilder(data: BuilderData) {
  await ensureDataDir();
  const next: BuilderData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(BUILDER_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}
