import ParallaxHero from "@/components/hero/ParallaxHero";
import AboutSection from "@/components/about/AboutSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CredentialsSection from "@/components/credentials/CredentialsSection";
import SpeakingSection from "@/components/speaking/SpeakingSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <AboutSection />
      <ProjectsSection />
      <CredentialsSection />
      <SpeakingSection />
      <ContactSection />
    </main>
  );
}
