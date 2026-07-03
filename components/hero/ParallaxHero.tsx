"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_WATER } from "@/components/ui/motion";
import { RESUME_PATH } from "@/lib/site";

const layers = [
    { src: "/parallax/1.png", speed: 0.04, zIndex: 1, isBackground: true },
    { src: "/parallax/2.png", speed: 0.15, zIndex: 2 },
    { src: "/parallax/3.png", speed: 0.28, zIndex: 3 },
    { src: "/parallax/4.png", speed: 0.38, zIndex: 4, riseUp: true },
    { src: "/parallax/5.png", speed: 0.62, zIndex: 5 },
];

function ParallaxLayer({
    src, zIndex, speed, isBackground, riseUp, scrollYProgress,
}: {
    src: string; zIndex: number; speed: number;
    isBackground?: boolean; riseUp?: boolean;
    scrollYProgress: MotionValue<number>;
}) {
    const yEnd = riseUp ? `-${speed * 55}%` : `${speed * 55}%`;
    const y = useTransform(scrollYProgress, [0, 1], ["0%", yEnd]);

    return (
        <motion.div
            style={{ y, zIndex, willChange: "transform" }}
            className={isBackground
                ? "absolute inset-0 pointer-events-none"
                : "absolute inset-x-0 bottom-0 pointer-events-none"}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src} alt="" draggable={false}
                fetchPriority={zIndex <= 2 ? "high" : "auto"}
                className={isBackground
                    ? "w-full h-full object-cover object-center select-none"
                    : "w-full select-none"}
                style={{ display: "block" }}
            />
        </motion.div>
    );
}

export default function ParallaxHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Content sinks slower than the page and fades — part of the parallax scene
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative h-screen min-h-[640px] overflow-hidden flex items-center justify-center"
        >
            {/* Parallax layers */}
            {layers.map((layer) => (
                <ParallaxLayer
                    key={layer.src}
                    src={layer.src}
                    zIndex={layer.zIndex}
                    speed={layer.speed}
                    isBackground={layer.isBackground}
                    riseUp={layer.riseUp}
                    scrollYProgress={scrollYProgress}
                />
            ))}

            {/* Depth overlay — fades the scene into the deep */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[var(--ocean-deep)]"
                style={{ zIndex: 6 }}
            />

            {/* Caustic depth lighting */}
            <div className="caustic-light absolute inset-0 pointer-events-none" style={{ zIndex: 7 }} />

            {/* Hero content — drifts and fades with the scene */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity, zIndex: 8 }}
                className="relative flex flex-col items-center text-center px-6 max-w-4xl"
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE_WATER }}
                    className="mb-4 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--glow-amber)] font-[var(--font-inter)]"
                >
                    Full-Stack Engineer · Tech Speaker
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE_WATER }}
                    className="font-[var(--font-space-grotesk)] font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-5 drop-shadow-md"
                >
                    Rhandie Sales
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE_WATER }}
                    className="max-w-xl text-base sm:text-lg text-[var(--mist-300)] mb-8 font-[var(--font-inter)]"
                >
                    I build AI-powered, cloud-native products on Azure and Next.js —
                    two-time hackathon champion from the Philippines.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: EASE_WATER }}
                    className="flex flex-col sm:flex-row gap-3 items-center"
                >
                    <a
                        href="#projects"
                        className="rounded-full px-7 py-3 font-semibold text-sm text-[var(--ocean-deep)] bg-[var(--glow-amber)] hover:bg-[var(--glow-amber-deep)] transition-colors duration-200 font-[var(--font-inter)]"
                    >
                        View Projects
                    </a>
                    <a
                        href={RESUME_PATH}
                        download
                        className="rounded-full px-7 py-3 font-semibold text-sm text-white border border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors duration-200 font-[var(--font-inter)]"
                    >
                        Download Résumé
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.a
                href="#about"
                aria-label="Scroll to About section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.4, ease: EASE_WATER }}
                style={{ zIndex: 8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--mist-300)] hover:text-[var(--glow-amber)] transition-colors"
            >
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase font-[var(--font-inter)]">Dive in</span>
                <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} />
                </motion.span>
            </motion.a>
        </section>
    );
}
