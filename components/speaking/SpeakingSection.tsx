"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Users, Video, Presentation } from "lucide-react";
import { Reveal, SectionHeader, EASE_WATER } from "@/components/ui/motion";
import speaking from "@/data/speaking.json";

type Talk = {
    slug: string;
    title: string;
    event: string;
    date: string;
    type: string;
    description: string;
    location: string;
    audience: string;
    topics: string[];
    highlights: string[];
    thumbnail: string;
    gallery: string[];
    recordingUrl: string;
    slidesUrl: string;
};

const talks = speaking as unknown as Talk[];

const TYPE_STYLES: Record<string, string> = {
    Speaker: "bg-[var(--glow-amber)]/15 text-[var(--glow-amber)] border-[var(--glow-amber)]/40",
    Panelist: "bg-[var(--mist-700)]/15 text-[var(--mist-300)] border-[var(--mist-700)]/40",
    Facilitator: "bg-[var(--mist-700)]/15 text-[var(--mist-300)] border-[var(--mist-700)]/40",
};

function TalkModal({ talk, onClose }: { talk: Talk; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-[var(--ocean-abyss)]/80 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={talk.title}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.35, ease: EASE_WATER }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)] max-h-[92dvh] sm:max-h-[85dvh] sm:rounded-2xl"
            >
                <button
                    onClick={onClose}
                    aria-label="Close details"
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-deep)]/80 text-[var(--mist-300)] backdrop-blur transition-colors hover:text-[var(--mist-100)] sm:right-4 sm:top-4"
                >
                    <X size={16} />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto overscroll-contain">
                    {/* Hero thumbnail */}
                    <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden bg-[var(--ocean-mid)] sm:aspect-[16/7]">
                        <Image
                            src={talk.thumbnail}
                            alt={`${talk.title} thumbnail`}
                            fill
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-surface)] via-transparent to-transparent" />
                    </div>

                    <div className="p-5 sm:p-8">
                        <span
                            className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold font-[var(--font-inter)] ${TYPE_STYLES[talk.type] ?? TYPE_STYLES.Panelist}`}
                        >
                            {talk.type}
                        </span>
                        <h3 className="mb-1 font-[var(--font-space-grotesk)] text-xl font-bold text-[var(--mist-100)] sm:text-2xl">
                            {talk.title}
                        </h3>
                        <p className="mb-4 text-sm font-semibold text-[var(--glow-amber)] font-[var(--font-inter)]">
                            {talk.event}
                        </p>

                        <div className="mb-5 flex flex-col gap-2 text-sm text-[var(--mist-500)] font-[var(--font-inter)] sm:flex-row sm:flex-wrap sm:gap-x-5">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} className="shrink-0" /> {talk.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin size={14} className="shrink-0" /> {talk.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Users size={14} className="shrink-0" /> {talk.audience}
                            </span>
                        </div>

                        <p className="mb-5 text-sm leading-relaxed text-[var(--mist-300)] font-[var(--font-inter)] sm:text-base">
                            {talk.description}
                        </p>

                        {/* Highlights */}
                        <ul className="mb-6 space-y-1.5">
                            {talk.highlights.map((h) => (
                                <li
                                    key={h}
                                    className="flex items-start gap-2 text-sm text-[var(--mist-300)] font-[var(--font-inter)]"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--glow-amber)]" />
                                    {h}
                                </li>
                            ))}
                        </ul>

                        {/* Topics */}
                        <div className="mb-6 flex flex-wrap gap-1.5">
                            {talk.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className="rounded-md border border-[var(--ocean-border)] bg-[var(--ocean-mid)] px-2 py-0.5 text-xs text-[var(--mist-300)] font-[var(--font-inter)]"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>

                        {/* Photo collage */}
                        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {talk.gallery.map((src, i) => (
                                <div
                                    key={src}
                                    className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--ocean-mid)]"
                                >
                                    <Image
                                        src={src}
                                        alt={`${talk.title} photo ${i + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 200px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                            {talk.recordingUrl !== "#" && (
                                <a
                                    href={talk.recordingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--glow-amber)] hover:text-[var(--glow-amber-deep)] transition-colors font-[var(--font-inter)]"
                                >
                                    <Video size={14} /> Recording
                                </a>
                            )}
                            {talk.slidesUrl !== "#" && (
                                <a
                                    href={talk.slidesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--mist-300)] hover:text-[var(--mist-100)] transition-colors font-[var(--font-inter)]"
                                >
                                    <Presentation size={14} /> Slides
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function SpeakingSection() {
    const [selected, setSelected] = useState<Talk | null>(null);

    return (
        <section id="speaking" className="caustic-light relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Speaking"
                    title="Talks & Engagements"
                    description="Tech talks, panels, and workshops on cloud, AI, and full-stack engineering across the Philippine developer community."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {talks.map((talk, i) => (
                        <Reveal key={talk.slug} delay={i * 0.08}>
                            <button
                                onClick={() => setSelected(talk)}
                                className="group w-full overflow-hidden rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)] text-left transition-colors duration-300 hover:border-[var(--glow-amber)]/60"
                            >
                                <div className="relative aspect-[16/8] overflow-hidden bg-[var(--ocean-mid)]">
                                    <Image
                                        src={talk.thumbnail}
                                        alt={`${talk.title} thumbnail`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <span
                                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold font-[var(--font-inter)] ${TYPE_STYLES[talk.type] ?? TYPE_STYLES.Panelist}`}
                                        >
                                            {talk.type}
                                        </span>
                                        <span className="text-xs text-[var(--mist-500)] font-[var(--font-inter)]">
                                            {talk.date}
                                        </span>
                                    </div>
                                    <h3 className="mb-1 font-[var(--font-space-grotesk)] text-lg font-bold text-[var(--mist-100)] group-hover:text-[var(--glow-amber)] transition-colors">
                                        {talk.title}
                                    </h3>
                                    <p className="text-sm text-[var(--mist-500)] font-[var(--font-inter)]">
                                        {talk.event}
                                    </p>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && <TalkModal talk={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
