import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Petits travaux de plomberie près de Nîmes",

  description:
    "HomeAToutFaire réalise de petits travaux de plomberie sur installations existantes à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/plomberie",
  },

  openGraph: {
    title: "Petits travaux de plomberie à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petites réparations de plomberie, robinetterie, équipements sanitaires et entretien courant autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/plomberie`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petits travaux de plomberie à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petits travaux de plomberie"
      description="Petits travaux de plomberie sur installations existantes : robinetterie, petites fuites accessibles, siphons, sanitaires et raccordements simples."
      path="/plomberie"
      breadcrumbName="Plomberie"
      title="Un petit souci de plomberie ?"
      intro="Un robinet à remplacer, un siphon qui fuit : regardons ensemble la petite intervention adaptée à votre installation existante."
      image="/images/realisations/realisation4.jpg"
      quoteService="Petits travaux de plomberie"
      scope="Décrivez la fuite ou l’équipement concerné. Des photos permettent souvent de préciser les pièces et l’accès avant déplacement."
      exclusions="Les prestations restent limitées aux petits travaux sur existant. Elles n’incluent pas la rénovation complète ni les transformations importantes des réseaux."
      items={[
        "Remplacement simple de robinetterie existante",
        "Petites réparations de fuites accessibles",
        "Remplacement simple de siphons et petits équipements",
        "Intervention sur évier, lavabo ou sanitaire existant",
        "Petits raccordements simples sur réseau déjà en place",
        "Entretien courant et petits dépannages accessibles",
      ]}
    />
  );
}
