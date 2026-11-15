import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Testimonials from "./components/Testimonials.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link visually-hidden"
        style={{ position: "absolute", top: "-100px" }}
        onFocus={(e) => e.currentTarget.classList.remove("visually-hidden")}
        onBlur={(e) => e.currentTarget.classList.add("visually-hidden")}
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Testimonials />
        <ContactForm />

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
