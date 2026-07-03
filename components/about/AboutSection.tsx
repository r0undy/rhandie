"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Reveal, EASE_WATER } from "@/components/ui/motion";
import { RESUME_PATH } from "@/lib/site";
import { Download, Facebook, Linkedin, Github, MapPin, Briefcase, Trophy, BadgeCheck, Users, GraduationCap } from "lucide-react";
import {
    ReactIcon, NextjsIcon, TypescriptIcon,
    NodejsIcon, DotNetIcon, DjangoIcon,
    MySQLIcon, MongoDBIcon, SupabaseIcon,
    AzureIcon, AWSIcon, GCPIcon, GitIcon,
} from "@/components/ui/tech-icons";

const techStack = [
    {
        category: "Frontend",
        items: [
            { icon: ReactIcon, label: "React.js / Vite" },
            { icon: NextjsIcon, label: "Next.js" },
            { icon: TypescriptIcon, label: "TypeScript" },
        ],
    },
    {
        category: "Backend",
        items: [
            { icon: DotNetIcon, label: ".NET" },
            { icon: DjangoIcon, label: "Django" },
            { icon: NodejsIcon, label: "Node.js / Express" },
        ],
    },
    {
        category: "Database",
        items: [
            { icon: MySQLIcon, label: "MySQL" },
            { icon: MongoDBIcon, label: "MongoDB" },
            { icon: SupabaseIcon, label: "Supabase" },
        ],
    },
    {
        category: "Cloud & AI",
        items: [
            { icon: GitIcon, label: "Git" },
            { icon: AzureIcon, label: "Azure" },
            { icon: AzureIcon, label: "Azure AI Foundry" },
            { icon: AWSIcon, label: "AWS" },
            { icon: GCPIcon, label: "GCP" },
        ],
    },
];

