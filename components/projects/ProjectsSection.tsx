"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Search, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHeader, EASE_WATER } from "@/components/ui/motion";
import projects from "@/data/projects.json";

type Project = {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    year: string;
    categories: string[];
    techByCategory: Record<string, string[]>;
    hackathon: { placement: string } | null;
    links: { live: string; github: string };
    thumbnail: string;
    icon: string;
};

const allProjects = projects as unknown as Project[];

const CATEGORIES = [
    "Web",
    "Mobile",
    "Cloud Computing",
    "AI Engineering",
    "Hackathon",
] as const;

const PER_PAGE = 6;

function ProjectCard({ project }: { project: Project }) {
    const isChampion = project.hackathon?.placement === "Champion";
    const techs = Array.from(
        new Set(Object.values(project.techByCategory).flat())
    ).filter((t) => t !== "Champion");

    return (
        <article
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--ocean-surface)] transition-colors duration-300 ${
                isChampion
                    ? "border-[var(--glow-amber)]/60 hover:border-[var(--glow-amber)]"
                    : "border-[var(--ocean-border)] hover:border-[var(--mist-700)]"
            }`}
        >
            {/* Champion banner — deliberately the loudest element */}
            {isChampion && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[var(--glow-amber)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--ocean-deep)] shadow-lg shadow-[var(--glow-amber)]/25">
                    <Trophy size={13} strokeWidth={2.5} />
                    Hackathon Champion
                </div>
            )}

            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--ocean-mid)]">
                <Image
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3">
                    <Image
                        src={project.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full border border-[var(--ocean-border)]"
                    />
                    <div>
                        <h3 className="font-[var(--font-space-grotesk)] text-lg font-bold text-[var(--mist-100)]">
                            {project.title}
                        </h3>
                        <p className="text-xs text-[var(--mist-500)] font-[var(--font-inter)]">
                            {project.year}
                        </p>
                    </div>
                </div>

                <p className="mb-2 text-sm font-semibold text-[var(--glow-amber)] font-[var(--font-inter)]">
                    {project.tagline}
                </p>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--mist-300)] font-[var(--font-inter)]">
                    {project.description}
                </p>

                {/* Tech chips */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                    {techs.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md border border-[var(--ocean-border)] bg-[var(--ocean-mid)] px-2 py-0.5 text-xs text-[var(--mist-300)] font-[var(--font-inter)]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {project.links.live !== "#" && (
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--glow-amber)] hover:text-[var(--glow-amber-deep)] transition-colors font-[var(--font-inter)]"
                        >
                            <ExternalLink size={14} /> Live
                        </a>
                    )}
                    {project.links.github !== "#" && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--mist-300)] hover:text-[var(--mist-100)] transition-colors font-[var(--font-inter)]"
                        >
                            <Github size={14} /> Code
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function ProjectsSection() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeTech, setActiveTech] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    // Techs available for the drill-down row of the selected category
    const drilldownTechs = useMemo(() => {
        if (!activeCategory) return [];
        const techs = new Set<string>();
        for (const p of allProjects) {
            for (const t of p.techByCategory[activeCategory] ?? []) techs.add(t);
        }
        return Array.from(techs);
    }, [activeCategory]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return allProjects.filter((p) => {
            if (activeCategory && !p.categories.includes(activeCategory)) return false;
            if (activeTech && !(p.techByCategory[activeCategory!] ?? []).includes(activeTech)) return false;
            if (q) {
                const haystack = [
                    p.title,
                    p.tagline,
                    p.description,
                    ...Object.values(p.techByCategory).flat(),
                ]
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            return true;
        });
    }, [query, activeCategory, activeTech]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const selectCategory = (cat: string) => {
        setActiveTech(null);
        setActiveCategory((prev) => (prev === cat ? null : cat));
        setPage(1);
    };

    return (
        <section id="projects" className="caustic-light relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Projects"
                    title="Selected Work"
                    description="Products built to solve real problems — from AI-powered SaaS to campus systems in production."
                />

                {/* Search + filters */}
                <Reveal className="mb-10">
                    <div className="mb-4 relative max-w-md">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mist-500)]"
                        />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search projects, tech, keywords…"
                            aria-label="Search projects"
                            className="w-full rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-surface)] py-2.5 pl-11 pr-4 text-sm text-[var(--mist-100)] placeholder:text-[var(--mist-500)] outline-none transition-colors focus:border-[var(--glow-amber)] font-[var(--font-inter)]"
                        />
                    </div>

                    {/* Category badges */}
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
                        {CATEGORIES.map((cat) => {
                            const active = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => selectCategory(cat)}
                                    aria-pressed={active}
                                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors font-[var(--font-inter)] ${
                                        active
                                            ? "border-[var(--glow-amber)] bg-[var(--glow-amber)] text-[var(--ocean-deep)]"
                                            : "border-[var(--ocean-border)] bg-[var(--ocean-surface)] text-[var(--mist-300)] hover:border-[var(--mist-700)] hover:text-[var(--mist-100)]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tech drill-down for selected category */}
                    <AnimatePresence>
                        {activeCategory && drilldownTechs.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: EASE_WATER }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="mt-3 flex flex-wrap gap-1.5 border-l-2 border-[var(--glow-amber)]/40 pl-4"
                                    role="group"
                                    aria-label={`Filter ${activeCategory} projects by technology`}
                                >
                                    {drilldownTechs.map((tech) => {
                                        const active = activeTech === tech;
                                        return (
                                            <button
                                                key={tech}
                                                onClick={() => {
                                                    setActiveTech((prev) => (prev === tech ? null : tech));
                                                    setPage(1);
                                                }}
                                                aria-pressed={active}
                                                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors font-[var(--font-inter)] ${
                                                    active
                                                        ? "border-[var(--glow-amber)]/70 bg-[var(--glow-amber)]/15 text-[var(--glow-amber)]"
                                                        : "border-[var(--ocean-border)] bg-[var(--ocean-mid)] text-[var(--mist-500)] hover:text-[var(--mist-300)]"
                                                }`}
                                            >
                                                {tech}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Reveal>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentPage}-${activeCategory}-${activeTech}-${query}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: EASE_WATER }}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {pageItems.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <p className="py-16 text-center text-[var(--mist-500)] font-[var(--font-inter)]">
                        No projects match — try a different search or filter.
                    </p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav aria-label="Projects pagination" className="mt-12 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ocean-border)] text-[var(--mist-300)] transition-colors hover:border-[var(--mist-700)] disabled:opacity-30 disabled:hover:border-[var(--ocean-border)]"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                onClick={() => setPage(n)}
                                aria-label={`Page ${n}`}
                                aria-current={n === currentPage ? "page" : undefined}
                                className={`h-9 w-9 rounded-full text-sm font-semibold transition-colors font-[var(--font-inter)] ${
                                    n === currentPage
                                        ? "bg-[var(--glow-amber)] text-[var(--ocean-deep)]"
                                        : "border border-[var(--ocean-border)] text-[var(--mist-300)] hover:border-[var(--mist-700)]"
                                }`}
                            >
                                {n}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ocean-border)] text-[var(--mist-300)] transition-colors hover:border-[var(--mist-700)] disabled:opacity-30 disabled:hover:border-[var(--ocean-border)]"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
}
