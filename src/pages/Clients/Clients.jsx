import ClientsCTASection from "./ClientsCTASection";
import ClientsHeroSection from "./ClientsHeroSection";
import ClientsMetricsSection from "./ClientsMetricsSection";
import ProvenSystemsSection from "./ProvenSystemsSection";
import TestimonialsSection from "./TestimonialsSection";
import TrustedBusinessesSection from "./TrustedBusinessesSection";

function Clients() {
  return (
    <main>
      <ClientsHeroSection />
      <ClientsMetricsSection />
      <ProvenSystemsSection/>
      <TestimonialsSection/>
      <TrustedBusinessesSection/>
      <ClientsCTASection/>
    </main>
  );
}

export default Clients;