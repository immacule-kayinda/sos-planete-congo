"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const directions = {
    up: { initial: { y: 50 }, animate: { y: 0 } },
    down: { initial: { y: -50 }, animate: { y: 0 } },
    left: { initial: { x: 50 }, animate: { x: 0 } },
    right: { initial: { x: -50 }, animate: { x: 0 } },
  };

  return (
    <motion.div
      initial={{ ...directions[direction].initial, opacity: 0 }}
      whileInView={{ ...directions[direction].animate, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
