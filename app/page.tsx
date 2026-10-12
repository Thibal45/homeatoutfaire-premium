import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.homeatoutfaire30.fr/#business",

  name: "HomeAToutFaire",

  url: "https://www.homeatoutfaire30.fr",

  telephone: "+33618085598",

  email: "hatf30190@gmail.com",

  image: "https://www.homeatoutfaire30.fr/images/logo-homeatoutfaire.png",

  logo: "https://www.homeatoutfaire30.fr/images/logo-homeatoutfaire.png",

  description:
    "HomeAToutFaire propose des petits travaux multiservices, de l’entretien courant et de petits dépannages à Sainte-Anastasie, près de Nîmes, et jusqu’à environ 50 km aux alentours.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "28, rue du Bel Air",
    postalCode: "30190",
    addressLocality: "Sainte-Anastasie",
    addressRegion: "Gard",
    addressCountry: "FR",
  },

  areaServed:
    "Sainte-Anastasie et jusqu’à environ 50 km aux alentours",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],

  identifier: {
    "@type": "PropertyValue",
    propertyID: "SIRET",
    value: "10665167200011",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Petits travaux et services HomeAToutFaire",

    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux de plomberie",
          url: "https://www.homeatoutfaire30.fr/plomberie",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux électriques",
          url: "https://www.homeatoutfaire30.fr/electricite",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux de peinture",
          url: "https://www.homeatoutfaire30.fr/peinture",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux de menuiserie",
          url: "https://www.homeatoutfaire30.fr/menuiserie",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Entretien courant de piscine",
          url: "https://www.homeatoutfaire30.fr/entretien-piscine",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petit dépannage",
          url: "https://www.homeatoutfaire30.fr/depannage",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux pour résidences secondaires et gîtes",
          url: "https://www.homeatoutfaire30.fr/residences-secondaires-gites",
        },
      },
    ],
  },
};
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ScrollProgress />
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <About />
      <Gallery />
      <Reviews />
      <Stats />
      <Quote />
      <Contact />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}