import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "./components/CookieConsent";
import MotionPreferences from "./components/MotionPreferences";
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
    "Artisan multiservices à Sainte-Anastasie près de Nîmes : petite plomberie et électricité, peinture, menuiserie, piscine et dépannage dans un rayon de 50 km.",

  alternates: {
    canonical: "/",
  },

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
      "Petits travaux de plomberie et d'électricité sur existant, peinture, menuiserie, entretien de piscine et petit dépannage à Sainte-Anastasie, près de Nîmes.",

    url: siteUrl,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/homeatoutfaire-social-share.png",
        width: 1200,
        height: 630,
        alt: "HomeAToutFaire - Artisan multiservices à Sainte-Anastasie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Artisan multiservices à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux multiservices, entretien courant et petit dépannage autour de Sainte-Anastasie et Nîmes.",

    images: ["/images/homeatoutfaire-social-share.png"],
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
        <a className="skip-link" href="#contenu-principal">
          Aller au contenu principal
        </a>

        <MotionPreferences>{children}</MotionPreferences>

        <CookieConsent />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
