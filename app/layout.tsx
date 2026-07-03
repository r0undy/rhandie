import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortfolioModeProvider } from "@/components/portfolio/PortfolioModeContext";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIALS } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Rhandie Sales",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rhandie",
    "Rhandie Sales",
    "Rhandie J. Sales Jr.",
    "Full-Stack Engineer Philippines",
    "Software Engineer Philippines",
    "Tech Speaker Philippines",
    "AI Engineer Philippines",
    "Hackathon Champion Philippines",
    "Next.js Philippines",
    "TypeScript Philippines",
    "React Philippines",
    "Azure Philippines",
    "Microsoft Student Ambassador",
    "MSA PH",
    "Beta MSA",
    "StellarPH100",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "rhandie.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rhandie Sales — Full-Stack Engineer & Tech Speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Full-Stack Engineer",
      description: SITE_DESCRIPTION,
      nationality: "Filipino",
      knowsAbout: [
        "Full-Stack Development",
        "Cloud Computing",
        "AI Engineering",
        "Microsoft Azure",
        "Next.js",
        "TypeScript",
        "Public Speaking",
      ],
      sameAs: [SOCIALS.github, SOCIALS.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "rhandie.",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#1A1F35] text-[#EEF0F7]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <PortfolioModeProvider>
            <Navbar />
            {children}
            <Footer />
          </PortfolioModeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
