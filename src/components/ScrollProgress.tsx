"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="brass fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
