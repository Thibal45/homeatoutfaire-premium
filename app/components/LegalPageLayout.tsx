import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
};
export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: Props) {
  return (
    <>
      <Header />
      <main id="contenu-principal" className="legal-page">
        <div className="site-container">
          <nav aria-label="Fil d’Ariane" className="service-breadcrumb">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{eyebrow}</span>
          </nav>
          <div className="legal-page-heading">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
            <small>Dernière mise à jour : {updatedAt}</small>
          </div>
          <article className="legal-content">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
