"use client";

import { BlurFade } from "@/components/ui/magic-ui";
import { Facebook, Linkedin, Github, Mail, ExternalLink, MessageCircle } from "lucide-react";

const contactLinks = [
    {
        icon: Linkedin,
        label: "LinkedIn",
        handle: "rhandie-sales",
        href: "https://www.linkedin.com/in/rhandie-sales/",
        accentColor: "#0A66C2",
        glowColor: "#0A66C2",
        description: "Connect professionally",
    },
    {
        icon: Github,
        label: "GitHub",
        handle: "Roundyy",
        href: "https://github.com/Roundyy",
        accentColor: "#EEF0F7",
        glowColor: "#6B7BAD",
        description: "Browse my repositories",
    },
    {
        icon: Facebook,
        label: "Facebook",
        handle: "rhandie.sales.1",
        href: "https://www.facebook.com/rhandie.sales.1",
        accentColor: "#1877F2",
        glowColor: "#1877F2",
        description: "Say hi on Facebook",
    },
    {
        icon: Mail,
        label: "Email",
        handle: "rhandiesalesjr@gmail.com",
        href: "mailto:rhandiesalesjr@gmail.com",
        accentColor: "#E8A87C",
        glowColor: "#E8A87C",
        description: "Drop me a message",
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="py-28 px-6 bg-[#1A1F35]">
            <div className="max-w-3xl mx-auto text-center">

                <BlurFade delay={0.1}>
                    <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-[#E8A87C] uppercase font-[var(--font-inter)]">
                        Get in Touch
                    </span>
                    <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[#EEF0F7] mb-5">
                        Let&apos;s{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A87C] to-[#6B7BAD]">
                            Connect
                        </span>
                    </h2>
                    <p className="text-[#8A96B8] text-lg font-[var(--font-inter)] mb-12 max-w-lg mx-auto">
                        Open to full-time roles, freelance contracts, and collaboration opportunities.
                        I&apos;d love to hear from you.
                    </p>
                </BlurFade>

                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactLinks.map((link, i) => (
                        <BlurFade key={link.label} delay={0.2 + i * 0.07}>
                            <a
                                href={link.href}
                                target={link.label !== "Email" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-4 rounded-2xl border border-[#3D4F7C]/40 bg-[#252B45]/50 p-6 text-left hover:bg-[#252B45]/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                style={{
                                    boxShadow: "0 0 0 0 transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 8px 30px -8px ${link.glowColor}22`;
                                    e.currentTarget.style.borderColor = `${link.accentColor}44`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
                                    e.currentTarget.style.borderColor = "";
                                }}
                            >
                                {/* Hover shimmer */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

                                <div
                                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110"
                                    style={{ backgroundColor: `${link.accentColor}22`, border: `1px solid ${link.accentColor}33` }}
                                >
                                    <link.icon size={22} style={{ color: link.accentColor }} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-[var(--font-space-grotesk)] font-bold text-[#EEF0F7] text-sm mb-0.5 flex items-center gap-2">
                                        {link.label}
                                        <ExternalLink size={12} className="text-[#5A6485] group-hover:text-[#8A96B8] transition-colors" />
                                    </div>
                                    <div className="text-[#8A96B8] text-xs font-[var(--font-inter)] truncate">{link.handle}</div>
                                    <div className="text-[#5A6485] text-[10px] font-[var(--font-inter)] mt-0.5">{link.description}</div>
                                </div>

                                <MessageCircle size={16} className="shrink-0 text-[#3D4F7C] group-hover:text-[#8A96B8] transition-colors" />
                            </a>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
