"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AnimatedListItem } from "@/components/ui/magic-ui";
import { BorderBeam } from "@/components/ui/magic-ui";
import { Download, Facebook, Linkedin, Github, MapPin, Briefcase } from "lucide-react";
import {
    ReactIcon, NextjsIcon, TypescriptIcon,
    NodejsIcon, DotNetIcon, DjangoIcon,
    MySQLIcon, MongoDBIcon, SupabaseIcon,
    AzureIcon, AWSIcon, GCPIcon, GitIcon,
} from "@/components/ui/tech-icons";

const techStack = [
    {
        category: "Frontend",
        color: "text-[#E8A87C]",
        borderColor: "border-[#E8A87C]/20",
        items: [
            { icon: ReactIcon, label: "React.js / Vite" },
            { icon: NextjsIcon, label: "Next.js" },
            { icon: TypescriptIcon, label: "TypeScript" },
        ],
    },
    {
        category: "Backend",
        color: "text-[#9BADD0]",
        borderColor: "border-[#6B7BAD]/20",
        items: [
            { icon: DotNetIcon, label: ".NET" },
            { icon: DjangoIcon, label: "Django" },
            { icon: NodejsIcon, label: "Node.js / Express" },
        ],
    },
    {
        category: "Database",
        color: "text-[#7EC8A8]",
        borderColor: "border-[#3D8C6B]/20",
        items: [
            { icon: MySQLIcon, label: "MySQL" },
            { icon: MongoDBIcon, label: "MongoDB" },
            { icon: SupabaseIcon, label: "Supabase" },
        ],
    },
    {
        category: "DevOps & Cloud",
        color: "text-[#B89DE8]",
        borderColor: "border-[#7B5BAD]/20",
        items: [
            { icon: GitIcon, label: "Git" },
            { icon: AzureIcon, label: "Azure" },
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

export default function AboutSection() {
    return (
        <motion.section
            id="about"
            className="py-28 px-6 bg-[#1A1F35]"
            initial={{ clipPath: "inset(8% 0 0 0 round 16px)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0% 0 0 0 round 0px)", opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Section header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-[#E8A87C] uppercase font-[var(--font-inter)]">
                        About Me
                    </span>
                    <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[#EEF0F7] mb-5">
                        The <span className="text-[#E8A87C]">Engineer</span> Behind the Code
                    </h2>
                    <p className="max-w-2xl mx-auto text-[#8A96B8] text-lg leading-relaxed font-[var(--font-inter)]">
                        A full-stack cloud-native developer passionate about writing clean, maintainable code
                        and building scalable applications from idea to production.
                    </p>
                </motion.div>

                {/* Profile card + Tech Stack */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* Profile Card — full image */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative rounded-2xl border border-[#3D4F7C]/40 bg-[#252B45]/50 overflow-hidden group">
                            <BorderBeam duration={10} colorFrom="#E8A87C" colorTo="#6B7BAD" borderWidth={1.5} />

                            {/* Full image */}
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <Image
                                    src="/team/rhandie.png"
                                    alt="Rhandie J. Sales Jr."
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                />
                                {/* Gradient overlay at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#252B45] via-[#252B45]/60 to-transparent" />
                            </div>

                            {/* Info overlay at bottom of image */}
                            <div className="absolute bottom-0 inset-x-0 p-6">
                                <h3 className="font-[var(--font-space-grotesk)] font-bold text-[#EEF0F7] text-xl mb-0.5">
                                    Rhandie J. Sales Jr.
                                </h3>
                                <p className="text-[#E8A87C] text-sm font-semibold font-[var(--font-inter)] mb-3">
                                    Full-Stack Engineer
                                </p>
                                <div className="flex items-center gap-1.5 text-[#8A96B8] text-xs font-[var(--font-inter)] mb-1">
                                    <MapPin size={12} />
                                    <span>Philippines</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#8A96B8] text-xs font-[var(--font-inter)] mb-4">
                                    <Briefcase size={12} />
                                    <span>Beta MSA · StellarPH100</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    {socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-8 h-8 rounded-lg bg-[#1A1F35]/80 border border-[#3D4F7C]/50 flex items-center justify-center text-[#8A96B8] hover:text-[#E8A87C] hover:border-[#E8A87C]/50 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                                        >
                                            <social.icon size={14} />
                                        </a>
                                    ))}
                                </div>
                                <a
                                    href="/resume/SALES_Rhandie_Resume.pdf"
                                    download
                                    className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold font-[var(--font-inter)] text-[#1A1F35] bg-[#E8A87C] hover:bg-[#d9976d] transition-all duration-200 hover:scale-105 active:scale-95"
                                >
                                    <Download size={13} />
                                    Download Résumé
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Bio + Tech Stack */}
                    <div className="lg:col-span-3 flex flex-col gap-6">

                        {/* Bio card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="relative rounded-2xl border border-[#3D4F7C]/40 bg-[#252B45]/50 p-7 overflow-hidden"
                        >
                            {/* Noise texture */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] rounded-2xl"
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }}
                            />
                            <p className="text-[#8A96B8] text-sm leading-relaxed font-[var(--font-inter)]">
                                I&apos;m <span className="text-[#EEF0F7] font-semibold">Rhandie J. Sales Jr.</span> — a Beta Microsoft Student Ambassador from the Philippines and a full-stack cloud-native developer
                                specializing in <span className="text-[#EEF0F7]">React.js, TypeScript, and .NET</span>. I focus on writing clean, maintainable code and building
                                scalable web applications, while working with cloud and AI technologies in practical projects.
                            </p>
                            <p className="text-[#8A96B8] text-sm leading-relaxed font-[var(--font-inter)] mt-3">
                                I serve in tech leadership roles within the{" "}
                                <span className="text-[#EEF0F7]">Microsoft Student Community, Google Developer Groups,</span> and{" "}
                                <span className="text-[#EEF0F7]">AWS Cloud Clubs</span>, and am part of the{" "}
                                <span className="text-[#E8A87C] font-semibold">StellarPH100</span>, recognizing the country&apos;s greatest minds under 30.
                            </p>
                        </motion.div>

                        {/* Tech Stack */}
                        <div className="flex flex-col gap-3">
                            {techStack.map((group, gi) => (
                                <AnimatedListItem key={group.category} delay={0.3 + gi * 0.07}>
                                    <div className={`relative rounded-xl border ${group.borderColor} bg-[#252B45]/40 p-4 overflow-hidden`}>
                                        <div className={`text-[10px] font-bold tracking-widest uppercase ${group.color} font-[var(--font-inter)] mb-3`}>
                                            {group.category}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((tech) => (
                                                <div
                                                    key={tech.label}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1F35]/70 border border-[#3D4F7C]/30 text-[#8A96B8] hover:text-[#EEF0F7] hover:border-[#3D4F7C]/60 transition-all duration-200 cursor-default"
                                                >
                                                    <tech.icon width={14} height={14} aria-label={tech.label} />
                                                    <span className="text-xs font-medium font-[var(--font-inter)]">{tech.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedListItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
