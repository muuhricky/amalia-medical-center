"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Syringe,
  Activity,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import CardEnterOverlay from "@/components/CardEnterOverlay";
import { serviceCardRoutes } from "@/lib/services";

const services = [
  {
    id: "poli-umum",
    title: "Poli Umum",
    desc: "Pemeriksaan menyeluruh dengan dokter berpengalaman.",
    detail:
      "Konsultasi awal yang tenang dan teliti — keluhan didengar, pemeriksaan nyaman, lalu rencana perawatan dijelaskan dengan bahasa yang mudah dipahami.",
    icon: Stethoscope,
    span: "col-span-1",
    wide: false,
    accent: "from-sage/20 to-sage/5",
    backAccent: "from-sage/30 via-sage/15 to-cream",
  },
  {
    id: "spesialis",
    title: "Dokter Spesialis",
    desc: "Jaringan spesialis terpercaya untuk setiap kebutuhan.",
    detail:
      "Akses dokter spesialis yang relevan dengan kondisi Anda. Kami bantu arahkan rujukan tepat agar penanganan lebih cepat dan terarah.",
    icon: HeartPulse,
    span: "col-span-1 md:col-span-2",
    wide: true,
    accent: "from-terracotta/20 to-terracotta-soft/10",
    backAccent: "from-terracotta/25 via-terracotta-soft/20 to-cream",
  },
  {
    id: "mcu",
    title: "Medical Check Up",
    desc: "Paket MCU premium dengan laporan digital instan.",
    detail:
      "Pemeriksaan kesehatan kerja dan umum dengan alur rapi — dari pengambilan sampel hingga hasil yang mudah dibaca.",
    icon: Microscope,
    span: "col-span-1 md:col-span-2",
    wide: true,
    accent: "from-sage-light/25 to-cream",
    backAccent: "from-sage-light/35 via-sage/10 to-cream",
  },
  {
    id: "penunjang",
    title: "Pemeriksaan Penunjang",
    desc: "Fasilitas diagnostik lengkap di dalam klinik.",
    detail:
      "Klinik dilengkapi alat penunjang seperti rontgen, USG, treadmill, laboratorium, dan peralatan pendukung lainnya — hasil lebih cepat tanpa perlu berpindah tempat.",
    icon: Microscope,
    span: "col-span-1",
    wide: false,
    accent: "from-charcoal/5 to-sage/10",
    backAccent: "from-charcoal/8 via-sage/15 to-cream",
  },
  {
    id: "vaksinasi",
    title: "Vaksinasi",
    desc: "Imunisasi lengkap dengan standar internasional.",
    detail:
      "Imunisasi dewasa dan kebutuhan perjalanan/pekerjaan, dengan prosedur sesuai standar keamanan vaksin.",
    icon: Syringe,
    span: "col-span-1",
    wide: false,
    accent: "from-sage/15 to-cream",
    backAccent: "from-sage/25 via-sage-mist to-cream",
  },
  {
    id: "hiperkes",
    title: "Pemeriksaan Kesehatan Tenaga Kerja",
    desc: "MCU & Hiperkes untuk kebutuhan perusahaan dan pekerja.",
    detail:
      "Pemeriksaan kesehatan kerja sesuai standar — cocok untuk pre-employment, periodic check, dan persyaratan perusahaan maupun penempatan kerja.",
    icon: Activity,
    span: "col-span-1 md:col-span-2",
    wide: true,
    accent: "from-terracotta-soft/30 to-cream",
    backAccent: "from-terracotta-soft/40 via-peach to-cream",
  },
];

export default function ServicesBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [enter, setEnter] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const flip = (id: string) => {
    if (enter) return;
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const goFurther = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const route = serviceCardRoutes[id];
    if (!route || enter) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setEnter({
      id,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    window.setTimeout(() => {
      router.push(route.href);
    }, 480);
  };

  const activeRoute = enter ? serviceCardRoutes[enter.id] : null;

  return (
    <section id="layanan" className="px-6 py-32 md:px-12 lg:px-20">
      <CardEnterOverlay
        active={!!enter}
        accentFrom={activeRoute?.accentFrom || "rgba(63,154,90,0.3)"}
        accentTo={activeRoute?.accentTo || "rgba(247,245,240,1)"}
        origin={enter ? { x: enter.x, y: enter.y } : null}
      />

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
            Ketuk kartu untuk melihat ringkasan layanan, lalu lanjut ke detail
            jika Anda ingin tahu lebih banyak.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => {
            const isFlipped = flippedId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${service.span} [perspective:1400px]`}
              >
                <div
                  data-cursor="hover"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                  aria-label={`${service.title}. ${isFlipped ? "Kembali ke depan" : "Balik kartu untuk detail"}`}
                  onClick={() => flip(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      flip(service.id);
                    }
                  }}
                  className="group relative h-[320px] w-full cursor-pointer sm:h-[300px] md:h-[280px] lg:h-[300px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative h-full w-full transition-transform duration-[820ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
                    }}
                  >
                    <article
                      className={`absolute inset-0 flex flex-col justify-between rounded-3xl border border-charcoal/6 bg-gradient-to-br p-6 sm:p-7 ${service.accent}`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <service.icon className="h-7 w-7 text-charcoal/40 transition-colors duration-500 group-hover:text-sage" />
                        <ArrowUpRight className="h-5 w-5 text-charcoal/20" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-medium text-charcoal sm:text-2xl">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal/50">
                          {service.desc}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-charcoal/35">
                          Ketuk untuk membalik
                        </p>
                      </div>
                    </article>

                    <article
                      className={`absolute inset-0 flex flex-col rounded-3xl border border-charcoal/8 bg-gradient-to-br ${service.backAccent} ${
                        service.wide
                          ? "px-7 py-6 sm:px-10 sm:py-7"
                          : "px-5 py-5 sm:px-6 sm:py-6"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg)",
                      }}
                    >
                      <div className="flex shrink-0 items-start justify-between gap-2">
                        <p className="font-serif text-base leading-tight text-charcoal sm:text-lg">
                          {service.title}
                        </p>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-charcoal/10 bg-cream/70 px-2 py-1 text-[10px] text-charcoal/45">
                          <RotateCcw className="h-3 w-3" />
                          Balik
                        </span>
                      </div>

                      <div
                        className={`flex min-h-0 flex-1 flex-col justify-center ${
                          service.wide
                            ? "items-start py-3 text-left md:max-w-xl"
                            : "items-center py-2 text-center"
                        }`}
                      >
                        <p
                          className={`leading-relaxed text-charcoal/65 ${
                            service.wide
                              ? "text-sm sm:text-[15px]"
                              : "text-[13px] sm:text-sm"
                          }`}
                        >
                          {service.detail}
                        </p>
                      </div>

                      <div
                        className={`shrink-0 pt-1 ${
                          service.wide ? "flex justify-start" : "flex justify-center"
                        }`}
                      >
                        <button
                          type="button"
                          data-cursor="hover"
                          onClick={(e) => goFurther(service.id, e)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-sage/30 bg-cream/95 px-4 py-2 text-xs font-medium text-sage shadow-sm transition hover:border-sage/50 hover:bg-cream sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                        >
                          Klik untuk lebih lanjut
                          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
