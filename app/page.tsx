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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.homeatoutfaire30.fr/#business",

  name: "HomeAToutFaire",

  url: "https://www.homeatoutfaire30.fr",

  telephone: "+33618085598",

  image: "https://www.homeatoutfaire30.fr/images/logo-homeatoutfaire.png",

  logo: "https://www.homeatoutfaire30.fr/images/logo-homeatoutfaire.png",

  description:
    "HomeAToutFaire réalise vos petits travaux de plomberie, électricité, peinture, menuiserie, entretien de piscine et dépannage dans un rayon de 50 km autour de Sainte-Anastasie.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "28 rue du Bel Air",
    postalCode: "30190",
    addressLocality: "Sainte-Anastasie",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },

  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      addressCountry: "FR",
      addressLocality: "Sainte-Anastasie",
    },
    geoRadius: "50000",
  },

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

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services HomeAToutFaire",

    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux de plomberie",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Petits travaux électriques",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Peinture",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Menuiserie",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Entretien de piscine",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dépannage",
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
      <Gallery />
      <Stats />
      <Quote />
      <Contact />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}