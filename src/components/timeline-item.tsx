"use client";

import { motion, easeOut, backOut } from "framer-motion";
import { TimelineItem } from "@/types/timeline";
import { cn } from "@/lib/utils";

interface TimelineItemProps extends TimelineItem {
  index: number;
  isDesktop: boolean;
  isLast: boolean;
}

export function TimelineItemComponent({
  year,
  title,
  description,
  index,
  isDesktop,
  isLast,
}: TimelineItemProps) {
  const isEven = index % 2 !== 0;

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isDesktop ? (isEven ? -50 : 50) : 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: backOut,
      },
    },
  };

  if (!isDesktop) {
    return (
      <motion.div
        className="relative flex flex-row items-center gap-8 "
        variants={itemVariants}
        role="listitem"
      >
        <motion.div variants={dotVariants} className="relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-background border-2 border-primary" />
            <div className="absolute w-3 h-3 rounded-full bg-primary" />
            <div className="absolute w-12 h-12 rounded-full border-2 border-primary/20" />
          </div>
        </motion.div>
        <div className="w-full">
          <div
            className={cn(
              "p-8 bg-card rounded-xl",
              "border border-border/50",
              "transition-all duration-300",
              "hover:shadow-[0_0_25px_-5px] hover:shadow-primary/10",
              "hover:border-primary/50",
              "group-hover:bg-card/80"
            )}
          >
            <div className="space-y-4">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium 
                  bg-primary/10 text-primary backdrop-blur-sm
                  transition-colors duration-300 group-hover:bg-primary/20"
              >
                {year}
              </span>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {!isLast && (
            <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-px bg-border/50 top-full" />
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left content */}
      <motion.div
        className={cn(
          "group cursor-default w-[45%]",
          isEven ? "block" : "md:text-right"
        )}
        variants={itemVariants}
        role="listitem"
      >
        {!isEven && (
          <div
            className={cn(
              "p-8 bg-card rounded-xl",
              "border border-border/50",
              "transition-all duration-300",
              "hover:shadow-[0_0_25px_-5px] hover:shadow-primary/10",
              "hover:border-primary/50",
              "group-hover:bg-card/80"
            )}
          >
            <div className="space-y-4">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium 
                  bg-primary/10 text-primary backdrop-blur-sm
                  transition-colors duration-300 group-hover:bg-primary/20"
              >
                {year}
              </span>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        variants={dotVariants}
        className="relative z-10 flex items-center justify-center w-[10%]"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-background border-2 border-primary" />
          <div className="absolute w-3 h-3 rounded-full bg-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-12 h-12 rounded-full border-2 border-primary/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      {/* Right content */}
      <motion.div
        className="group cursor-default w-[45%]"
        variants={itemVariants}
        role="listitem"
      >
        {isEven && (
          <div
            className={cn(
              "p-8 bg-card rounded-xl",
              "border border-border/50",
              "transition-all duration-300",
              "hover:shadow-[0_0_25px_-5px] hover:shadow-primary/10",
              "hover:border-primary/50",
              "group-hover:bg-card/80"
            )}
          >
            <div className="space-y-4">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium 
                  bg-primary/10 text-primary backdrop-blur-sm
                  transition-colors duration-300 group-hover:bg-primary/20"
              >
                {year}
              </span>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
