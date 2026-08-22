"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline" | "dark";
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary:
      "bg-charcoal text-cream glow-sage hover:bg-charcoal/90 border border-charcoal/10",
    outline:
      "bg-transparent text-charcoal border border-charcoal/20 hover:border-sage/50 hover:bg-sage/5",
    dark: "bg-cream text-charcoal glow-terracotta hover:bg-white border border-cream/20",
  };

  const motionProps = {
    "data-cursor": "hover" as const,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 350, damping: 15, mass: 0.5 },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    className: `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500 ${variants[variant]} ${className}`,
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(63,154,90,0.18) 0%, transparent 70%)",
        }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
