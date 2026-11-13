import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Entretien piscine près de Nîmes",

  description:
    "Entretien ponctuel ou régulier de piscine près de Sainte-Anastasie et Nîmes : nettoyage courant et petites interventions sur existant, jusqu'à 50 km.",

  alternates: {
    canonical: "/entretien-piscine",
  },

  openGraph: {
    title: "Entretien de piscine à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Entretien de piscine ponctuel ou régulier, nettoyage courant et petites interventions autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/entretien-piscine`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Entretien de piscine à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Entretien courant de piscine"
      description="Entretien de piscine ponctuel ou régulier, nettoyage courant et petites opérations accessibles sur une piscine et ses équipements déjà installés."
      path="/entretien-piscine"
      breadcrumbName="Entretien de piscine"
      title="Votre piscine. Le plaisir d’en profiter."
      intro="Un entretien courant, ponctuel ou régulier, pour votre bassin et ses équipements déjà installés. À Sainte-Anastasie, près de Nîmes et aux alentours."
      image="/images/realisations/realisation5.jpg"
      quoteService="Entretien piscine - ponctuel ou régulier"
      scope="Une vue du bassin et des équipements permet de préciser le besoin et les accès. La fréquence d’entretien est convenue ensemble."
      exclusions="Les prestations n’incluent pas la construction ou la rénovation du bassin, les modifications importantes du circuit hydraulique ni les travaux électriques de piscine."
      items={[
        "Nettoyage courant du bassin",
        "Nettoyage de la ligne d’eau et des surfaces accessibles",
        "Vidage et nettoyage des paniers de skimmers",
        "Nettoyage des éléments de filtration accessibles",
        "Contrôle courant de l’état général de la piscine",
        "Petites interventions d’entretien sur équipements existants",
      ]}
    />
  );
}
