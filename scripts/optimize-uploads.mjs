import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.resolve("public/uploads");
const outDir = path.resolve("public/media");

const jobs = [
  {
    src: "61a4e8b8-c0ff-4807-9ed3-2d9230f486ed.png",
    out: "exterior-clinic.jpg",
    width: 1600,
  },
  {
    src: "Gemini_Generated_Image_tob7jgtob7jgtob7.png",
    out: "lobby-reception.jpg",
    width: 1600,
  },
  {
    src: "_DSC0166 Edit (1).jpg",
    out: "radiology-care.jpg",
    width: 1400,
  },
  {
    src: "_DSC0173 Edit (1).jpg",
    out: "lab-technician.jpg",
    width: 1400,
  },
  {
    src: "_DSC0182 Edit.jpg",
    out: "lab-analyzer.jpg",
    width: 1400,
  },
  {
    src: "_DSC0162 Edit (1).jpg",
    out: "radiology-assist.jpg",
    width: 1400,
  },
  {
    src: "_DSC0098 E.jpg",
    out: "team-nurses.jpg",
    width: 1800,
  },
  {
    src: "Gemini_Generated_Image_p6rylwp6rylwp6ry.png",
    out: "doctor-portrait.jpg",
    width: 1400,
  },
  {
    src: "Gemini_Generated_Image_2dqe7x2dqe7x2dqe.png",
    out: "pharmacist.jpg",
    width: 1200,
  },
  {
    src: "WhatsApp Image 2025-11-14 at 13.21.03_c28d5ccc.jpg",
    out: "doctor-glasses.jpg",
    width: 900,
  },
  {
    src: "WhatsApp Image 2025-11-14 at 13.25.37_2cb40c9c.jpg",
    out: "staff-female.jpg",
    width: 900,
  },
  {
    src: "WhatsApp Image 2025-11-14 at 13.25.37_3a4a8b1b.jpg",
    out: "doctor-female.jpg",
    width: 900,
  },
  {
    src: "WhatsApp Image 2024-09-19 at 16.23.41_fa17ee9a.jpg",
    out: "hiperkes-fitness.jpg",
    width: 1200,
  },
  {
    src: "4.png",
    out: "radiology-detail.jpg",
    width: 1400,
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const input = path.join(root, job.src);
  const output = path.join(outDir, job.out);
  if (!fs.existsSync(input)) {
    console.warn("missing:", job.src);
    continue;
  }
  await sharp(input)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  const size = fs.statSync(output).size;
  console.log(`${job.out} → ${(size / 1024).toFixed(0)} KB`);
}
