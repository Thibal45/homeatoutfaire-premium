import type { Metadata } from "next";
import Link from "next/link";
import PrivacyContent from "../../components/mobile/PrivacyContent";
import "../../components/mobile/mobile.css";

export const metadata: Metadata = {
  title: "Confidentialité du carnet Android",
  description:
    "Données locales, photos choisies et partage explicite : fonctionnement du carnet HomeAToutFaire sur Android et sur le web.",
  alternates: { canonical: "/application/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <div className="hatf-app">
      <header className="app-topbar">
        <Link href="/application" className="app-brand">
          HomeAToutFaire<small>Le carnet de vos petits travaux</small>
        </Link>
        <Link href="/" className="app-text-link">
          Le site
        </Link>
      </header>
      <main id="contenu-principal" className="app-content">
        <section className="app-privacy">
          <p className="app-eyebrow">CONFIDENTIALITÉ · 14 NOVEMBRE 2026</p>
          <h1>
            Un carnet qui reste <em>entre vos mains.</em>
          </h1>
          <div className="app-paper">
            <PrivacyContent />
            <h2>Une demande transmise à HomeAToutFaire</h2>
            <p>
              Lorsque vous nous adressez votre dossier, les informations reçues
              servent à étudier votre demande et à organiser notre échange. Le
              traitement et la conservation de ces demandes sont précisés dans
              la politique de confidentialité du site. Les données partagées
              avec un autre service suivent également sa propre politique.
            </p>
            <Link href="/politique-confidentialite" className="app-text-link">
              Consulter la politique du site
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
