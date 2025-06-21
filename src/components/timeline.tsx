"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { TimelineProps } from "@/types/timeline";
import { TimelineItemComponent } from "./timeline-item";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Timeline({ items, className }: TimelineProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={cn("relative", className)}
      role="region"
      aria-label="Timeline"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Central line */}
      <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-px bg-primary/20" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-1/2 top-[8%] bottom-[8%] transform -translate-x-1/2 w-px origin-top"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, hsl(var(--primary)) 15%, hsl(var(--primary)) 85%, transparent 100%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-8 py-16">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={`${item.year}-${index}`}
            {...item}
            index={index}
            isDesktop={isDesktop}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
}
