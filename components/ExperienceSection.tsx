"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Leaf, Clock, ShieldCheck } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import type { BuilderBlock } from "@/lib/builder-types";
import { SHAPE_CLASS } from "@/lib/builder-types";
import { defaultContent } from "@/lib/content-defaults";

const features = [
  {
    icon: Sparkles,
    title: "Interior Boutique",
    desc: "Ruang tunggu seperti lounge hotel bintang lima.",
  },
  {
    icon: Leaf,
    title: "Healing Environment",
    desc: "Pencahayaan alami, tanaman hidup, dan aromaterapi lembut.",
  },
  {
    icon: Clock,
    title: "Zero Queue Stress",
    desc: "Sistem antrian digital — waktu Anda dihargai.",
  },
  {
    icon: ShieldCheck,
    title: "Privasi Terjaga",
    desc: "Ruangan konsultasi soundproof untuk kenyamanan maksimal.",
  },
];

const gradients = [
  "from-sage/25 via-sage-light/15 to-terracotta-soft/20",
  "from-terracotta/20 to-terracotta-soft/30",
  "from-charcoal/8 to-sage/15",
];

interface ExperienceSectionProps {
  content?: SiteContent["experience"];
  blocks?: BuilderBlock[];
}

function visualFrom(
  blocks: BuilderBlock[] | undefined,
  index: number,
  fallback: { url: string; label: string; caption: string }
) {
  const b = blocks?.[index];
  if (!b) {
    return {
      url: fallback.url,
      label: fallback.label,
      caption: fallback.caption,
      shape: "rounded" as const,
      zoom: 100,
      posX: 50,
      posY: 50,
    };
  }
  return {
    url: b.imageUrl || fallback.url,
    label: b.title || fallback.label,
    caption: b.subtitle || fallback.caption,
    shape: b.shape,
    zoom: b.zoom,
    posX: b.posX,
    posY: b.posY,
  };
}

export default function ExperienceSection({
  content = defaultContent.experience,
  blocks,
}: ExperienceSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const images = content.images;
  const main = visualFrom(blocks, 0, images[0] || { url: "", label: "", caption: "" });
  const sideA = visualFrom(blocks, 1, images[1] || { url: "", label: "", caption: "" });
  const sideB = visualFrom(blocks, 2, images[2] || { url: "", label: "", caption: "" });

  return (
    <section id="pengalaman" className="px-6 py-32 md:px-12 lg:px-20">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-5 lg:pt-12"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-charcoal md:text-5xl">
              {content.title}
              <br />
              <span className="italic">{content.titleItalic}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/55">
              {content.description}
            </p>

            <ul className="mt-12 space-y-6">
              {features.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage/10">
                    <f.icon className="h-5 w-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">{f.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/50">{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="relative mb-10 lg:col-span-7 lg:mb-14">
            <motion.div
              className="grid grid-cols-2 gap-4 md:gap-5"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className={`relative col-span-2 aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradients[0]} ${SHAPE_CLASS[main.shape]}`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {main.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={main.url}
                    alt={main.label}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      objectPosition: `${main.posX}% ${main.posY}%`,
                      transform: `scale(${main.zoom / 100})`,
                    }}
                  />
                )}
                <div
                  className={`relative z-10 flex h-full flex-col items-center justify-center p-8 text-center ${
                    main.url
                      ? "bg-gradient-to-t from-charcoal/45 via-transparent to-transparent"
                      : ""
                  }`}
                >
                  <span
                    className={`text-xs uppercase tracking-[0.3em] ${
                      main.url ? "text-cream/75" : "text-charcoal/30"
                    }`}
                  >
                    {main.label}
                  </span>
                  <p
                    className={`mt-3 font-serif text-2xl md:text-3xl ${
                      main.url ? "text-cream" : "text-charcoal/60"
                    }`}
                  >
                    {main.caption}
                  </p>
                </div>
              </motion.div>

              {[sideA, sideB].map((img, idx) => (
                <motion.div
                  key={img.label + idx}
                  className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${gradients[idx + 1]} ${SHAPE_CLASS[img.shape]}`}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {img.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url}
                      alt={img.label}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectPosition: `${img.posX}% ${img.posY}%`,
                        transform: `scale(${img.zoom / 100})`,
                      }}
                    />
                  )}
                  <div
                    className={`relative z-10 flex h-full flex-col justify-end p-6 ${
                      img.url
                        ? "bg-gradient-to-t from-charcoal/45 via-transparent to-transparent"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-xs uppercase tracking-[0.2em] ${
                        img.url ? "text-cream/75" : "text-charcoal/35"
                      }`}
                    >
                      {img.label}
                    </span>
                    <p
                      className={`mt-2 font-serif text-xl ${
                        img.url ? "text-cream" : "text-charcoal/55"
                      }`}
                    >
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="absolute -bottom-12 left-3 rounded-2xl border border-charcoal/6 bg-cream/95 px-5 py-3 shadow-md backdrop-blur-sm md:-bottom-14 md:left-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <p className="font-serif text-2xl font-medium text-charcoal">4.9</p>
              <p className="text-[11px] text-charcoal/45">Rating kepuasan pasien</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
