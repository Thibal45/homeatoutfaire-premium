export const ceilingProject = {
  title: "Rénovation d’un plafond après un dégât des eaux",
  location: "Sainte-Anastasie · Gard",
  description:
    "Réparation du plafond, traitement des marques du fond existant et remise en peinture à Sainte-Anastasie. L’état avant travaux est présenté sous forme de reconstitution illustrative, accompagné du résultat après intervention.",
  steps: [
    "Réparation de la zone trouée et préparation avant mise en peinture.",
    "Application d’une peinture isolante anti-taches pour bloquer les marques du fond existant.",
    "Application d’une peinture de finition mate lessivable.",
  ],
  photos: [
    {
      image: "/images/realisations/plafond-avant-reconstitution.jpg",
      title: "Avant — reconstitution illustrative",
      alt: "Reconstitution illustrative du plafond avant travaux, avec deux zones tachées et une ouverture près du conduit du poêle.",
      label: "Reconstitution illustrative · État avant travaux non photographié",
      caption: "État avant travaux non photographié : reconstitution illustrative à partir d’une photo après intervention.",
      width: 1448,
      height: 1086,
      kind: "reconstitution" as const,
    },
    {
      image: "/images/realisations/plafond-apres-angle-comparable-retouche.jpg",
      title: "Après — plafond rénové",
      alt: "Vue retouchée du plafond blanc après travaux, autour du conduit du poêle, avec les murs orange du séjour.",
      label: "Après intervention · Photo retouchée",
      caption: "Photo après travaux retouchée : luminosité et blanc du plafond harmonisés.",
      width: 1448,
      height: 1086,
      kind: "realisation" as const,
    },
    {
      image: "/images/realisations/plafond-apres-sejour-ameliore.jpg",
      title: "Après — autre vue du séjour",
      alt: "Plafond remis en peinture au-dessus du séjour, avec le conduit du poêle au premier plan et la lumière naturelle sur les meubles.",
      label: "Après intervention · Rendu photo amélioré",
      caption: "Photo après intervention, avec amélioration du rendu de l’image.",
      width: 1448,
      height: 1086,
      kind: "realisation" as const,
    },
  ],
};

export const illustrations = [
  {
    image: "/images/realisations/realisation1.jpg",
    title: "Peinture intérieure",
  },
  {
    image: "/images/realisations/realisation2.jpg",
    title: "Menuiserie",
  },
  {
    image: "/images/realisations/petits-travaux-electriques-illustration.jpg",
    title: "Petits travaux électriques",
  },
  {
    image: "/images/realisations/realisation4.jpg",
    title: "Petits travaux de plomberie",
  },
  {
    image: "/images/realisations/realisation5.jpg",
    title: "Entretien piscine",
  },
  {
    image: "/images/realisations/realisation6.jpg",
    title: "Dépannage",
  },
].map((photo) => ({ ...photo, alt: photo.title, label: "Illustration de prestation", kind: "illustration" as const }));

// Shared lightbox; provenance is visible for every image.
export const gallery = [...ceilingProject.photos, ...illustrations];
