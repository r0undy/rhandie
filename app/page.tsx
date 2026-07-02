import ParallaxHero from "@/components/hero/ParallaxHero";
import AboutSection from "@/components/about/AboutSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CredentialsSection from "@/components/credentials/CredentialsSection";
import SpeakingSection from "@/components/speaking/SpeakingSection";
import ContactSection from "@/components/contact/ContactSection";
import PortfolioSections from "@/components/portfolio/PortfolioSections";
import PortfolioChooser from "@/components/portfolio/PortfolioChooser";
import ModeSwitcher from "@/components/portfolio/ModeSwitcher";

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <AboutSection />
      <PortfolioSections
        technical={
          <>
            <ProjectsSection />
            <CredentialsSection />
          </>
        }
        speaker={<SpeakingSection />}
      />
      <ContactSection />
      <PortfolioChooser />
      <ModeSwitcher />
    </main>
  );
}
