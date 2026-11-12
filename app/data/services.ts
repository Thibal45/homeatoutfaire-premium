import { Bolt, Droplets, Hammer, PaintRoller, Waves, Wrench } from "lucide-react";

export const services = [
  {
    title: "Petits travaux électriques",
    description:
      "Remplacement d'interrupteurs, prises, luminaires et petits dépannages sur existant.",
    icon: Bolt,
    href: "/electricite",
  },
  {
    title: "Petits travaux de plomberie",
    description:
      "Petites réparations, robinetterie et dépannages simples sur installation existante.",
    icon: Wrench,
    href: "/plomberie",
  },
  {
    title: "Peinture",
    description:
      "Rafraîchissement, retouches et petits travaux de peinture avec finitions soignées.",
    icon: PaintRoller,
    href: "/peinture",
  },
  {
    title: "Menuiserie",
    description:
      "Montage, réglages, petites réparations et ajustements sur éléments existants.",
    icon: Hammer,
    href: "/menuiserie",
  },
  {
    title: "Entretien piscine",
    description:
      "Entretien ponctuel ou régulier, nettoyage courant et petites interventions sur votre piscine.",
    icon: Waves,
    href: "/entretien-piscine",
  },
  {
    title: "Petit dépannage",
    description:
      "Intervention sur les petits travaux nécessitant une prise en charge rapide.",
    icon: Droplets,
    href: "/depannage",
  },
];
