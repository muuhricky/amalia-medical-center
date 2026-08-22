import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const dir = path.join(process.cwd(), "public", "brand");
const targets = [
  "k3.png",
  "safety-first.png",
  "logo-amc.png",
  "amc-mark.png",
  "amc-horizontal.png",
  "bp2mi.png",
  "bp2mi-alt.png",
  "hiperkes.png",
  "kemenkes.png",
  "akreditasi-paripurna.png",
  "kemnaker.png",
];

for (const file of targets) {
  const filePath = path.join(dir, file);
  const input = await fs.readFile(filePath);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let cleared = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const bri = (r + g + b) / 3;

    if (bri < 28 && sat < 0.35) {
      data[i + 3] = 0;
      cleared++;
      continue;
    }
    if (bri < 48 && sat < 0.28) {
      const t = Math.max(0, (bri - 12) / 36);
      data[i + 3] = Math.round(a * t);
      cleared++;
    }
  }

  const out = await sharp(data, {
    raw: { width, height, channels },
  })
    .png()
    .toBuffer();

  const tmp = `${filePath}.tmp.png`;
  await fs.writeFile(tmp, out);
  await fs.unlink(filePath);
  await fs.rename(tmp, filePath);
  console.log(`${file} cleared ${cleared}`);
}

console.log("Done.");
