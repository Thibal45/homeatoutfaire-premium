import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Artisan multiservices à Sainte-Anastasie | HomeAToutFaire",
    template: "%s | HomeAToutFaire",
  },

  description:
    "HomeAToutFaire, artisan multiservices à Sainte-Anastasie près de Nîmes : plomberie, électricité, peinture, menuiserie, entretien de piscine et dépannage dans un rayon de 50 km.",

  authors: [
    {
      name: "HomeAToutFaire",
      url: siteUrl,
    },
  ],

  creator: "HomeAToutFaire",
  publisher: "HomeAToutFaire",

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
    title:
      "Artisan multiservices à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux, plomberie, électricité, peinture, menuiserie, entretien de piscine et dépannage à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km.",

    url: siteUrl,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "HomeAToutFaire - Artisan multiservices à Sainte-Anastasie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Artisan multiservices à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux, dépannage, plomberie, électricité, peinture, menuiserie et entretien de piscine autour de Sainte-Anastasie et Nîmes.",

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