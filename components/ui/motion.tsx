"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Water-like easing shared across the site's motion system.
 */
export const EASE_WATER = [0.22, 1, 0.36, 1] as const;

/**
 * ParallaxDrift — scroll-linked depth movement. Elements drift vertically
 * at a different rate than the page, echoing the hero's layered parallax.
 * Positive speed drifts against scroll (feels deeper), keep values subtle (12–48).
 */
export function ParallaxDrift({
  children,
  className,
  speed = 24,
}: {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

/**
 * Reveal — content surfaces upward with a fade, like rising through water.
 * The single scroll-reveal primitive used across all sections.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE_WATER }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionHeader — shared heading treatment for every section.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--glow-amber)] mb-3 font-[var(--font-inter)]">
        {eyebrow}
      </p>
      <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl sm:text-4xl text-[var(--mist-100)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[var(--mist-500)] leading-relaxed font-[var(--font-inter)]">
          {description}
        </p>
      )}
    </Reveal>
  );
}
