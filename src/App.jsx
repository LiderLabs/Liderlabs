import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToHash from "./components/ScrollToHash";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Clients from "./pages/Clients/Clients";
import Contact from "./pages/Contact/Contact";
import ContactSales from "./pages/Contact/ContactSales";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <ScrollToHash />

      <div className="flex-1">
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
      </div>

      <Footer />
    </div>
  );
}

export default App;