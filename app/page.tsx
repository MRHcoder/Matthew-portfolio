import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { MiroSection } from "@/components/sections/MiroSection";
import { MattBotSection } from "@/components/sections/MattBotSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <SkillsSection />
      <MiroSection />
      <MattBotSection />
      <Footer />
    </main>
  );
}