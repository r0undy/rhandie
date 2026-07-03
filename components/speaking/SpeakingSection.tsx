"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Users, Video, Presentation, Search, ExternalLink, Mic } from "lucide-react";
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
    eventUrl: string;
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
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {talk.eventUrl !== "#" && (
                                <a
                                    href={talk.eventUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--glow-amber)] hover:text-[var(--glow-amber-deep)] transition-colors font-[var(--font-inter)]"
                                >
                                    <ExternalLink size={14} /> View event
                                </a>
                            )}
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
    const [query, setQuery] = useState("");
    const [activeType, setActiveType] = useState<string>("All");
    const [activeTopic, setActiveTopic] = useState<string | null>(null);

    const types = useMemo(
        () => ["All", ...Array.from(new Set(talks.map((t) => t.type)))],
        []
    );

    const topics = useMemo(() => {
        const pool = activeType === "All" ? talks : talks.filter((t) => t.type === activeType);
        return Array.from(new Set(pool.flatMap((t) => t.topics)));
    }, [activeType]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return talks.filter((t) => {
            if (activeType !== "All" && t.type !== activeType) return false;
            if (activeTopic && !t.topics.includes(activeTopic)) return false;
            if (!q) return true;
            return (
                t.title.toLowerCase().includes(q) ||
                t.event.toLowerCase().includes(q) ||
                t.location.toLowerCase().includes(q) ||
                t.topics.some((topic) => topic.toLowerCase().includes(q))
            );
        });
    }, [query, activeType, activeTopic]);

    return (
        <section id="speaking" className="caustic-light relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Speaker Portfolio"
                    title="On Stage — Talks & Engagements"
                    description="Tech talks, panels, and workshops on cloud, AI, and full-stack engineering across the Philippine developer community."
                />

                {/* Search + filters */}
                <Reveal className="mb-10 flex flex-col gap-4">
                    <div className="relative max-w-md">
                        <Search
                            size={15}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mist-500)]"
                        />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search talks, events, or topics…"
                            aria-label="Search talks"
                            className="w-full rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/60 py-2.5 pl-10 pr-4 text-sm text-[var(--mist-100)] placeholder-[var(--mist-700)] outline-none transition-colors focus:border-[var(--glow-amber)]/60 font-[var(--font-inter)]"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {types.map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setActiveType(t);
                                    setActiveTopic(null);
                                }}
                                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-200 font-[var(--font-inter)] cursor-pointer ${
                                    activeType === t
                                        ? "border-[var(--glow-amber)] bg-[var(--glow-amber)]/15 text-[var(--glow-amber)]"
                                        : "border-[var(--ocean-border)] bg-[var(--ocean-surface)]/50 text-[var(--mist-500)] hover:text-[var(--mist-100)] hover:border-[var(--mist-700)]"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    {topics.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            {topics.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
                                    className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 font-[var(--font-inter)] cursor-pointer ${
                                        activeTopic === topic
                                            ? "border-[var(--glow-amber)]/60 bg-[var(--glow-amber)]/10 text-[var(--glow-amber)]"
                                            : "border-[var(--ocean-border)]/60 bg-[var(--ocean-deep)]/50 text-[var(--mist-500)] hover:text-[var(--mist-300)]"
                                    }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    )}
                </Reveal>

                {/* Editorial stage rows */}
                {filtered.length === 0 ? (
                    <Reveal className="rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/40 p-12 text-center">
                        <Mic size={28} className="mx-auto mb-3 text-[var(--mist-700)]" />
                        <p className="text-[var(--mist-300)] font-semibold font-[var(--font-inter)]">No talks match that search.</p>
                        <p className="mt-1 text-sm text-[var(--mist-500)] font-[var(--font-inter)]">
                            Try a different keyword or clear the filters.
                        </p>
                    </Reveal>
                ) : (
                    <div className="flex flex-col gap-8">
                        {filtered.map((talk, i) => (
                            <Reveal key={talk.slug} delay={Math.min(i * 0.06, 0.2)}>
                                <article
                                    className={`group grid grid-cols-1 items-stretch overflow-hidden rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/50 transition-colors duration-300 hover:border-[var(--glow-amber)]/50 md:grid-cols-2 ${
                                        i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                                    }`}
                                >
                                    {/* Thumbnail */}
                                    <button
                                        onClick={() => setSelected(talk)}
                                        aria-label={`Open details for ${talk.title}`}
                                        className="relative block aspect-[16/9] cursor-pointer overflow-hidden bg-[var(--ocean-mid)] md:aspect-auto md:min-h-[260px]"
                                    >
                                        <Image
                                            src={talk.thumbnail}
                                            alt={`${talk.title} thumbnail`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                        <div
                                            className={`absolute inset-y-0 w-1/3 from-[var(--ocean-surface)]/70 to-transparent ${
                                                i % 2 === 1 ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"
                                            } hidden md:block`}
                                        />
                                    </button>

                                    {/* Details */}
                                    <div className="flex flex-col p-6 sm:p-8">
                                        <div className="mb-3 flex items-center gap-3">
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold font-[var(--font-inter)] ${TYPE_STYLES[talk.type] ?? TYPE_STYLES.Panelist}`}
                                            >
                                                {talk.type}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--mist-500)] font-[var(--font-inter)]">
                                                <Calendar size={12} /> {talk.date}
                                            </span>
                                        </div>
                                        <h3 className="mb-1 font-[var(--font-space-grotesk)] text-xl font-bold text-[var(--mist-100)] transition-colors group-hover:text-[var(--glow-amber)] sm:text-2xl">
                                            {talk.title}
                                        </h3>
                                        <p className="mb-3 text-sm font-semibold text-[var(--glow-amber)] font-[var(--font-inter)]">
                                            {talk.event}
                                        </p>
                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--mist-300)] font-[var(--font-inter)]">
                                            {talk.description}
                                        </p>
                                        <div className="mb-5 flex flex-wrap gap-1.5">
                                            {talk.topics.slice(0, 4).map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="rounded-md border border-[var(--ocean-border)]/60 bg-[var(--ocean-deep)]/50 px-2 py-0.5 text-[11px] text-[var(--mist-500)] font-[var(--font-inter)]"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                                            <button
                                                onClick={() => setSelected(talk)}
                                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--mist-100)] transition-colors hover:text-[var(--glow-amber)] font-[var(--font-inter)] cursor-pointer"
                                            >
                                                <Mic size={14} /> Talk details
                                            </button>
                                            {talk.eventUrl !== "#" && (
                                                <a
                                                    href={talk.eventUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--glow-amber)] transition-colors hover:text-[var(--glow-amber-deep)] font-[var(--font-inter)]"
                                                >
                                                    View event <ExternalLink size={13} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selected && <TalkModal talk={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