const socials = [
    { icon: Facebook, href: "https://www.facebook.com/rhandie.sales.1", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rhandie-sales/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Roundyy", label: "GitHub" },
];

const highlights = [
    { icon: Trophy, title: "Multi-Hackathon Winner", detail: "Champion placements across AI & cloud hackathons" },
    { icon: BadgeCheck, title: "Microsoft Credentials", detail: "Certified & Applied Skills across Azure and AI" },
    { icon: Users, title: "Mentor & Student Leader", detail: "Leading developer communities across the PH" },
    { icon: GraduationCap, title: "StellarPH100", detail: "The country’s greatest minds under 30" },
];

const communities = [
    "Associate Microsoft Student Ambassador",
    "Microsoft Student Community",
    "Google Developer Groups",
    "AWS Cloud Clubs",
    "Seekers Guild",
];

export default function AboutSection() {
    return (
        <section id="about" className="caustic-light relative py-28 px-6 bg-[var(--ocean-deep)]">
            <div className="max-w-6xl mx-auto">

                {/* Section header */}
                <Reveal className="mb-16 text-center">
                    <span className="inline-block mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--glow-amber)] uppercase font-[var(--font-inter)]">
                        About Me
                    </span>
                    <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--mist-100)] mb-5">
                        The <span className="text-[var(--glow-amber)]">Engineer</span> Behind the Code
                    </h2>
                    <p className="max-w-2xl mx-auto text-[var(--mist-500)] text-lg leading-relaxed font-[var(--font-inter)]">
                        IT student, Co-Founder & Engineer at Axon Enjin, and multi-hackathon winner —
                        building AI-powered products from idea to production.
                    </p>
                </Reveal>

                {/* Profile card + Tech Stack */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

                    {/* Profile Card — fills the full column height to bento with the right side */}
                    <div className="lg:col-span-2">
                        <Reveal className="h-full">
                            <div className="group relative h-full flex flex-col rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/50 overflow-hidden">
                                    {/* Photo — fills remaining height, only name + role overlaid */}
                                    <div className="relative w-full overflow-hidden aspect-[4/5] lg:aspect-auto lg:flex-1 lg:min-h-[320px]">
                                        <Image
                                            src="/team/rhandie.png"
                                            alt="Rhandie J. Sales Jr."
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--ocean-abyss)]/90 via-[var(--ocean-abyss)]/40 to-transparent" />
                                        <div className="absolute bottom-0 inset-x-0 p-5">
                                            <h3 className="font-[var(--font-space-grotesk)] font-bold text-[var(--mist-100)] text-xl mb-0.5">
                                                Rhandie J. Sales Jr.
                                            </h3>
                                            <p className="text-[var(--glow-amber)] text-sm font-semibold font-[var(--font-inter)]">
                                                Co-Founder & Engineer @ Axon Enjin
                                            </p>
                                        </div>
                                    </div>

                                    {/* Info panel below the photo */}
                                    <div className="shrink-0 border-t border-[var(--ocean-border)] p-5">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4">
                                            <div className="flex items-center gap-1.5 text-[var(--mist-500)] text-xs font-[var(--font-inter)]">
                                                <MapPin size={12} className="text-[var(--glow-amber)]" />
                                                <span>Philippines</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[var(--mist-500)] text-xs font-[var(--font-inter)]">
                                                <Briefcase size={12} className="text-[var(--glow-amber)]" />
                                                <span>Associate MSA · StellarPH100</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <a
                                                href={RESUME_PATH}
                                                download
                                                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold font-[var(--font-inter)] text-[var(--ocean-deep)] bg-[var(--glow-amber)] hover:bg-[var(--glow-amber-deep)] transition-colors duration-200"
                                            >
                                                <Download size={13} />
                                                Download Résumé
                                            </a>
                                            <div className="flex items-center gap-2">
                                                {socials.map((social) => (
                                                    <a
                                                        key={social.label}
                                                        href={social.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={social.label}
                                                        className="w-8 h-8 rounded-lg bg-[var(--ocean-deep)]/80 border border-[var(--ocean-border)] flex items-center justify-center text-[var(--mist-500)] hover:text-[var(--glow-amber)] hover:border-[var(--glow-amber)]/50 transition-colors duration-200"
                                                    >
                                                        <social.icon size={14} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — Bio + Highlights */}
                    <div className="relative lg:col-span-3 flex flex-col gap-6">

                        {/* Bio card */}
                        <Reveal className="relative rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/50 p-7">
                            <p className="text-[var(--mist-300)] text-sm leading-relaxed font-[var(--font-inter)]">
                                I&apos;m <span className="text-[var(--mist-100)] font-semibold">Rhandie J. Sales Jr.</span> — an Information Technology student and{" "}
                                <span className="text-[var(--mist-100)] font-semibold">Co-Founder & Engineer at Axon Enjin</span>. A full-stack cloud-native developer specializing in{" "}
                                <span className="text-[var(--mist-100)]">React, TypeScript, and Express</span>, with a focus on{" "}
                                <span className="text-[var(--glow-amber)] font-semibold">AI Engineering through Azure Foundry models</span>.
                            </p>
                            <p className="text-[var(--mist-300)] text-sm leading-relaxed font-[var(--font-inter)] mt-3">
                                I serve in tech leadership roles across the Microsoft ecosystem as an{" "}
                                <span className="text-[var(--mist-100)]">Associate Microsoft Student Ambassador</span>, and within{" "}
                                <span className="text-[var(--mist-100)]">Google Developer Groups, AWS Cloud Clubs, and Seekers Guild</span>. I&apos;m part of the{" "}
                                <span className="text-[var(--glow-amber)] font-semibold">StellarPH100</span>, recognizing the country&apos;s greatest minds under 30.
                            </p>

                            {/* Community chips */}
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {communities.map((c) => (
                                    <span
                                        key={c}
                                        className="rounded-full border border-[var(--ocean-border)] bg-[var(--ocean-deep)]/70 px-3 py-1 text-[11px] font-medium text-[var(--mist-300)] font-[var(--font-inter)]"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </Reveal>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:flex-1">
                            {highlights.map((h, i) => (
                                <motion.div
                                    key={h.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_WATER }}
                                    className="flex items-start gap-3 rounded-xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/40 p-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--glow-amber)]/30 bg-[var(--glow-amber)]/10 text-[var(--glow-amber)]">
                                        <h.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[var(--mist-100)] font-[var(--font-space-grotesk)]">
                                            {h.title}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-snug text-[var(--mist-500)] font-[var(--font-inter)]">
                                            {h.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stack — full-width bento row */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {techStack.map((group, gi) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.5, delay: gi * 0.06, ease: EASE_WATER }}
                            className="h-full"
                        >
                            <div className="relative h-full rounded-xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/40 p-4">
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--glow-amber)] font-[var(--font-inter)] mb-3">
                                    {group.category}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((tech) => (
                                        <div
                                            key={tech.label}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--ocean-deep)]/70 border border-[var(--ocean-border)]/60 text-[var(--mist-500)] hover:text-[var(--mist-100)] hover:border-[var(--mist-700)] transition-colors duration-200 cursor-default"
                                        >
                                            <tech.icon width={14} height={14} aria-label={tech.label} />
                                            <span className="text-xs font-medium font-[var(--font-inter)]">{tech.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
