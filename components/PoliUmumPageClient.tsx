"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Stethoscope,
  Heart,
  Thermometer,
  Pill,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import MagneticButton from "@/components/MagneticButton";
import CTAFooter from "@/components/CTAFooter";
import type { SiteContent } from "@/lib/types";

const highlights = [
  {
    icon: Stethoscope,
    title: "Pemeriksaan Menyeluruh",
    desc: "Anamnesis lengkap, pemeriksaan fisik, dan saran penanganan yang jelas.",
  },
  {
    icon: Heart,
    title: "Pendekatan Personal",
    desc: "Dokter mendengarkan keluhan Anda tanpa buru-buru, dengan ruang konsultasi nyaman.",
  },
  {
    icon: Thermometer,
    title: "Deteksi Dini",
    desc: "Skrining gejala awal agar masalah kesehatan ditangani sebelum berkembang.",
  },
  {
    icon: Pill,
    title: "Rencana Perawatan",
    desc: "Resep, edukasi, dan follow-up yang mudah dipahami untuk pemulihan optimal.",
  },
];

const conditions = [
  "Demam, batuk, pilek, dan flu",
  "Nyeri kepala, migren, dan kelelahan",
  "Gangguan pencernaan ringan",
  "Kontrol tekanan darah & gula darah",
  "Konsultasi kesehatan umum & preventif",
  "Surat keterangan sehat / sakit",
];

export default function PoliUmumPageClient({
  content,
}: {
  content: SiteContent;
}) {
  const { poliUmum, site } = content;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Halo Amalia Medical Center, saya ingin konsultasi Poli Umum"
  )}`;

  return (
    <main className="relative pb-24">
      <Navbar whatsapp={site.whatsapp} />
      <FloatingNav whatsapp={site.whatsapp} />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#layanan"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-sm text-charcoal/50 transition-colors hover:text-sage"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Layanan
            </Link>
          </motion.div>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
                {poliUmum.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-charcoal md:text-6xl lg:text-7xl">
                {poliUmum.headline}
                <br />
                <span className="italic text-sage">{poliUmum.headlineItalic}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/55 md:text-lg">
                {poliUmum.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton href={wa}>Konsultasi Sekarang</MagneticButton>
                <div className="flex items-center gap-2 text-sm text-charcoal/45">
                  <Clock className="h-4 w-4 text-sage" />
                  {poliUmum.hours}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-charcoal/6 bg-gradient-to-br from-sage/25 via-sage/10 to-cream p-8 md:min-h-[340px]"
            >
              {poliUmum.mediaUrl && (
                poliUmum.mediaType === "video" ? (
                  <video
                    src={poliUmum.mediaUrl}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={poliUmum.mediaUrl}
                    alt="Poli Umum"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-cream/40 to-transparent" />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-terracotta-soft/40 blur-3xl" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <Stethoscope className="h-10 w-10 text-charcoal/35" />
                <div>
                  <p className="font-serif text-3xl font-medium text-charcoal md:text-4xl">
                    Poli Umum
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/50">
                    Untuk keluhan sehari-hari hingga pemeriksaan preventif —
                    tanpa antrean panjang, tanpa suasana rumah sakit yang
                    menegangkan.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              Kenapa Poli Umum Kami
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-5xl">
              Dirancang agar Anda merasa{" "}
              <span className="italic text-sage">tenang</span> sejak langkah
              pertama.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <motion.article
                key={item.title}
                data-cursor="hover"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.55 }}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="rounded-3xl border border-charcoal/6 bg-gradient-to-br from-sage/10 to-cream p-7 transition-colors hover:bg-sage/10"
              >
                <item.icon className="h-6 w-6 text-sage" />
                <h3 className="mt-6 font-serif text-xl text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/50">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              Kondisi yang Ditangani
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-4xl">
              Dari keluhan ringan hingga kontrol kesehatan rutin.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/55">
              Jika Anda tidak yakin perlu ke spesialis atau tidak, mulai dari
              Poli Umum. Dokter kami akan mengarahkan langkah selanjutnya
              dengan jelas.
            </p>
          </motion.div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {conditions.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.45 }}
                className="flex items-start gap-3 rounded-2xl border border-charcoal/6 bg-white/40 px-4 py-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span className="text-sm text-charcoal/70">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-8 pt-10 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] border border-charcoal/6 bg-charcoal px-8 py-10 md:flex-row md:items-center md:px-12"
        >
          <div>
            <h2 className="font-serif text-2xl font-medium text-cream md:text-3xl">
              Siap konsultasi Poli Umum?
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/55">
              Buat janji via WhatsApp — kami bantu jadwalkan di waktu yang
              nyaman untuk Anda.
            </p>
          </div>
          <MagneticButton variant="dark" href={wa}>
            Chat WhatsApp
          </MagneticButton>
        </motion.div>
      </section>

      <CTAFooter site={site} />
    </main>
  );
}
