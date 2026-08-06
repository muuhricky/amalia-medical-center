"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.6 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const ringX = useSpring(cursorX, { damping: 22, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 180, mass: 0.8 });

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touch);
    if (touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], input, textarea, select"
      );
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY, isVisible, isAdmin]);

  if (isAdmin || isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2.2 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div
          className="h-10 w-10 rounded-full border border-sage/40"
          style={{
            boxShadow: isHovering
              ? "0 0 30px rgba(138, 154, 123, 0.4)"
              : "0 0 15px rgba(138, 154, 123, 0.15)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.4 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        <div
          className="h-2.5 w-2.5 rounded-full bg-charcoal"
          style={{
            boxShadow: "0 0 12px rgba(26, 26, 26, 0.3)",
          }}
        />
      </motion.div>
    </>
  );
}
