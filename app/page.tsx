import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <Stats />
      <Quote />
      <Contact />
      <Footer />
      <BackToTop/>
      <WhatsAppButton />
    </>
  );
}