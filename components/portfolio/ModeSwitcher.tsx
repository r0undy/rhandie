"use client";

import { motion, AnimatePresence } from "motion/react";
import { Code2, Mic, ArrowLeftRight } from "lucide-react";
import { EASE_WATER } from "@/components/ui/motion";
import { usePortfolioMode } from "./PortfolioModeContext";

export default function ModeSwitcher() {
    const { mode, chooserOpen, openChooser } = usePortfolioMode();
    const Icon = mode === "speaker" ? Mic : Code2;
    const label = mode === "speaker" ? "Speaker" : "Technical";

    return (
        <AnimatePresence>
            {mode !== null && !chooserOpen && (
                <motion.button
                    key="mode-switcher"
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: EASE_WATER }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openChooser}
                    aria-label={`Currently viewing the ${label.toLowerCase()} portfolio — switch portfolio`}
                    className="group fixed bottom-5 right-5 z-[100] flex items-center gap-2.5 rounded-full border border-[var(--glow-amber)]/40 bg-[var(--ocean-surface)]/90 py-2.5 pl-3 pr-3 sm:pl-4 sm:pr-4 text-[var(--mist-100)] shadow-lg shadow-black/30 backdrop-blur-md transition-colors duration-300 hover:border-[var(--glow-amber)] cursor-pointer"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--glow-amber)]/15 text-[var(--glow-amber)]">
                        <Icon size={14} />
                    </span>
                    <span className="hidden sm:inline text-xs font-semibold font-[var(--font-inter)]">
                        {label} Portfolio
                    </span>
                    <ArrowLeftRight
                        size={13}
                        className="text-[var(--mist-500)] transition-colors duration-300 group-hover:text-[var(--glow-amber)]"
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
