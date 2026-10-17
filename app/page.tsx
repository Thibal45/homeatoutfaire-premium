import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ServiceArea from "./components/ServiceArea";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { serviceAreaNames } from "./data/service-areas";

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

  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=HomeAToutFaire&query_place_id=ChIJp5B_zKJ7l40RhGKlLKRL-C4",
    "https://www.facebook.com/profile.php?id=61595599822418",
  ],

  description:
    "HomeAToutFaire propose des petits travaux multiservices, de l’entretien courant et de petits dépannages à Sainte-Anastasie, près de Nîmes, et jusqu’à environ 50 km aux alentours.",

  address: {
    "@type": "PostalAddress",
    postalCode: "30190",
    addressLocality: "Sainte-Anastasie",
    addressRegion: "Gard",
    addressCountry: "FR",
  },

  areaServed: serviceAreaNames,

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
          name: "Entretien de piscine ponctuel ou régulier",
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
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ScrollProgress />
      <Header />

      <main id="contenu-principal">
        <Hero />
        <Services />
        <ServiceArea />
        <About />
        <Gallery />
        <Reviews />
        <Stats />
        <Quote />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
