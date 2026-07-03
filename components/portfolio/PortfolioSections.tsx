"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_WATER } from "@/components/ui/motion";
import { usePortfolioMode } from "./PortfolioModeContext";

/**
 * Receives server-rendered section groups and swaps them based on the
 * chosen portfolio mode. Both groups exist in the SSR HTML (SEO-safe);
 * before hydration / first choice, both render so crawlers see everything.
 */
export default function PortfolioSections({
    technical,
    speaker,
}: {
    technical: ReactNode;
    speaker: ReactNode;
}) {
    const { mode, hydrated } = usePortfolioMode();

    // Pre-hydration & pre-choice: render everything (crawler + no-JS friendly).
    if (!hydrated || mode === null) {
        return (
            <>
                {technical}
                {speaker}
            </>
        );
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={mode}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE_WATER }}
            >
                {mode === "technical" ? technical : speaker}
            </motion.div>
        </AnimatePresence>
    );
}
