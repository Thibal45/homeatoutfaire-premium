import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Petits travaux de peinture près de Nîmes",

  description:
    "HomeAToutFaire réalise vos petits travaux de peinture et rafraîchissement intérieur à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/peinture",
  },

  openGraph: {
    title: "Petits travaux de peinture à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux de peinture intérieure, retouches et rafraîchissement autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/peinture`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petits travaux de peinture à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petits travaux de peinture"
      description="Rafraîchissement intérieur, retouches et petits travaux de peinture sur des zones ciblées et supports existants."
      path="/peinture"
      breadcrumbName="Peinture"
      title="Un peu de couleur. Beaucoup de soin."
      intro="Un mur, un plafond ou une pièce à rafraîchir : des reprises ciblées et des finitions soignées pour retrouver un intérieur agréable."
      image="/images/realisations/realisation1.jpg"
      quoteService="Peinture"
      scope="Quelques dimensions et une photo du support aident à évaluer le travail. L’état de la surface est vérifié avant intervention."
      exclusions="Les prestations concernent les rafraîchissements et reprises ciblées. Elles n’incluent pas les rénovations lourdes, les façades ni les traitements techniques spécialisés."
      items={[
        "Rafraîchissement de petites surfaces murales",
        "Retouches de peinture après réparation ou petits travaux",
        "Remise en peinture d’un mur ou d’une zone limitée",
        "Peinture de petites pièces ou espaces ciblés",
        "Préparation légère des supports avant peinture",
        "Petites finitions et reprises de peinture intérieure",
      ]}
    />
  );
}
