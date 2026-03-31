const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Speaking", href: "#speaking" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rhandie-sales/" },
    { label: "GitHub", href: "https://github.com/r0undy" },
    { label: "Facebook", href: "https://www.facebook.com/rhandie.sales.1" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0E1220] border-t border-[#3D4F7C]/30">

            {/* Main footer body */}
            <div className="max-w-[72em] mx-auto px-[1.5em] py-[4em] flex flex-col sm:flex-row items-start justify-between gap-[3em]">

                {/* Left — Brand */}
                <div className="flex flex-col gap-[1em] max-w-[20em]">
                    <span className="font-[var(--font-space-grotesk)] font-bold text-[#EEF0F7] text-[1.25em] tracking-tight">
                        rhandie<span className="text-[#E8A87C]">.</span>
                    </span>
                    <p className="text-[#8A96B8] text-[0.875em] leading-relaxed font-[var(--font-inter)]">
                        Full-stack cloud-native engineer building<br /> scalable web applications with React.js,<br /> TypeScript, & .NET
                    </p>
                    <p className="text-[#5A6485] text-[0.75em] font-[var(--font-inter)]">
                        Beta MSA · StellarPH100 · Philippines
                    </p>
                    {/* Accent line */}
                    <div className="w-[2.5em] h-[0.125em] bg-[#E8A87C]/60 rounded-full" />
                </div>

                {/* Right — Navigation + Connect */}
                <div className="flex flex-row gap-[4em]">

                    {/* Navigation */}
                    <div className="flex flex-col gap-[1em]">
                        <p className="text-[0.75em] font-semibold tracking-widest uppercase text-[#E8A87C] font-[var(--font-inter)]">
                            Navigation
                        </p>
                        <nav className="flex flex-col gap-[0.75em]">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-[0.875em] text-[#8A96B8] hover:text-[#EEF0F7] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-[1em]">
                        <p className="text-[0.75em] font-semibold tracking-widest uppercase text-[#E8A87C] font-[var(--font-inter)]">
                            Connect
                        </p>
                        <div className="flex flex-col gap-[0.75em]">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[0.875em] text-[#8A96B8] hover:text-[#EEF0F7] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="mailto:salesrhandie@gmail.com"
                                className="text-[0.875em] text-[#8A96B8] hover:text-[#EEF0F7] transition-colors duration-200 font-[var(--font-inter)] w-fit"
                            >
                                Email
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#3D4F7C]/20">
                <div className="max-w-[72em] mx-auto px-[1.5em] py-[1.25em] flex justify-center">
                    <p className="text-[#3D4F7C] text-[0.75em] font-[var(--font-inter)]">
                        © 2026 rhandie. All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    );
}
