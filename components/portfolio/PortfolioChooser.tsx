"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Mic, ArrowRight, X, Check } from "lucide-react";
import { EASE_WATER } from "@/components/ui/motion";
import { usePortfolioMode, type PortfolioMode } from "./PortfolioModeContext";

const OPTIONS: {
    mode: PortfolioMode;
    icon: typeof Code2;
    title: string;
    tagline: string;
    includes: string[];
}[] = [
    {
        mode: "technical",
        icon: Code2,
        title: "Technical Portfolio",
        tagline: "Projects, engineering work, and verified credentials.",
        includes: ["Projects", "Certifications & Skill Credentials"],
    },
    {
        mode: "speaker",
        icon: Mic,
        title: "Speaker Portfolio",
        tagline: "Talks, panels, and workshops across the PH dev community.",
        includes: ["Tech Talks & Panels", "Event Galleries"],
    },
];

export default function PortfolioChooser() {
    const { mode, chooserOpen, chooseMode, closeChooser } = usePortfolioMode();
    const dismissible = mode !== null;

    // Escape closes only when dismissible; lock body scroll while open
    useEffect(() => {
        if (!chooserOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeChooser();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [chooserOpen, closeChooser]);

    return (
        <AnimatePresence>
            {chooserOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={dismissible ? closeChooser : undefined}
                    data-lenis-prevent
                    className="caustic-light fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[var(--ocean-abyss)]/95 backdrop-blur-md p-5 sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Choose which portfolio to explore"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-3xl"
                    >
                        {dismissible && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={closeChooser}
                                aria-label="Close"
                                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/80 text-[var(--mist-300)] transition-colors hover:text-[var(--mist-100)] cursor-pointer"
                            >
                                <X size={17} />
                            </motion.button>
                        )}

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE_WATER }}
                            className="mb-9 text-center"
                        >
                            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--glow-amber)] font-[var(--font-inter)]">
                                Welcome
                            </span>
                            <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-[var(--mist-100)] sm:text-4xl">
                                Which side of my work
                                <br className="hidden sm:block" />{" "}
                                would you like to <span className="text-[var(--glow-amber)]">dive into</span>?
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--mist-500)] font-[var(--font-inter)]">
                                You can switch anytime with the floating toggle.
                            </p>
                        </motion.div>

                        {/* Option cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {OPTIONS.map((opt, i) => {
                                const active = mode === opt.mode;
                                return (
                                    <motion.button
                                        key={opt.mode}
                                        initial={{ opacity: 0, y: 32 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE_WATER }}
                                        whileHover={{ y: -6 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => chooseMode(opt.mode)}
                                        className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-colors duration-300 cursor-pointer ${
                                            active
                                                ? "border-[var(--glow-amber)]/70 bg-[var(--ocean-surface)]"
                                                : "border-[var(--ocean-border)] bg-[var(--ocean-surface)]/60 hover:border-[var(--glow-amber)]/50 hover:bg-[var(--ocean-surface)]"
                                        }`}
                                    >
                                        {active && (
                                            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[var(--glow-amber)]/40 bg-[var(--glow-amber)]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--glow-amber)] font-[var(--font-inter)]">
                                                <Check size={10} /> Current
                                            </span>
                                        )}
                                        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--glow-amber)]/30 bg-[var(--glow-amber)]/10 text-[var(--glow-amber)] transition-transform duration-300 group-hover:scale-110">
                                            <opt.icon size={22} />
                                        </span>
                                        <h3 className="mb-1 font-[var(--font-space-grotesk)] text-lg font-bold text-[var(--mist-100)]">
                                            {opt.title}
                                        </h3>
                                        <p className="mb-4 text-sm leading-relaxed text-[var(--mist-500)] font-[var(--font-inter)]">
                                            {opt.tagline}
                                        </p>
                                        <ul className="mb-5 space-y-1">
                                            {opt.includes.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-center gap-2 text-xs text-[var(--mist-300)] font-[var(--font-inter)]"
                                                >
                                                    <span className="h-1 w-1 rounded-full bg-[var(--glow-amber)]" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--glow-amber)] font-[var(--font-inter)]">
                                            Explore
                                            <ArrowRight
                                                size={14}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
