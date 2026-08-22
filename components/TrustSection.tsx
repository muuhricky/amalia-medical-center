"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/** Naungan & mitra instansi pemerintah */
const government = [
  {
    src: "/brand/kemenkes.png",
    alt: "Kementerian Kesehatan Republik Indonesia",
    label: "Kemenkes RI",
  },
  {
    src: "/brand/kemnaker.png",
    alt: "Kementerian Ketenagakerjaan Republik Indonesia",
    label: "Kemnaker",
  },
  {
    src: "/brand/bp2mi-alt.png",
    alt: "KP2MI — Kementerian Pelindungan Pekerja Migran Indonesia",
    label: "KP2MI",
  },
  {
    src: "/brand/bp2mi.png",
    alt: "BP2MI — Badan Pelindungan Pekerja Migran Indonesia",
    label: "BP2MI",
  },
  {
    src: "/brand/kkp.png",
    alt: "KKP — Kantor Kesehatan Pelabuhan",
    label: "KKP",
  },
];

/** Sertifikasi internasional & nasional */
const certifications = [
  {
    src: "/brand/iso.png",
    alt: "ISO 13485",
    label: "ISO 13485",
  },
  {
    src: "/brand/pjk3.png",
    alt: "PJK3 — Sertifikasi",
    label: "PJK3",
  },
  {
    src: "/brand/glp.png",
    alt: "GLP Certificate",
    label: "GLP",
  },
  {
    src: "/brand/ias.png",
    alt: "IAS Accreditation",
    label: "IAS",
  },
  {
    src: "/brand/hiperkes.png",
    alt: "HIPERKES",
    label: "Hiperkes",
  },
];

/** Standar pelayanan */
const serviceStandards = [
  {
    src: "/brand/who.jpg",
    alt: "World Health Organization",
    label: "WHO",
  },
  {
    src: "/brand/glp.png",
    alt: "GLP — Good Laboratory Practice",
    label: "GLP",
  },
  {
    src: "/brand/pngtree-safety-first-icon-vector-clipart-symbol-logo-art-png-image_15380230.png",
    alt: "Safety First",
    label: "Safety First",
  },
  {
    src: "/brand/FULL_AC-removebg-preview.png",
    alt: "Akreditasi Paripurna",
    label: "PARIPURNA",
  },
];

const zoomTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 0.55,
};

function LogoTile({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <motion.div
      data-cursor="hover"
      className="group flex flex-col items-center justify-center rounded-2xl border border-charcoal/6 bg-[#F6F6F6] px-3 py-5"
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.18 },
        }}
        transition={zoomTransition}
        className="flex h-14 items-center justify-center sm:h-16"
      >
        <Image
          src={src}
          alt={alt}
          width={180}
          height={100}
          className="h-12 w-auto object-contain sm:h-14 md:h-16"
        />
      </motion.div>
      <span className="mt-3 text-center text-xs font-semibold tracking-wide text-charcoal/75">
        {label}
      </span>
    </motion.div>
  );
}

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="akreditasi" className="px-6 py-28 md:px-12 lg:px-20">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            Kepercayaan & Kepatuhan
          </span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            Naungan, sertifikasi, dan{" "}
            <span className="italic text-sage">standar pelayanan</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/55 md:text-lg">
            Setiap logo ditempatkan sesuai perannya — mitra instansi, sertifikasi
            mutu, dan standar layanan pasien.
          </p>
        </motion.div>

        <div className="space-y-5">
          {/* 1. Standar pelayanan — Paripurna bright featured */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.65 }}
            className="grid gap-5 lg:grid-cols-12"
          >
            <motion.article
              data-cursor="hover"
              className="overflow-hidden rounded-[2rem] border border-charcoal/6 bg-gradient-to-br from-peach via-cream to-sage-mist p-7 lg:col-span-5 lg:p-9"
              whileHover="hover"
              initial="rest"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-terracotta">
                Standar Pelayanan
              </p>
              <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">
                Akreditasi Paripurna
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-charcoal/80">
                LAPRIDA — Lembaga Akreditasi Prima Husada. Pengakuan mutu
                layanan tertinggi untuk keselamatan pasien.
              </p>
              <div className="mt-6 flex items-center justify-center overflow-hidden rounded-2xl bg-cream/80 p-4">
                <motion.div
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.12 },
                  }}
                  transition={zoomTransition}
                >
                  <Image
                    src="/brand/akreditasi-paripurna.png"
                    alt="Akreditasi Paripurna LAPRIDA"
                    width={420}
                    height={320}
                    className="h-auto max-h-56 w-full object-contain md:max-h-64"
                  />
                </motion.div>
              </div>
            </motion.article>

            <article className="rounded-[2rem] border border-charcoal/6 bg-cream p-7 lg:col-span-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-terracotta">
                Standar Pelayanan
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal md:text-2xl">
                WHO · GLP · Safety First · Paripurna
              </h3>
              <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-charcoal/80">
                Acuan praktik layanan dan keselamatan yang kami junjung dalam
                setiap prosedur klinik.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {serviceStandards.map((item) => (
                  <LogoTile key={`svc-${item.label}`} {...item} />
                ))}
              </div>
            </article>
          </motion.div>

          {/* 2. Sertifikasi internasional & nasional */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.65 }}
            className="rounded-[2rem] border border-charcoal/6 bg-cream p-7 md:p-9"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sage">
                  Sertifikasi
                </p>
                <h3 className="mt-2 font-serif text-xl text-charcoal md:text-2xl">
                  Internasional & nasional
                </h3>
              </div>
              <p className="max-w-md text-sm font-semibold leading-relaxed text-charcoal/80">
                ISO, PJK3, GLP, IAS, dan Hiperkes — bukti kepatuhan mutu teknis
                dan kesehatan kerja.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
              {certifications.map((item) => (
                <LogoTile key={`cert-${item.label}`} {...item} />
              ))}
            </div>
          </motion.article>

          {/* 3. Naungan & mitra instansi */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.24, duration: 0.65 }}
            className="rounded-[2rem] border border-charcoal/6 bg-gradient-to-br from-sage-mist/40 via-cream to-peach/35 p-7 md:p-9"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sage">
                  Instansi Pemerintah
                </p>
                <h3 className="mt-2 font-serif text-xl text-charcoal md:text-2xl">
                  Naungan & mitra regulasi
                </h3>
              </div>
              <p className="max-w-md text-sm text-charcoal/50">
                Kemenkes, Kemnaker, KP2MI, BP2MI, dan KKP.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
              {government.map((item) => (
                <LogoTile key={`gov-${item.label}`} {...item} />
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
