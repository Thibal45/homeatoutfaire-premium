import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Petits travaux de menuiserie près de Nîmes",

  description:
    "HomeAToutFaire réalise vos petits travaux de menuiserie, réglages et réparations simples à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/menuiserie",
  },

  openGraph: {
    title: "Petits travaux de menuiserie à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Réglages, petites réparations et interventions simples de menuiserie sur existant autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/menuiserie`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petits travaux de menuiserie à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petits travaux de menuiserie"
      description="Réglages, ajustements, petites réparations et remplacements simples sur des éléments de menuiserie existants."
      path="/menuiserie"
      breadcrumbName="Menuiserie"
      title="Les petits réglages qui changent le quotidien."
      intro="Une porte qui frotte, une poignée à changer, une étagère à poser : des ajustements et petites réparations sur vos éléments existants."
      image="/images/realisations/realisation2.jpg"
      quoteService="Menuiserie"
      scope="Des photos et quelques dimensions permettent de vérifier la prise en charge, les fixations et les petits accessoires nécessaires."
      exclusions="Les prestations concernent les réglages, réparations et remplacements simples sur existant. Elles n’incluent pas les travaux structurels, les gros ouvrages ni les fabrications complexes."
      items={[
        "Réglage simple de portes et ouvrants existants",
        "Petites réparations sur portes, placards et éléments bois",
        "Remplacement simple de poignées et quincailleries",
        "Pose de petites étagères et accessoires",
        "Petites reprises sur éléments de menuiserie existants",
        "Ajustements et réparations simples du quotidien",
      ]}
    />
  );
}
