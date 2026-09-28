import AboutHeroSection from "./AboutHeroSection";
import AboutWhoWeAreSection from "./AboutWhoWeAreSection";
import CareersCTASection from "./CareersCTASection";
import EngineeringPrinciplesSection from "./EngineeringPrinciplesSection";
import TrustedEcosystemSection from "./TrustedEcosystemSection";

function About() {
  return (
    <main>
      <AboutHeroSection />
      <AboutWhoWeAreSection />
      <EngineeringPrinciplesSection/>
      <TrustedEcosystemSection/>
      <CareersCTASection/>
    </main>
  );
}

export default About;