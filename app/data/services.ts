import {
  ElectricalIcon,
  PlumbingIcon,
  PaintingIcon,
  WoodworkIcon,
  PoolCareIcon,
  RepairIcon,
} from "../components/ServiceIcons";

export const services = [
  {
    title: "Petits travaux électriques",
    shortTitle: "Électricité",
    icon: ElectricalIcon,
    scope:
      "Sur installation existante. Sans création de circuits, rénovation complète ni mise en conformité.",
    href: "/electricite",
    description:
      "Des interventions simples sur votre installation existante, pour les petits besoins du quotidien.",
    image: "/images/realisations/petits-travaux-electriques-illustration.jpg",
    examples: [
      "Prises et interrupteurs existants",
      "Pose de luminaires sur alimentation existante",
      "Petits dépannages accessibles",
    ],
    quoteService: "Petits travaux électriques",
  },
  {
    title: "Petits travaux de plomberie",
    shortTitle: "Plomberie",
    icon: PlumbingIcon,
    scope:
      "Petits travaux sur existant. Sans rénovation complète ni transformation importante des réseaux.",
    href: "/plomberie",
    description:
      "Un robinet qui fatigue, un siphon à changer : on regarde ensemble la petite intervention adaptée.",
    image: "/images/realisations/realisation4.jpg",
    examples: [
      "Remplacement de robinetterie",
      "Siphons et petites fuites accessibles",
      "Interventions simples sur existant",
    ],
    quoteService: "Petits travaux de plomberie",
  },
  {
    title: "Peinture",
    shortTitle: "Peinture",
    icon: PaintingIcon,
    scope:
      "Rafraîchissements et reprises ciblées. Sans rénovation lourde, façade ni traitement technique spécialisé.",
    href: "/peinture",
    description:
      "Redonner de la lumière à une pièce, rafraîchir un plafond ou soigner les finitions de votre intérieur.",
    image: "/images/realisations/realisation1.jpg",
    examples: [
      "Murs et plafonds",
      "Préparation des supports et retouches",
      "Remises en peinture ciblées",
    ],
    quoteService: "Peinture",
  },
  {
    title: "Petits travaux de menuiserie",
    shortTitle: "Menuiserie",
    icon: WoodworkIcon,
    scope:
      "Réglages et réparations simples. Sans travaux structurels, gros ouvrages ni fabrication complexe.",
    href: "/menuiserie",
    description:
      "Les petits réglages et aménagements qui rendent votre maison plus agréable à vivre.",
    image: "/images/realisations/realisation2.jpg",
    examples: [
      "Montage de meubles et étagères",
      "Réglages de portes et poignées",
      "Petites réparations sur existant",
    ],
    quoteService: "Menuiserie",
  },
  {
    title: "Entretien de piscine",
    shortTitle: "Piscine",
    icon: PoolCareIcon,
    scope:
      "Entretien courant. Sans construction ou rénovation du bassin, modification importante du circuit hydraulique ni travaux électriques.",
    href: "/entretien-piscine",
    description:
      "Un entretien courant, ponctuel ou régulier, pour profiter plus sereinement de votre piscine.",
    image: "/images/realisations/realisation5.jpg",
    examples: [
      "Nettoyage courant du bassin",
      "Nettoyage de la ligne d’eau",
      "Entretien ponctuel ou régulier",
    ],
    quoteService: "Entretien piscine - ponctuel ou régulier",
  },
  {
    title: "Petit dépannage",
    shortTitle: "Dépannage",
    icon: RepairIcon,
    scope:
      "Sans mise en conformité, rénovation importante, travaux structurels ni intervention nécessitant une qualification spécifique.",
    href: "/depannage",
    description:
      "Un petit problème à résoudre ? Décrivez-le pour vérifier rapidement sa prise en charge.",
    image: "/images/realisations/realisation6.jpg",
    examples: [
      "Petites réparations du quotidien",
      "Remplacements et réglages simples",
      "Demande étudiée avant déplacement",
    ],
    quoteService: "Petit dépannage",
  },
];
