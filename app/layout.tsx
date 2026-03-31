import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rhandie.",
  description:
    "Portfolio of Rhandie J. Sales Jr., a full-stack cloud-native engineer from the Philippines specializing in Next.js, TypeScript, .NET, Django, and cloud platforms including Azure, AWS, and GCP.",
  keywords: [
    "Rhandie",
    "Rhandie Sales",
    "Rhandie J. Sales Jr.",
    "Full-Stack Engineer Philippines",
    "Software Engineer Philippines",
    "Next.js Philippines",
    "TypeScript Philippines",
    "React Philippines",
    "Azure Philippines",
    "AWS Philippines",
    "GCP Philippines",
    "Philippines",
    "web development",
    "MSA PH",
    "Microsoft Student Ambassador",
    "Beta MSA",
  ],
  authors: [{ name: "Rhandie J. Sales Jr." }],
  openGraph: {
    title: "rhandie.",
    description:
      "Full-stack cloud-native engineer building scalable web applications with Next.js, TypeScript, .NET, Django, and modern cloud platforms.",
    type: "website",
  },
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
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
