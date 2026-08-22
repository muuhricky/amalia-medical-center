"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Microscope,
  Syringe,
  Activity,
  Building2,
  UserRound,
  ClipboardList,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import MagneticButton from "@/components/MagneticButton";
import CTAFooter from "@/components/CTAFooter";
import type { SiteContent } from "@/lib/types";
import type { ServiceIconName, ServicePageContent } from "@/lib/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  microscope: Microscope,
  syringe: Syringe,
  activity: Activity,
  building: Building2,
  user: UserRound,
  clipboard: ClipboardList,
  shield: ShieldCheck,
};

export default function ServiceDetailPage({
  service,
  site,
}: {
  service: ServicePageContent;
  site: SiteContent["site"];
}) {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    service.waMessage
  )}`;

  return (
    <main className="relative pb-24">
      <Navbar whatsapp={site.whatsapp} />
      <FloatingNav whatsapp={site.whatsapp} />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
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
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
                {service.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-charcoal md:text-6xl lg:text-7xl">
                {service.headline}
                <br />
                <span className="italic text-sage">{service.headlineItalic}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/55 md:text-lg">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton href={wa}>Konsultasi Sekarang</MagneticButton>
                <div className="flex items-center gap-2 text-sm text-charcoal/45">
                  <Clock className="h-4 w-4 text-sage" />
                  {service.hours}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`relative min-h-[260px] overflow-hidden rounded-[2rem] border border-charcoal/6 bg-gradient-to-br p-8 md:min-h-[320px] ${service.accent}`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between md:min-h-[280px]">
                <Stethoscope className="h-9 w-9 text-charcoal/30" />
                <div>
                  <p className="font-serif text-3xl font-medium text-charcoal">
                    {service.title}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/50">
                    {service.heroNote}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              Keunggulan
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-5xl">
              Dirancang agar prosesnya{" "}
              <span className="italic text-sage">jelas</span> dan nyaman.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.highlights.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.article
                  key={item.title}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="rounded-3xl border border-charcoal/6 bg-gradient-to-br from-sage/10 to-cream p-7"
                >
                  <Icon className="h-6 w-6 text-sage" />
                  <h3 className="mt-6 font-serif text-xl text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/50">
                    {item.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-2xl"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sage">
              {service.sectionEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-4xl">
              {service.sectionTitle}{" "}
              <span className="italic text-sage">{service.sectionTitleItalic}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/55">
              {service.sectionIntro}
            </p>
          </motion.div>

          {service.sectionKind === "people" && service.people && (
            <div className="grid gap-5 md:grid-cols-3">
              {service.people.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i }}
                  className="overflow-hidden rounded-[1.75rem] border border-charcoal/6 bg-cream"
                >
                  <div className="relative aspect-[4/5] bg-sage/10">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-serif text-lg text-cream">{p.name}</p>
                      <p className="mt-1 text-xs text-cream/75">{p.role}</p>
                    </div>
                  </div>
                  <p className="p-5 text-sm leading-relaxed text-charcoal/55">
                    {p.bio}
                  </p>
                </motion.article>
              ))}
            </div>
          )}

          {service.sectionKind === "packages" && service.packages && (
            <div className="grid gap-4 md:grid-cols-3">
              {service.packages.map((pkg, i) => (
                <motion.article
                  key={pkg.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i }}
                  className="rounded-[1.75rem] border border-charcoal/6 bg-gradient-to-br from-white/50 to-cream p-7"
                >
                  <p className="font-serif text-2xl text-charcoal">{pkg.title}</p>
                  <p className="mt-1 text-sm text-sage">{pkg.subtitle}</p>
                  <ul className="mt-6 space-y-3">
                    {pkg.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-charcoal/65"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          )}

          {service.sectionKind === "equipment" && service.equipment && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.equipment.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-2xl border border-charcoal/6 bg-white/45 px-5 py-5"
                >
                  <p className="font-serif text-xl text-charcoal">{item.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
                    {item.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          )}

          {service.sectionKind === "list" && service.listItems && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.listItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i }}
                  className="flex items-start gap-3 rounded-2xl border border-charcoal/6 bg-white/40 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span className="text-sm text-charcoal/70">{item}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="px-6 pb-8 pt-10 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] border border-charcoal/6 bg-charcoal px-8 py-10 md:flex-row md:items-center md:px-12"
        >
          <div>
            <h2 className="font-serif text-2xl font-medium text-cream md:text-3xl">
              {service.ctaTitle}
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/55">{service.ctaDesc}</p>
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
