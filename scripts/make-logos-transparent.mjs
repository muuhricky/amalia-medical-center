import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const brandDir = path.join(process.cwd(), "public", "brand");

async function processFile(filePath) {
  const input = await fs.readFile(filePath);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let changed = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a === 0) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const brightness = (r + g + b) / 3;

    const isDarkBg = brightness < 42 && saturation < 0.25;
    const isLightBg = brightness > 240 && saturation < 0.1;
    const isOffWhite = brightness > 228 && saturation < 0.06 && max - min < 14;

    if (isDarkBg || isLightBg || isOffWhite) {
      data[i + 3] = 0;
      changed++;
    } else if (brightness < 60 && saturation < 0.4) {
      const t = Math.max(0, Math.min(1, (brightness - 18) / 42));
      const na = Math.round(a * t);
      if (na !== a) {
        data[i + 3] = na;
        changed++;
      }
    }
  }

  const out = await sharp(data, {
    raw: { width, height, channels },
  })
    .png()
    .toBuffer();

  const tmp = `${filePath}.tmp.png`;
  await fs.writeFile(tmp, out);
  await fs.unlink(filePath).catch(() => {});
  await fs.rename(tmp, filePath).catch(async () => {
    await fs.copyFile(tmp, filePath);
    await fs.unlink(tmp).catch(() => {});
  });

  return { changed, width, height };
}

const files = (await fs.readdir(brandDir)).filter((f) =>
  f.toLowerCase().endsWith(".png")
);

for (const file of files) {
  if (file.endsWith(".tmp.png")) continue;
  const full = path.join(brandDir, file);
  try {
    const result = await processFile(full);
    console.log(`OK ${file} (${result.width}x${result.height}, cleared ~${result.changed} px)`);
  } catch (err) {
    console.error(`FAIL ${file}:`, err.message);
  }
}

console.log("Done.");
