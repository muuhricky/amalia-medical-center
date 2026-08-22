"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import MagneticButton from "./MagneticButton";
import type { SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/content-defaults";

function OrganicBlob() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(80vw,640px)] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2"
        style={{ rotateX, rotateY, x: translateX, y: translateY }}
      >
        <motion.div
          className="absolute inset-0 rounded-[42%_58%_70%_30%/45%_40%_60%_55%] bg-gradient-to-br from-sage/35 via-sage-light/20 to-terracotta-soft/30 blur-2xl"
          animate={{
            borderRadius: [
              "42% 58% 70% 30% / 45% 40% 60% 55%",
              "58% 42% 40% 60% / 55% 60% 40% 45%",
              "40% 60% 55% 45% / 50% 35% 65% 50%",
              "42% 58% 70% 30% / 45% 40% 60% 55%",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[12%] rounded-[60%_40%_30%_70%/40%_55%_45%_60%] bg-gradient-to-tr from-terracotta/25 via-transparent to-sage/20 blur-xl"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 40% 55% 45% 60%",
              "40% 60% 70% 30% / 60% 40% 55% 45%",
              "60% 40% 30% 70% / 40% 55% 45% 60%",
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

interface HeroProps {
  content?: SiteContent["hero"];
  whatsapp?: string;
}

export default function Hero({
  content = defaultContent.hero,
  whatsapp = defaultContent.site.whatsapp,
}: HeroProps) {
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Halo Amalia Medical Center, saya ingin konsultasi"
  )}`;

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-32 pb-24 md:px-12 lg:px-20">
      <OrganicBlob />

      {content.mediaUrl && (
        <div className="pointer-events-none absolute inset-y-8 right-0 hidden w-[48%] lg:block">
          <div className="relative h-full w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_14%,black_38%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_14%,black_38%)]">
            {content.mediaType === "video" ? (
              <video
                src={content.mediaUrl}
                className="h-full w-full object-cover object-[center_42%] opacity-[0.72] saturate-[0.72] contrast-[0.88] brightness-[1.08]"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={content.mediaUrl}
                alt=""
                className="h-full w-full object-cover object-[center_42%] opacity-[0.72] saturate-[0.72] contrast-[0.88] brightness-[1.08]"
              />
            )}
            {/* Soft cream wash — menyatu ke background, tanpa tepi keras */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream from-[8%] via-cream/75 via-[42%] to-cream/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/85 via-cream/10 to-cream/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_35%,rgba(247,245,240,0.55)_100%)]" />
          </div>
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-12 bg-sage/60" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              {content.eyebrow}
            </span>
          </div>
          <a
            href="/#akreditasi"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-peach/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-charcoal/70 transition hover:border-terracotta/45 hover:bg-peach"
          >
            <Star className="h-3 w-3 fill-terracotta text-terracotta" />
            Akreditasi Paripurna
          </a>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-charcoal text-balance max-w-4xl"
        >
          {content.headline}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 italic text-sage">
              {content.headlineAccent}
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[0.12em] w-full bg-terracotta/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
            />
          </span>{" "}
          {content.headlineEnd}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal/65 md:text-xl"
        >
          {content.subheadline}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton href={wa} variant="primary">
            {content.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <motion.a
            href="#layanan"
            data-cursor="hover"
            className="group flex items-center gap-2 text-sm font-medium text-charcoal/60 transition-colors hover:text-charcoal"
            whileHover={{ x: 4 }}
          >
            <span className="border-b border-charcoal/20 pb-0.5 transition-colors group-hover:border-sage">
              Jelajahi Layanan
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-3 gap-8 border-t border-charcoal/8 pt-10 md:max-w-lg"
        >
          {[
            { value: "15+", label: "Dokter Spesialis" },
            { value: "50K+", label: "Pasien Puas" },
            { value: "24/7", label: "Emergency Care" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl font-medium text-charcoal md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-charcoal/45 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-charcoal/30"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-charcoal/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
