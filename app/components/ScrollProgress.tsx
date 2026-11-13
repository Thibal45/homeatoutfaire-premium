"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[999] h-[2px] origin-left bg-[#D9AD50]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
