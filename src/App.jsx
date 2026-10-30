import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToHash from "./components/ScrollToHash";

// Home stays in the main bundle (first paint); other routes load on demand.
import Home from "./pages/Home/Home";

const About = lazy(() => import("./pages/About/About"));
const Services = lazy(() => import("./pages/Services/Services"));
const Clients = lazy(() => import("./pages/Clients/Clients"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const ContactSales = lazy(() => import("./pages/Contact/ContactSales"));

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <ScrollToHash />

      <div className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/contact/sales"
              element={<ContactSales />}
            />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
