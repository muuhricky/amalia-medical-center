"use client";

import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { defaultContent } from "@/lib/content-defaults";

interface NavbarProps {
  whatsapp?: string;
}

export default function Navbar({
  whatsapp = defaultContent.site.whatsapp,
}: NavbarProps) {
  const wa = `https://wa.me/${whatsapp}`;

  return (
    <motion.header
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-5 py-4 md:px-12 lg:px-20"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="/"
          data-cursor="hover"
          className="group relative rounded-xl px-1 py-1 transition"
          aria-label="Amalia Medical Center — Beranda"
        >
          <span className="absolute inset-0 -z-10 rounded-xl bg-cream/70 opacity-0 blur-sm transition group-hover:opacity-100" />
          <BrandLogo variant="full" priority />
        </a>

        <a
          href={wa}
          data-cursor="hover"
          className="shrink-0 rounded-full border border-sage/20 bg-cream/80 px-4 py-2 text-xs font-medium tracking-wide text-charcoal backdrop-blur-md transition-all hover:border-terracotta/40 hover:bg-peach md:px-5 md:py-2.5"
        >
          Konsultasi
        </a>
      </nav>
    </motion.header>
  );
}
