import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Travaux pour gîtes près de Nîmes",

  description:
    "Petits travaux et entretien courant pour résidences secondaires, gîtes et locations saisonnières autour de Sainte-Anastasie et Nîmes.",

  alternates: {
    canonical: "/residences-secondaires-gites",
  },

  openGraph: {
    title: "Résidences secondaires & gîtes près de Nîmes | HomeAToutFaire",

    description:
      "Un interlocuteur pour regrouper plusieurs petits travaux et besoins d'entretien courant dans votre résidence secondaire ou votre gîte.",

    url: `${siteUrl}/residences-secondaires-gites`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petits travaux pour résidences secondaires et gîtes",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petits travaux pour résidences secondaires et gîtes"
      description="Petits travaux multiservices, remises en état légères et entretien courant pour résidences secondaires, gîtes et locations saisonnières autour de Sainte-Anastasie et Nîmes."
      path="/residences-secondaires-gites"
      breadcrumbName="Résidences secondaires & gîtes"
      title="Votre maison, même quand vous n’y êtes pas."
      intro="Résidence secondaire ou gîte : regroupez les petits travaux et l’entretien courant auprès d’un interlocuteur local, à Sainte-Anastasie et aux alentours."
      image="/images/hero.jpg"
      quoteService="Résidence secondaire / gîte"
      scope="Nous définissons ensemble les petits travaux, les modalités d’accès et le tarif avant l’intervention, dans le cadre des prestations HomeAToutFaire."
      exclusions="L’accompagnement porte sur les petits travaux et l’entretien courant. Il n’inclut pas la rénovation lourde, les travaux structurels ou des prestations de gestion locative."
      items={[
        "Petites réparations de plomberie sur existant",
        "Appareillages électriques et luminaires existants",
        "Retouches et rafraîchissements de peinture",
        "Réglages de portes, poignées et placards",
        "Entretien courant de piscine",
        "Petits dépannages du quotidien",
      ]}
    />
  );
}
