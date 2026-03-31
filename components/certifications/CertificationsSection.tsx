"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/magic-ui";
import { ExternalLink, FileText, Award, Cpu, Cloud, Code2, Layers } from "lucide-react";
import certificationsData from "@/data/certifications.json";

type Certification = {
    title: string;
    issuer: string;
    issuerLogo: string;
    date: string;
    credentialId: string;
    credentialUrl: string;
    category: string;
};

const certifications: Certification[] = certificationsData;

const categoryConfig: Record<string, { color: string; bgColor: string; borderColor: string; Icon: React.ElementType }> = {
    "Cloud": {
        color: "text-[#9BADD0]",
        bgColor: "bg-[#6B7BAD]/15",
        borderColor: "border-[#6B7BAD]/30",
        Icon: Cloud,
    },
    "AI / ML": {
        color: "text-[#E8A87C]",
        bgColor: "bg-[#E8A87C]/10",
        borderColor: "border-[#E8A87C]/25",
        Icon: Cpu,
    },
    "DevOps": {
        color: "text-[#7EC8A8]",
        bgColor: "bg-[#3D8C6B]/10",
        borderColor: "border-[#3D8C6B]/25",
        Icon: Layers,
    },
    "Frontend": {
        color: "text-[#B89DE8]",
        bgColor: "bg-[#7B5BAD]/10",
        borderColor: "border-[#7B5BAD]/25",
        Icon: Code2,
    },
};

const issuerColors: Record<string, string> = {
    microsoft: "from-[#00A4EF] to-[#0078D4]",
    aws: "from-[#FF9900] to-[#E68A00]",
    gcp: "from-[#4285F4] to-[#34A853]",
    github: "from-[#6e5494] to-[#4a3570]",
    meta: "from-[#1877F2] to-[#0a5bc7]",
};

export default function CertificationsSection() {
    return (
        <section id="certifications" className="py-28 px-6 bg-[#1A1F35]">
            <div className="max-w-6xl mx-auto">

                <BlurFade delay={0.1}>
                    <div className="mb-16 text-center">
                        <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-[#E8A87C] uppercase font-[var(--font-inter)]">
                            Credentials
                        </span>
                        <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[#EEF0F7] mb-5">
                            Certifications
                        </h2>
                        <p className="max-w-xl mx-auto text-[#8A96B8] text-lg font-[var(--font-inter)]">
                            Industry-recognized credentials validating expertise across cloud, AI, and full-stack development.
                        </p>
                    </div>
                </BlurFade>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certifications.map((cert, i) => {
                        const cat = categoryConfig[cert.category] ?? categoryConfig["Cloud"];
                        const CatIcon = cat.Icon;
                        const gradient = issuerColors[cert.issuerLogo] ?? "from-[#3D4F7C] to-[#252B45]";

                        return (
                            <BlurFade key={i} delay={0.15 + i * 0.07}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="group relative rounded-2xl border border-[#3D4F7C]/40 bg-[#252B45]/50 hover:border-[#6B7BAD]/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
                                >
                                    {/* Noise texture */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[0.025]"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }}
                                    />

                                    {/* Top gradient bar */}
                                    <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} opacity-70`} />

                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Icon + Category */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-11 h-11 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center`}>
                                                <Award size={20} className={cat.color} />
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-[var(--font-inter)] ${cat.bgColor} ${cat.color} border ${cat.borderColor} flex items-center gap-1`}>
                                                <CatIcon size={9} />
                                                {cert.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-[var(--font-space-grotesk)] font-bold text-[#EEF0F7] text-sm leading-snug mb-2 flex-1">
                                            {cert.title}
                                        </h3>

                                        {/* Issuer + Year */}
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#3D4F7C]/30">
                                            <div>
                                                <p className="text-[#8A96B8] text-xs font-[var(--font-inter)]">{cert.issuer}</p>
                                                <p className="text-[#5A6485] text-[10px] font-[var(--font-inter)]">
                                                    <FileText size={9} className="inline mr-1" />
                                                    {cert.credentialId} · {cert.date}
                                                </p>
                                            </div>
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-lg bg-[#1A1F35] border border-[#3D4F7C]/40 flex items-center justify-center text-[#5A6485] hover:text-[#E8A87C] hover:border-[#E8A87C]/40 transition-all duration-200"
                                                title="View Credential"
                                            >
                                                <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </BlurFade>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
