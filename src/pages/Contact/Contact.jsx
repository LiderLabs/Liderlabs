import ContactHubSection from "./ContactHubSection";
import ContactOverviewSection from "./ContactOverviewSection";
import FAQSection from "./FAQSection";

function Contact() {
  return (
    <main>
      <ContactOverviewSection />
      <ContactHubSection/>
      <FAQSection/>
    </main>
  );
}

export default Contact;