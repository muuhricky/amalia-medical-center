import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import type { MediaItem, MediaType } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const MEDIA_INDEX = path.join(DATA_DIR, "media.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 80 * 1024 * 1024;

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function getMediaLibrary(): Promise<MediaItem[]> {
  try {
    const raw = await fs.readFile(MEDIA_INDEX, "utf8");
    return JSON.parse(raw) as MediaItem[];
  } catch {
    await ensureDirs();
    await fs.writeFile(MEDIA_INDEX, "[]", "utf8");
    return [];
  }
}

async function saveMediaLibrary(items: MediaItem[]) {
  await ensureDirs();
  await fs.writeFile(MEDIA_INDEX, JSON.stringify(items, null, 2), "utf8");
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function detectType(mime: string): MediaType | null {
  if (IMAGE_TYPES.has(mime)) return "image";
  if (VIDEO_TYPES.has(mime)) return "video";
  return null;
}

export async function saveUploadedFile(file: File, alt = "") {
  const type = detectType(file.type);
  if (!type) {
    throw new Error("Format tidak didukung. Gunakan JPG, PNG, WEBP, GIF, MP4, atau WEBM.");
  }

  const max = type === "image" ? MAX_IMAGE : MAX_VIDEO;
  if (file.size > max) {
    throw new Error(
      type === "image"
        ? "Ukuran gambar maksimal 10MB."
        : "Ukuran video maksimal 80MB."
    );
  }

  await ensureDirs();

  const ext = path.extname(file.name).toLowerCase() || (type === "image" ? ".jpg" : ".mp4");
  const id = randomBytes(8).toString("hex");
  const filename = `${Date.now()}-${slugify(file.name) || "media"}-${id}${ext}`;
  const diskPath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(diskPath, buffer);

  const item: MediaItem = {
    id,
    filename,
    originalName: file.name,
    url: `/uploads/${filename}`,
    type,
    mimeType: file.type,
    size: file.size,
    alt: alt || slugify(file.name).replace(/-/g, " "),
    createdAt: new Date().toISOString(),
  };

  const library = await getMediaLibrary();
  library.unshift(item);
  await saveMediaLibrary(library);
  return item;
}

export async function updateMediaAlt(id: string, alt: string) {
  const library = await getMediaLibrary();
  const idx = library.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Media tidak ditemukan.");
  library[idx] = { ...library[idx], alt };
  await saveMediaLibrary(library);
  return library[idx];
}

export async function deleteMedia(id: string) {
  const library = await getMediaLibrary();
  const item = library.find((m) => m.id === id);
  if (!item) throw new Error("Media tidak ditemukan.");

  const diskPath = path.join(UPLOAD_DIR, item.filename);
  try {
    await fs.unlink(diskPath);
  } catch {
    // file may already be gone
  }

  const next = library.filter((m) => m.id !== id);
  await saveMediaLibrary(next);
  return true;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
