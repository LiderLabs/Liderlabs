import HeroSection from "./HeroSection";
import WhoWeAreSection from "./WhoWeAreSection";
import ProvenSystemsSection from "../Clients/ProvenSystemsSection";
import ProductStorySection from "./ProductStorySection";
import ProcessSection from "./ProcessSection";
import TrustedClientsSection from "./TrustedClientsSection";
import MetricsSection from "./MetricsSection";
import CTASection from "./CTASection";

function Home() {
  return (
    <main>
      <HeroSection />
      <WhoWeAreSection />
      <ProvenSystemsSection/>
      <ProductStorySection />
      <ProcessSection/>
      <TrustedClientsSection/>
      <MetricsSection/>
      <CTASection/>
    </main>
  );
}




export default Home;