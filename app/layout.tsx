import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "HomeAToutFaire | Multi-services à Sainte-Anastasie (30190)",
    template: "%s | HomeAToutFaire",
  },

  description:
    "HomeAToutFaire réalise vos petits travaux de plomberie, électricité, peinture, menuiserie, entretien de piscine et dépannage d'urgence dans un rayon de 50 km autour de Sainte-Anastasie.",

  keywords: [
    "HomeAToutFaire",
    "multi-services",
    "artisan",
    "petits travaux",
    "plomberie",
    "électricité",
    "peinture",
    "menuiserie",
    "entretien piscine",
    "dépannage",
    "dépannage urgence",
    "Sainte-Anastasie",
    "30190",
    "Nîmes",
    "Gard",
    "artisan Sainte-Anastasie",
    "multi-services Sainte-Anastasie",
    "petits travaux Gard",
  ],

  authors: [
    {
      name: "HomeAToutFaire",
      url: siteUrl,
    },
  ],

  creator: "HomeAToutFaire",
  publisher: "HomeAToutFaire",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "HomeAToutFaire | Multi-services à Sainte-Anastasie",
    description:
      "Petits travaux, dépannage et entretien à Sainte-Anastasie et dans un rayon de 50 km.",
    url: siteUrl,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "HomeAToutFaire - Auto-entrepreneur multi-services à Sainte-Anastasie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "HomeAToutFaire | Multi-services à Sainte-Anastasie",

    description:
      "Petits travaux, dépannage, entretien piscine, peinture, plomberie, électricité et menuiserie dans le Gard.",

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
      <body>
        {children}

        <CookieConsent />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}