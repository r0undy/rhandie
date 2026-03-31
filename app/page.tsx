import ParallaxHero from "@/components/hero/ParallaxHero";
import AboutSection from "@/components/about/AboutSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CertificationsSection from "@/components/certifications/CertificationsSection";
import SpeakingSection from "@/components/speaking/SpeakingSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <AboutSection />
      <ProjectsSection />
      <CertificationsSection />
      <SpeakingSection />
      <ContactSection />
    </main>
  );
}
