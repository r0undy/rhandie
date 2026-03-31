"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/magic-ui";
import { Mic, Users, PresentationIcon, ExternalLink, FileDown, MapPin, Calendar } from "lucide-react";
import speakingData from "@/data/speaking.json";

type SpeakingEvent = {
    title: string;
    event: string;
    date: string;
    type: string;
    description: string;
    location: string;
    recordingUrl: string;
    slidesUrl: string;
};

const speakingEvents: SpeakingEvent[] = speakingData;

const typeConfig: Record<string, { color: string; bgColor: string; borderColor: string; Icon: React.ElementType }> = {
    "Speaker": {
        color: "text-[#E8A87C]",
        bgColor: "bg-[#E8A87C]/10",
        borderColor: "border-[#E8A87C]/25",
        Icon: Mic,
    },
    "Panelist": {
        color: "text-[#9BADD0]",
        bgColor: "bg-[#6B7BAD]/15",
        borderColor: "border-[#6B7BAD]/30",
        Icon: Users,
    },
    "Facilitator": {
        color: "text-[#7EC8A8]",
        bgColor: "bg-[#3D8C6B]/10",
        borderColor: "border-[#3D8C6B]/25",
        Icon: PresentationIcon,
    },
};

export default function SpeakingSection() {
    return (
        <section id="speaking" className="py-28 px-6 bg-[#141829]">
            <div className="max-w-6xl mx-auto">

                <BlurFade delay={0.1}>
                    <div className="mb-16 text-center">
                        <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-[#E8A87C] uppercase font-[var(--font-inter)]">
                            Stage
                        </span>
                        <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[#EEF0F7] mb-5">
                            Speaking <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A87C] to-[#6B7BAD]">Opportunities</span>
                        </h2>
                        <p className="max-w-xl mx-auto text-[#8A96B8] text-lg font-[var(--font-inter)]">
                            Talks, panels, and workshops on cloud infrastructure, full-stack engineering, and tech leadership.
                        </p>
                    </div>
                </BlurFade>

                <div className="flex flex-col gap-4">
                    {speakingEvents.map((evt, i) => {
                        const cfg = typeConfig[evt.type] ?? typeConfig["Speaker"];
                        const TypeIcon = cfg.Icon;

                        return (
                            <BlurFade key={i} delay={0.15 + i * 0.08}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="group relative rounded-2xl border border-[#3D4F7C]/40 bg-[#252B45]/50 hover:border-[#6B7BAD]/50 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Noise texture */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[0.025]"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }}
                                    />
                                    {/* Left accent bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bgColor} opacity-80 group-hover:opacity-100 transition-opacity`} />

                                    <div className="pl-8 pr-6 py-6 flex flex-col sm:flex-row sm:items-center gap-5">

                                        {/* Icon */}
                                        <div className={`shrink-0 w-12 h-12 rounded-xl ${cfg.bgColor} border ${cfg.borderColor} flex items-center justify-center`}>
                                            <TypeIcon size={20} className={cfg.color} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-[var(--font-inter)] ${cfg.bgColor} ${cfg.color} border ${cfg.borderColor}`}>
                                                    {evt.type}
                                                </span>
                                                <span className="text-[#5A6485] text-[10px] font-[var(--font-inter)] flex items-center gap-1">
                                                    <Calendar size={9} />
                                                    {evt.date}
                                                </span>
                                            </div>
                                            <h3 className="font-[var(--font-space-grotesk)] font-bold text-[#EEF0F7] text-base mb-0.5">
                                                {evt.title}
                                            </h3>
                                            <p className="text-[#E8A87C] text-xs font-semibold font-[var(--font-inter)] mb-2">{evt.event}</p>
                                            <p className="text-[#8A96B8] text-sm font-[var(--font-inter)] leading-relaxed mb-2">{evt.description}</p>
                                            <div className="flex items-center gap-1.5 text-[#5A6485] text-xs font-[var(--font-inter)]">
                                                <MapPin size={10} />
                                                <span>{evt.location}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            {evt.recordingUrl !== "#" && (
                                                <a
                                                    href={evt.recordingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1F35] border border-[#3D4F7C]/40 text-[#8A96B8] hover:text-[#E8A87C] hover:border-[#E8A87C]/40 transition-all duration-200 text-xs font-[var(--font-inter)]"
                                                    title="View Recording"
                                                >
                                                    <ExternalLink size={12} />
                                                    <span className="hidden sm:inline">Recording</span>
                                                </a>
                                            )}
                                            {evt.slidesUrl !== "#" && (
                                                <a
                                                    href={evt.slidesUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1F35] border border-[#3D4F7C]/40 text-[#8A96B8] hover:text-[#9BADD0] hover:border-[#6B7BAD]/40 transition-all duration-200 text-xs font-[var(--font-inter)]"
                                                    title="View Slides"
                                                >
                                                    <FileDown size={12} />
                                                    <span className="hidden sm:inline">Slides</span>
                                                </a>
                                            )}
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
