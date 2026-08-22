"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Baby,
  Syringe,
  Activity,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

const services = [
  {
    id: "poli-umum",
    title: "Poli Umum",
    desc: "Pemeriksaan menyeluruh dengan dokter berpengalaman.",
    detail:
      "Konsultasi awal yang tenang dan teliti — keluhan didengar, pemeriksaan dilakukan dengan nyaman, lalu rencana perawatan dijelaskan dengan bahasa yang mudah dipahami.",
    icon: Stethoscope,
    span: "col-span-1 row-span-1",
    accent: "from-sage/20 to-sage/5",
    backAccent: "from-sage/30 via-sage/15 to-cream",
    href: "/layanan/poli-umum",
  },
  {
    id: "spesialis",
    title: "Dokter Spesialis",
    desc: "Jaringan spesialis terpercaya untuk setiap kebutuhan.",
    detail:
      "Akses ke dokter spesialis yang relevan dengan kondisi Anda. Kami bantu arahkan rujukan yang tepat agar penanganan lebih cepat dan terarah.",
    icon: HeartPulse,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-terracotta/20 to-terracotta-soft/10",
    backAccent: "from-terracotta/25 via-terracotta-soft/20 to-cream",
    href: "/#kontak",
  },
  {
    id: "mcu",
    title: "Medical Check Up",
    desc: "Paket MCU premium dengan laporan digital instan.",
    detail:
      "Paket pemeriksaan kesehatan kerja dan umum dengan alur yang rapi — dari pengambilan sampel hingga hasil yang mudah dibaca untuk keputusan medis berikutnya.",
    icon: Microscope,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-sage-light/25 to-cream",
    backAccent: "from-sage-light/35 via-sage/10 to-cream",
    href: "/#kontak",
  },
  {
    id: "ibu-anak",
    title: "Kesehatan Ibu & Anak",
    desc: "Perawatan lembut dari kehamilan hingga tumbuh kembang.",
    detail:
      "Pendampingan untuk ibu dan anak dengan pendekatan hangat — pemantauan tumbuh kembang, imunisasi, dan edukasi kesehatan keluarga.",
    icon: Baby,
    span: "col-span-1 row-span-1",
    accent: "from-terracotta-soft/30 to-cream",
    backAccent: "from-terracotta-soft/40 via-peach to-cream",
    href: "/#kontak",
  },
  {
    id: "vaksinasi",
    title: "Vaksinasi",
    desc: "Imunisasi lengkap dengan standar internasional.",
    detail:
      "Layanan imunisasi untuk dewasa dan kebutuhan khusus perjalanan atau pekerjaan. Stok dan prosedur mengikuti standar keamanan vaksin yang berlaku.",
    icon: Syringe,
    span: "col-span-1 row-span-1",
    accent: "from-sage/15 to-cream",
    backAccent: "from-sage/25 via-sage-mist to-cream",
    href: "/#kontak",
  },
  {
    id: "fisioterapi",
    title: "Fisioterapi",
    desc: "Rehabilitasi modern untuk pemulihan optimal.",
    detail:
      "Program rehabilitasi untuk pemulihan gerak dan mengurangi nyeri — disusun sesuai kondisi Anda agar kembali aktif dengan aman.",
    icon: Activity,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: "from-charcoal/5 to-sage/10",
    backAccent: "from-charcoal/8 via-sage/15 to-cream",
    href: "/#kontak",
  },
];

export default function ServicesBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const flip = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const goFurther = (href: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(href);
  };

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
            Ketuk kartu untuk melihat ringkasan layanan, lalu lanjut ke detail
            jika Anda ingin tahu lebih banyak.
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
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
                  className="group relative h-full min-h-[200px] w-full cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative h-full w-full transition-transform duration-[820ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
                    }}
                  >
                    {/* FRONT */}
                    <article
                      className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-charcoal/6 bg-gradient-to-br p-8 ${service.accent}`}
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <div className="flex items-start justify-between">
                        <service.icon className="h-7 w-7 text-charcoal/40 transition-colors duration-500 group-hover:text-sage" />
                        <ArrowUpRight className="h-5 w-5 text-charcoal/20" />
                      </div>
                      <div className="mt-auto pt-8">
                        <h3 className="font-serif text-2xl font-medium text-charcoal">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal/50">
                          {service.desc}
                        </p>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-charcoal/35">
                          Ketuk untuk membalik
                        </p>
                      </div>
                    </article>

                    {/* BACK */}
                    <article
                      className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-charcoal/8 bg-gradient-to-br p-7 md:p-8 ${service.backAccent}`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-serif text-lg text-charcoal md:text-xl">
                          {service.title}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full border border-charcoal/10 bg-cream/70 px-2 py-1 text-[10px] text-charcoal/45">
                          <RotateCcw className="h-3 w-3" />
                          Balik
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-center px-1 py-4 text-center">
                        <p className="max-w-[22rem] text-sm leading-relaxed text-charcoal/65 md:text-[15px]">
                          {service.detail}
                        </p>

                        <button
                          type="button"
                          data-cursor="hover"
                          onClick={(e) => goFurther(service.href, e)}
                          className="mt-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-cream/90 px-5 py-2.5 text-sm font-medium text-sage shadow-sm transition hover:border-sage/50 hover:bg-cream"
                        >
                          Klik di sini untuk lebih lanjut
                          <ArrowUpRight className="h-4 w-4" />
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
