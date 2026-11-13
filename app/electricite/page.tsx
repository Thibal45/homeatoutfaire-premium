import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Petits travaux électriques près de Nîmes",

  description:
    "HomeAToutFaire réalise de petits travaux électriques sur installation existante à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/electricite",
  },

  openGraph: {
    title: "Petits travaux électriques à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux électriques sur installation existante : prises, interrupteurs, luminaires et petits dépannages autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/electricite`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petits travaux électriques à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petits travaux électriques"
      description="Petits travaux électriques simples sur installation existante : remplacement d’appareillage, luminaires, petits équipements et dépannages accessibles."
      path="/electricite"
      breadcrumbName="Électricité"
      title="Petits travaux électriques, esprit tranquille."
      intro="Prises, interrupteurs, luminaires : je vous accompagne pour de petites interventions sur votre installation existante, à Sainte-Anastasie et près de Nîmes."
      image="/images/realisations/petits-travaux-electriques-illustration.jpg"
      quoteService="Petits travaux électriques"
      scope="Une description du point concerné et une photo permettent de vérifier la possibilité d’intervention sur l’existant."
      exclusions="Les prestations n’incluent pas la création de circuits, la rénovation complète ni la mise en conformité d’une installation."
      items={[
        "Remplacement à l’identique de prises existantes",
        "Remplacement à l’identique d’interrupteurs existants",
        "Pose ou remplacement simple de luminaires sur alimentation existante",
        "Remplacement de petits appareillages électriques existants",
        "Petits raccordements simples sur une installation existante",
        "Petits dépannages accessibles sur installation existante",
      ]}
    />
  );
}
