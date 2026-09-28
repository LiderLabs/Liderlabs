import HeroSection from "./HeroSection";
import WhoWeAreSection from "./WhoWeAreSection";
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
      <ProductStorySection />
      <ProcessSection/>
      <TrustedClientsSection/>
      <MetricsSection/>
      <CTASection/>
    </main>
  );
}




export default Home;