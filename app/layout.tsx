import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.homeatoutfaire.fr"),
  title: "HomeAToutFaire | Multi-services à Sainte-Anastasie (30190)",
  description:
    "HomeAToutFaire réalise vos petits travaux de plomberie, électricité, peinture, menuiserie, entretien de piscine et dépannage d'urgence dans un rayon de 50 km autour de Sainte-Anastasie.",
  keywords: [
    "multi-services",
    "artisan",
    "petits travaux",
    "plomberie",
    "électricité",
    "peinture",
    "menuiserie",
    "entretien piscine",
    "dépannage",
    "Sainte-Anastasie",
    "Nîmes",
    "Gard",
  ],
  authors: [{ name: "HomeAToutFaire" }],
  creator: "HomeAToutFaire",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "HomeAToutFaire",
    description: "Votre spécialiste des petits travaux dans le Gard.",
    url: "/",
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "Logo HomeAToutFaire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeAToutFaire",
    description:
      "Petits travaux, dépannage, entretien piscine, peinture, plomberie et électricité.",
    images: ["/images/logo-homeatoutfaire.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
