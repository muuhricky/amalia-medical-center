"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Lightweight “enter the card” transition overlay.
 * Uses one fixed layer + CSS transform — no heavy animation libs.
 */
export default function CardEnterOverlay({
  active,
  accentFrom,
  accentTo,
  origin,
}: {
  active: boolean;
  accentFrom: string;
  accentTo: string;
  origin: { x: number; y: number } | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !active || !origin) return null;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <div
        className="absolute h-24 w-24 rounded-full will-change-transform"
        style={{
          left: origin.x,
          top: origin.y,
          marginLeft: "-3rem",
          marginTop: "-3rem",
          background: `radial-gradient(circle at center, ${accentFrom} 0%, ${accentTo} 70%)`,
          animation: "amc-card-enter 520ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      />
      <style>{`
        @keyframes amc-card-enter {
          0% {
            transform: scale(0.35);
            opacity: 0.55;
          }
          55% {
            opacity: 1;
          }
          100% {
            transform: scale(28);
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
