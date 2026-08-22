"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";
import BrandLogo from "@/components/BrandLogo";
import type { SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/content-defaults";

interface CTAFooterProps {
  site?: SiteContent["site"];
}

export default function CTAFooter({
  site = defaultContent.site,
}: CTAFooterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Halo Amalia Medical Center, saya ingin membuat janji temu"
  )}`;

  return (
    <footer id="kontak">
      <motion.section
        ref={ref}
        className="relative mx-6 mb-6 overflow-hidden rounded-[2rem] bg-charcoal px-8 py-24 md:mx-12 md:px-16 md:py-32 lg:mx-20"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(63,154,90,0.32) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(224,138,60,0.22) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            className="text-xs font-medium uppercase tracking-[0.3em] text-sage-light/70"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Mulai Perjalanan Kesehatan Anda
          </motion.span>

          <motion.h2
            className="mt-6 font-serif text-4xl font-medium leading-tight text-cream md:text-5xl lg:text-6xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Siap merasakan perbedaan{" "}
            <span className="italic text-terracotta-soft">Amalia</span>?
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/50 md:text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Hubungi kami via WhatsApp untuk konsultasi gratis dan penjadwalan
            kunjungan yang fleksibel.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <MagneticButton href={wa} variant="dark">
              <MessageCircle className="h-4 w-4" />
              Chat via WhatsApp
            </MagneticButton>
          </motion.div>
        </div>
      </motion.section>

      <div className="border-t border-charcoal/8 px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/" data-cursor="hover" className="inline-block">
              <BrandLogo variant="framed" className="h-16 sm:h-[4.5rem]" />
            </a>
            <p className="mt-3 text-sm text-charcoal/40">
              © {new Date().getFullYear()} · Klinik Utama Amalia Medical Center
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-charcoal/50 md:items-end">
            <a
              href="/#akreditasi"
              data-cursor="hover"
              className="text-xs tracking-wide text-sage transition hover:text-charcoal"
            >
              Lihat akreditasi & mitra →
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sage" />
              {site.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-sage" />
              {site.phone}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
