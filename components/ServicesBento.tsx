"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Baby,
  Syringe,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Poli Umum",
    desc: "Pemeriksaan menyeluruh dengan dokter berpengalaman.",
    icon: Stethoscope,
    span: "col-span-1 row-span-1",
    accent: "from-sage/20 to-sage/5",
    hover: "group-hover:bg-sage/15",
    href: "/layanan/poli-umum",
  },
  {
    title: "Dokter Spesialis",
    desc: "Jaringan spesialis terpercaya untuk setiap kebutuhan.",
    icon: HeartPulse,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-terracotta/20 to-terracotta-soft/10",
    hover: "group-hover:bg-terracotta/10",
  },
  {
    title: "Medical Check Up",
    desc: "Paket MCU premium dengan laporan digital instan.",
    icon: Microscope,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-sage-light/25 to-cream",
    hover: "group-hover:bg-sage-light/20",
  },
  {
    title: "Kesehatan Ibu & Anak",
    desc: "Perawatan lembut dari kehamilan hingga tumbuh kembang.",
    icon: Baby,
    span: "col-span-1 row-span-1",
    accent: "from-terracotta-soft/30 to-cream",
    hover: "group-hover:bg-terracotta-soft/25",
  },
  {
    title: "Vaksinasi",
    desc: "Imunisasi lengkap dengan standar internasional.",
    icon: Syringe,
    span: "col-span-1 row-span-1",
    accent: "from-sage/15 to-cream",
    hover: "group-hover:bg-sage/12",
  },
  {
    title: "Fisioterapi",
    desc: "Rehabilitasi modern untuk pemulihan optimal.",
    icon: Activity,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-charcoal/5 to-sage/10",
    hover: "group-hover:bg-charcoal/8",
  },
];

export default function ServicesBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="layanan" className="px-6 py-32 md:px-12 lg:px-20">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              Layanan Kami
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              Perawatan yang
              <br />
              <span className="italic text-sage">menyesuaikan</span> hidup Anda.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-charcoal/55">
            Setiap layanan dirancang dengan presisi medis dan sentuhan hospitality
            kelas boutique.
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => {
            const card = (
              <motion.article
                data-cursor="hover"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className={`group relative h-full overflow-hidden rounded-3xl border border-charcoal/6 bg-gradient-to-br p-8 ${service.accent} ${service.hover} transition-colors duration-500 ${service.href ? "cursor-pointer" : ""}`}
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <service.icon className="h-7 w-7 text-charcoal/40 transition-colors duration-500 group-hover:text-sage" />
                    {service.href && (
                      <ArrowUpRight className="h-5 w-5 text-charcoal/25 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sage" />
                    )}
                  </div>
                  <div className="mt-auto pt-8">
                    <h3 className="font-serif text-2xl font-medium text-charcoal">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/50 transition-colors duration-500 group-hover:text-charcoal/70">
                      {service.desc}
                    </p>
                    {service.href && (
                      <span className="mt-4 inline-block text-xs font-medium tracking-wide text-sage opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        Lihat detail →
                      </span>
                    )}
                  </div>
                </div>

                <motion.div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30 blur-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.article>
            );

            if (service.href) {
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className={`${service.span} block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
                >
                  {card}
                </Link>
              );
            }

            return (
              <div key={service.title} className={service.span}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
