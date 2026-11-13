import type { Metadata } from "next";
import ServiceDetail from "../components/ServiceDetail";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title: "Petit dépannage près de Nîmes",

  description:
    "HomeAToutFaire intervient pour vos petits dépannages et réparations courantes à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/depannage",
  },

  openGraph: {
    title: "Petit dépannage à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits dépannages, réparations courantes et interventions simples autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/depannage`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Petit dépannage à Sainte-Anastasie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ServiceDetail
      name="Petit dépannage"
      description="Petits dépannages et réparations courantes sur des installations ou équipements existants, dans le périmètre des prestations HomeAToutFaire."
      path="/depannage"
      breadcrumbName="Dépannage"
      title="Un petit problème ? Parlons solution."
      intro="Réparations, réglages et remplacements simples : décrivez le problème rencontré pour vérifier rapidement sa prise en charge."
      image="/images/realisations/realisation6.jpg"
      quoteService="Petit dépannage"
      scope="La nature du problème et une photo si nécessaire permettent de vérifier l’intervention et les disponibilités avant déplacement. Le dimanche matin est réservé aux dépannages d’extrême urgence, selon disponibilité."
      exclusions="Le petit dépannage n’inclut pas les mises en conformité, rénovations importantes, travaux structurels ou interventions nécessitant une qualification spécifique."
      items={[
        "Petites réparations du quotidien",
        "Remplacement simple d’un élément défectueux existant",
        "Petits dépannages de plomberie accessibles",
        "Petits dépannages électriques sur installation existante",
        "Réglages et petites réparations de menuiserie",
        "Interventions simples relevant des services HomeAToutFaire",
      ]}
    />
  );
}
