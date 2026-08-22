"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { BuilderBlock } from "@/lib/builder-types";
import { SHAPE_CLASS } from "@/lib/builder-types";

function BlockImage({
  block,
  className = "",
}: {
  block: BuilderBlock;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={block.imageUrl}
      alt={block.title}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{
        objectPosition: `${block.posX}% ${block.posY}%`,
        transform: `scale(${(block.zoom || 100) / 100})`,
      }}
    />
  );
}

function sizeClass(size: BuilderBlock["size"]) {
  if (size === "xl") return "md:col-span-2 lg:col-span-3";
  if (size === "l") return "md:col-span-2";
  return "";
}

interface TeamGalleryProps {
  teamBlocks: BuilderBlock[];
  galleryBlocks: BuilderBlock[];
}

export default function TeamGallery({
  teamBlocks,
  galleryBlocks,
}: TeamGalleryProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tim" className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(63,154,90,0.08),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(224,138,60,0.07),transparent_45%)]"
      />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            Tenaga Profesional
          </span>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-charcoal md:text-5xl">
            Kenali para profesional
            <br />
            <span className="italic text-sage">tenaga kami</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/55">
            Mereka adalah penanggung jawab di setiap unit layanan Amalia Medical
            Center — dokter spesialis, dokter umum, dan apoteker yang menjaga
            mutu klinis Anda setiap hari.
          </p>
        </motion.div>

        {(() => {
          const topRow = teamBlocks.slice(0, 3);
          const bottomRow = teamBlocks.slice(3);

          const renderCard = (p: BuilderBlock, i: number, compact = false) => (
            <motion.figure
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 * i, duration: 0.55 }}
              className="group relative"
            >
              <div
                className={`relative overflow-hidden bg-sage/10 ${SHAPE_CLASS[p.shape]} ${
                  compact ? "aspect-[3/4]" : "aspect-[4/5]"
                }`}
              >
                {p.imageUrl && <BlockImage block={p} />}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent" />
                <figcaption
                  className={`absolute inset-x-0 bottom-0 ${compact ? "p-4" : "p-5 md:p-6"}`}
                >
                  <p
                    className={`font-serif leading-snug text-cream ${
                      compact ? "text-base md:text-lg" : "text-lg md:text-xl"
                    }`}
                  >
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed tracking-wide text-cream/75">
                    {p.subtitle}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          );

          return (
            <div className="mt-14 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {topRow.map((p, i) => renderCard(p, i))}
              </div>
              {bottomRow.length > 0 && (
                <div
                  className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                    bottomRow.length === 4
                      ? "lg:grid-cols-4"
                      : bottomRow.length === 3
                        ? "lg:grid-cols-3"
                        : "lg:grid-cols-2"
                  }`}
                >
                  {bottomRow.map((p, i) =>
                    renderCard(p, i + topRow.length, bottomRow.length >= 4)
                  )}
                </div>
              )}
            </div>
          );
        })()}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-28 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
            Galeri fasilitas
          </span>
          <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            Di balik layanan, <span className="italic">ada standar</span>
          </h3>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {galleryBlocks.map((f, i) => (
            <motion.figure
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.6 }}
              className={`group relative overflow-hidden bg-charcoal/[0.03] ${SHAPE_CLASS[f.shape]} ${sizeClass(f.size)} ${
                f.size === "xl" || f.size === "l"
                  ? "aspect-[16/9]"
                  : "aspect-[4/5] sm:aspect-[3/4]"
              }`}
            >
              {f.imageUrl && <BlockImage block={f} />}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="text-xs uppercase tracking-[0.22em] text-cream/70">
                  {f.title}
                </p>
                <p className="mt-2 font-serif text-lg text-cream md:text-xl">
                  {f.subtitle}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
