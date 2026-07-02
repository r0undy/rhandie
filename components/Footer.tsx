const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Credentials", href: "#credentials" },
    { label: "Speaking", href: "#speaking" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rhandie-sales/" },
    { label: "GitHub", href: "https://github.com/Roundyy" },
    { label: "Facebook", href: "https://www.facebook.com/rhandie.sales.1" },
];

export default function Footer() {
    return (
        <footer className="relative bg-[var(--ocean-abyss)] border-t border-[var(--ocean-border)]/40">
            {/* Descent gradient — the page settles into the abyss */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--ocean-deep)] to-transparent" />

            {/* Main footer body */}
            <div className="relative max-w-[72em] mx-auto px-[1.5em] py-[4em] flex flex-col sm:flex-row items-start justify-between gap-[3em]">

                {/* Left — Brand */}
                <div className="flex flex-col gap-[1em] max-w-[20em]">
                    <span className="font-[var(--font-space-grotesk)] font-bold text-[var(--mist-100)] text-[1.25em] tracking-tight">
                        rhandie<span className="text-[var(--glow-amber)]">.</span>
                    </span>
                    <p className="text-[var(--mist-500)] text-[0.875em] leading-relaxed font-[var(--font-inter)]">
                        Full-stack engineer & tech speaker building<br /> AI-powered, cloud-native products with<br /> Next.js, TypeScript, & Azure
                    </p>
                    <p className="text-[var(--mist-700)] text-[0.75em] font-[var(--font-inter)]">
                        Beta MSA · StellarPH100 · Hackathon Champion · Philippines
                    </p>
                    {/* Accent line */}
                    <div className="w-[2.5em] h-[0.125em] bg-[var(--glow-amber)]/60 rounded-full" />
                </div>

                {/* Right — Navigation + Connect */}
                <div className="flex flex-row gap-[4em]">

                    {/* Navigation */}
                    <div className="flex flex-col gap-[1em]">
                        <p className="text-[0.75em] font-semibold tracking-[0.2em] uppercase text-[var(--glow-amber)] font-[var(--font-inter)]">
                            Navigation
                        </p>
                        <nav className="flex flex-col gap-[0.75em]">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-[0.875em] text-[var(--mist-500)] hover:text-[var(--mist-100)] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-[1em]">
                        <p className="text-[0.75em] font-semibold tracking-[0.2em] uppercase text-[var(--glow-amber)] font-[var(--font-inter)]">
                            Connect
                        </p>
                        <div className="flex flex-col gap-[0.75em]">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[0.875em] text-[var(--mist-500)] hover:text-[var(--mist-100)] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="mailto:salesrhandie@gmail.com"
                                className="text-[0.875em] text-[var(--mist-500)] hover:text-[var(--mist-100)] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                            >
                                Email
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--ocean-border)]/30">
                <div className="max-w-[72em] mx-auto px-[1.5em] py-[1.25em] flex justify-center">
                    <p className="text-[var(--mist-700)] text-[0.75em] font-[var(--font-inter)]">
                        © 2026 rhandie. All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    );
}
