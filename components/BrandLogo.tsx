"use client";

import Image from "next/image";

type BrandLogoVariant = "full" | "framed" | "mark" | "horizontal";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
};

const variants: Record<
  BrandLogoVariant,
  { src: string; alt: string; width: number; height: number; baseClass: string }
> = {
  /** Logo resmi berbingkai — footer / dokumen resmi */
  framed: {
    src: "/brand/amc-full-framed.png",
    alt: "Klinik Utama Amalia Medical Center",
    width: 360,
    height: 200,
    baseClass: "h-14 w-auto object-contain sm:h-16",
  },
  /** Horizontal AMC | nama — navbar utama */
  full: {
    src: "/brand/amc-horizontal.png",
    alt: "Amalia Medical Center",
    width: 360,
    height: 100,
    baseClass: "h-9 w-auto object-contain object-left sm:h-10 md:h-11",
  },
  /** Versi horizontal alternatif (bg gelap dihapus) */
  horizontal: {
    src: "/brand/logo-amc.png",
    alt: "Amalia Medical Center",
    width: 360,
    height: 100,
    baseClass: "h-9 w-auto object-contain object-left sm:h-10 md:h-11",
  },
  /** Mark AMC + EKG — floating nav / favicon-style */
  mark: {
    src: "/brand/amc-mark.png",
    alt: "AMC",
    width: 160,
    height: 80,
    baseClass: "h-6 w-auto object-contain md:h-7",
  },
};

export default function BrandLogo({
  variant = "full",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const cfg = variants[variant];

  return (
    <Image
      src={cfg.src}
      alt={cfg.alt}
      width={cfg.width}
      height={cfg.height}
      priority={priority}
      className={`${cfg.baseClass} ${className}`}
    />
  );
}
