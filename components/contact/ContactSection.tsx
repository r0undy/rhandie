"use client";

import { Reveal, ParallaxDrift } from "@/components/ui/motion";
import { Facebook, Linkedin, Github, Mail, ExternalLink } from "lucide-react";

const contactLinks = [
    {
        icon: Linkedin,
        label: "LinkedIn",
        handle: "rhandie-sales",
        href: "https://www.linkedin.com/in/rhandie-sales/",
        accentColor: "#0A66C2",
        description: "Connect professionally",
    },
    {
        icon: Github,
        label: "GitHub",
        handle: "Roundyy",
        href: "https://github.com/Roundyy",
        accentColor: "#EEF0F7",
        description: "Browse my repositories",
    },
    {
        icon: Facebook,
        label: "Facebook",
        handle: "rhandie.sales.1",
        href: "https://www.facebook.com/rhandie.sales.1",
        accentColor: "#1877F2",
        description: "Say hi on Facebook",
    },
    {
        icon: Mail,
        label: "Email",
        handle: "rhandiesalesjr@gmail.com",
        href: "mailto:rhandiesalesjr@gmail.com",
        accentColor: "#E8A87C",
        description: "Drop me a message",
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="caustic-light relative overflow-hidden py-28 px-6 bg-[var(--ocean-deep)]">
            {/* Depth accents — drift at different rates like the hero layers */}
            <ParallaxDrift speed={40} className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[var(--mist-700)]/10 blur-3xl" />
            <ParallaxDrift speed={-30} className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--glow-amber)]/5 blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">

                <Reveal>
                    <span className="inline-block mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--glow-amber)] uppercase font-[var(--font-inter)]">
                        Get in Touch
                    </span>
                    <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--mist-100)] mb-5">
                        Let&apos;s <span className="text-[var(--glow-amber)]">Connect</span>
                    </h2>
                    <p className="text-[var(--mist-500)] text-lg font-[var(--font-inter)] mb-12 max-w-lg mx-auto">
                        Open to full-time roles, freelance contracts, speaking engagements, and collaboration.
                        I&apos;d love to hear from you.
                    </p>
                </Reveal>

                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactLinks.map((link, i) => (
                        <Reveal key={link.label} delay={i * 0.06}>
                            <a
                                href={link.href}
                                target={link.label !== "Email" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-4 rounded-2xl border border-[var(--ocean-border)] bg-[var(--ocean-surface)]/50 p-6 text-left transition-colors duration-300 hover:border-[var(--mist-700)] hover:bg-[var(--ocean-surface)]"
                            >
                                <div
                                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${link.accentColor}22`, border: `1px solid ${link.accentColor}33` }}
                                >
                                    <link.icon size={22} style={{ color: link.accentColor }} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-[var(--font-space-grotesk)] font-bold text-[var(--mist-100)] text-sm mb-0.5 flex items-center gap-2">
                                        {link.label}
                                        <ExternalLink size={12} className="text-[var(--mist-700)] group-hover:text-[var(--mist-300)] transition-colors" />
                                    </div>
                                    <div className="text-[var(--mist-300)] text-xs font-[var(--font-inter)] truncate">{link.handle}</div>
                                    <div className="text-[var(--mist-500)] text-[10px] font-[var(--font-inter)] mt-0.5">{link.description}</div>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
