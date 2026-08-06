"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { defaultContent } from "@/lib/content-defaults";

const links = [
  { label: "Beranda", href: "/", match: "home" },
  { label: "Layanan", href: "/#layanan", match: "layanan" },
  { label: "Pengalaman", href: "/#pengalaman", match: "pengalaman" },
  { label: "Poli Umum", href: "/layanan/poli-umum", match: "poli" },
  { label: "Kontak", href: "/#kontak", match: "kontak" },
];

interface FloatingNavProps {
  whatsapp?: string;
}

export default function FloatingNav({
  whatsapp = defaultContent.site.whatsapp,
}: FloatingNavProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Halo Amalia Medical Center, saya ingin membuat janji"
  )}`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setVisible(true);
      } else if (y > lastY + 8) {
        setVisible(false);
        setMobileOpen(false);
      } else if (y < lastY - 8) {
        setVisible(true);
      }
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash.replace("#", ""));
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sections = ["layanan", "pengalaman", "kontak"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHash(id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const isActive = (link: (typeof links)[number]) => {
    if (link.match === "home") {
      return pathname === "/" && !activeHash;
    }
    if (link.match === "poli") {
      return pathname.startsWith("/layanan/poli-umum");
    }
    return activeHash === link.match;
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Navigasi utama"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4 md:bottom-7"
          >
            <div className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-cream/10 bg-charcoal/92 p-1.5 shadow-[0_20px_60px_rgba(26,26,26,0.35)] backdrop-blur-xl md:gap-0 md:p-2">
              <Link
                href="/"
                data-cursor="hover"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-charcoal transition hover:bg-sage-light md:h-11 md:w-11"
                aria-label="Amalia Medical Center"
              >
                <span className="font-serif text-lg font-medium leading-none">
                  A
                </span>
              </Link>

              <ul className="hidden items-center px-1 md:flex">
                {links.map((link, i) => (
                  <li key={link.href} className="flex items-center">
                    {i > 0 && (
                      <span className="mx-0.5 h-4 w-px bg-cream/15" aria-hidden />
                    )}
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className={`relative rounded-full px-3.5 py-2 text-[13px] tracking-wide transition-colors lg:px-4 ${
                        isActive(link)
                          ? "text-cream"
                          : "text-cream/55 hover:text-cream"
                      }`}
                    >
                      {link.label}
                      {isActive(link) && (
                        <motion.span
                          layoutId="floating-nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-sage"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group ml-0.5 hidden items-center gap-1.5 rounded-full bg-cream px-4 py-2.5 text-[13px] font-medium text-charcoal transition hover:bg-sage-light md:inline-flex"
              >
                Buat Janji
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full text-cream md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed inset-x-4 bottom-20 z-[60] overflow-hidden rounded-3xl border border-cream/10 bg-charcoal/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm transition ${
                      isActive(link)
                        ? "bg-cream/10 text-cream"
                        : "text-cream/65 hover:bg-cream/5 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-cream px-4 py-3 text-sm font-medium text-charcoal"
            >
              Buat Janji
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
