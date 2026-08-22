"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Clinical vital cursor:
 * - Dual sage rings with heartbeat motion
 * - ECG appears only on content blocks / interactive / popups
 */
export default function CustomCursor() {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const track = { damping: 38, stiffness: 900, mass: 0.18 };
  const x = useSpring(cursorX, track);
  const y = useSpring(cursorY, track);

  const trail = { damping: 32, stiffness: 420, mass: 0.35 };
  const trailX = useSpring(cursorX, trail);
  const trailY = useSpring(cursorY, trail);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touch);
    if (touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // ECG only on content blocks, links, buttons, and popups
      const interactive = target.closest(
        [
          "a",
          "button",
          "[data-cursor='hover']",
          "[data-cursor='ekg']",
          "article",
          "[role='dialog']",
          "[role='menu']",
          "[role='listbox']",
          "input",
          "textarea",
          "select",
          "label",
        ].join(", ")
      );
      setIsHovering(!!interactive);
    };

    const down = () => setIsPressed(true);
    const up = () => setIsPressed(false);
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY, isAdmin]);

  if (isAdmin || isTouchDevice) return null;

  return (
    <>
      {/* Bolder outer ring — heartbeat expansion */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? (isHovering ? 0.7 : 0.45) : 0,
          scale: isPressed
            ? 0.9
            : isHovering
              ? [1.2, 1.55, 1.2]
              : [1.05, 1.35, 1.05],
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: {
            duration: isHovering ? 1.05 : 1.35,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div
          className="h-10 w-10 rounded-full"
          style={{
            border: "2px solid rgba(63, 154, 90, 0.65)",
            boxShadow: "0 0 22px rgba(63, 154, 90, 0.22)",
          }}
        />
      </motion.div>

      {/* Inner ring — always; ECG (brand orange) only on content / popup hover */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.88 : isHovering ? [1.05, 1.2, 1.05] : [1, 1.12, 1],
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: {
            duration: isHovering ? 1.05 : 1.35,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="relative flex h-9 w-9 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(63, 154, 90, 0.85)",
              boxShadow: "0 0 16px rgba(63, 154, 90, 0.22)",
            }}
          />
          <motion.svg
            className="relative h-3.5 w-7"
            viewBox="0 0 32 16"
            fill="none"
            aria-hidden
            initial={false}
            animate={{
              opacity: isHovering ? 0.95 : 0,
              scale: isHovering ? 1 : 0.85,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.path
              d="M1 8 H8 L10 8 L12 3 L14 13 L16 8 H31"
              stroke="rgba(224, 138, 60, 0.95)"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={
                isHovering
                  ? { pathLength: 1, opacity: [0, 1, 1, 0] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={
                isHovering
                  ? {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.15 }
              }
            />
          </motion.svg>
        </div>
      </motion.div>
    </>
  );
}
