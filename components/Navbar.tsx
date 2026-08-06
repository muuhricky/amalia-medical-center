"use client";

import { motion } from "framer-motion";
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
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 lg:px-20"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="/"
          data-cursor="hover"
          className="group flex flex-col leading-none"
        >
          <span className="font-serif text-xl font-medium tracking-tight text-charcoal md:text-2xl">
            Amalia
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-charcoal/40 transition-colors group-hover:text-sage">
            Medical Center
          </span>
        </a>

        <a
          href={wa}
          data-cursor="hover"
          className="rounded-full border border-charcoal/10 bg-cream/70 px-4 py-2 text-xs font-medium tracking-wide text-charcoal backdrop-blur-md transition-all hover:border-sage/30 hover:bg-sage/10 md:px-5 md:py-2.5"
        >
          Konsultasi
        </a>
      </nav>
    </motion.header>
  );
}
