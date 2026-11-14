import type { Metadata } from "next";
import MobileApp from "../components/mobile/MobileApp";

export const metadata: Metadata = {
  title: "Mon carnet de petits travaux",
  description:
    "Préparez vos petits travaux HomeAToutFaire : projets et photos conservés sur votre appareil, prestations et contact avec Thibaut SACHOT.",
  alternates: { canonical: "/application" },
};

export default function ApplicationPage() {
  return <MobileApp />;
}
