export const ceilingProject = {
  title: "Rénovation d’un plafond après un dégât des eaux",
  location: "Sainte-Anastasie · Gard",
  description:
    "Reprise du plafond et remise en peinture après un dégât des eaux. Ces deux vues montrent le résultat après intervention.",
  steps: [
    "Réparation de la zone trouée et préparation avant mise en peinture.",
    "Application d’une peinture isolante anti-taches pour bloquer les marques du fond existant.",
    "Application d’une peinture de finition mate lessivable.",
  ],
  photos: [
    {
      image: "/images/realisations/plafond-apres-vue-sejour.jpg",
      title: "Plafond rénové — vue du séjour",
      alt: "Plafond blanc après rénovation, au-dessus du séjour avec le conduit du poêle au premier plan.",
      kind: "realisation" as const,
    },
    {
      image: "/images/realisations/plafond-apres-vue-poele.jpg",
      title: "Plafond rénové — seconde vue",
      alt: "Seconde vue du plafond après rénovation, autour du conduit du poêle et au-dessus des meubles du salon.",
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
    image: "/images/realisations/realisation3.jpg",
    title: "Installation électrique",
  },
  {
    image: "/images/realisations/realisation4.jpg",
    title: "Plomberie",
  },
  {
    image: "/images/realisations/realisation5.jpg",
    title: "Entretien piscine",
  },
  {
    image: "/images/realisations/realisation6.jpg",
    title: "Dépannage",
  },
].map((photo) => ({ ...photo, alt: photo.title, kind: "illustration" as const }));

// One shared lightbox, with the real project clearly separated from illustrations.
export const gallery = [...ceilingProject.photos, ...illustrations];
