"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Reveal, SectionHeader, EASE_WATER } from "@/components/ui/motion";
import credentials from "@/data/credentials.json";

type Credential = {
    type: "certification" | "skill";
    title: string;
    provider: string;
    providerLogo: string;
    date: string;
    credentialUrl: string;
};

const allCredentials = credentials as unknown as Credential[];

const TABS = [
    { key: "certification", label: "Certifications" },
    { key: "skill", label: "Skill Credentials" },
] as const;

export default function CredentialsSection() {
    const [tab, setTab] = useState<"certification" | "skill">("certification");
    const items = allCredentials.filter((c) => c.type === tab);

    return (
        <section id="credentials" className="relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Credentials"
                    title="Certifications & Skill Credentials"
                    description="Verified certifications and hands-on skill credentials from Microsoft, Anthropic, Vercel, DataCamp, and more."
                />

                {/* Segmented toggle */}
                <Reveal className="mb-10">
                    <div
                        role="tablist"
                        aria-label="Credential type"
                        className="inline-flex rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-surface)] p-1"
                    >
                        {TABS.map(({ key, label }) => (
                            <button
                                key={key}
                                role="tab"
                                aria-selected={tab === key}
                                onClick={() => setTab(key)}
                                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors font-[var(--font-inter)] ${
                                    tab === key
                                        ? "text-[var(--ocean-deep)]"
                                        : "text-[var(--mist-300)] hover:text-[var(--mist-100)]"
                                }`}
                            >
                                {tab === key && (
                                    <motion.span
                                        layoutId="credential-tab-indicator"
                                        transition={{ duration: 0.35, ease: EASE_WATER }}
                                        className="absolute inset-0 rounded-full bg-[var(--glow-amber)]"
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Credential grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: EASE_WATER }}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {items.map((cred) => (
                            <article
                                key={`${cred.provider}-${cred.title}`}
                                className="flex items-start gap-4 rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)] p-5 transition-colors duration-300 hover:border-[var(--mist-700)]"
                            >
                                <Image
                                    src={cred.providerLogo}
                                    alt={`${cred.provider} logo`}
                                    width={44}
                                    height={44}
                                    className="rounded-lg border border-[var(--ocean-border)] bg-[var(--ocean-mid)] object-contain p-1.5"
                                />
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 text-sm font-bold leading-snug text-[var(--mist-100)] font-[var(--font-space-grotesk)]">
                                        {cred.title}
                                    </h3>
                                    <p className="text-xs text-[var(--mist-500)] font-[var(--font-inter)]">
                                        {cred.provider} · {cred.date}
                                    </p>
                                    <a
                                        href={cred.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Verify ${cred.title} credential`}
                                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--glow-amber)] hover:text-[var(--glow-amber-deep)] transition-colors font-[var(--font-inter)]"
                                    >
                                        <ExternalLink size={12} /> Verify credential
                                    </a>
                                </div>
                            </article>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
