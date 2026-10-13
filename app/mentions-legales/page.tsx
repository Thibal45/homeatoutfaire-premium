import type { Metadata } from "next";
import Link from "next/link";

import LegalPageLayout from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site HomeAToutFaire, artisan multiservices à Sainte-Anastasie dans le Gard.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticePage() {
  return (
    <LegalPageLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Les informations ci-dessous identifient l’éditeur, le responsable de la publication et l’hébergeur du site HomeAToutFaire."
      updatedAt="13 octobre 2026"
    >
      <section>
        <h2>Éditeur du site</h2>

        <p>
          Le site <strong>www.homeatoutfaire30.fr</strong> est édité par :
        </p>

        <address>
          <strong>Thibaut SACHOT — Entrepreneur individuel (EI)</strong>
          <br />
          Régime de la micro-entreprise
          <br />
          Nom commercial : HomeAToutFaire
          <br />
          28, rue du Bel Air
          <br />
          30190 Sainte-Anastasie — France
          <br />
          Téléphone : <a href="tel:0618085598">06 18 08 55 98</a>
          <br />
          E-mail : <a href="mailto:hatf30190@gmail.com">hatf30190@gmail.com</a>
        </address>

        <p>
          Cette adresse est l&apos;adresse administrative de l&apos;entreprise. Aucun
          accueil du public n&apos;y est assuré.
        </p>

        <p>
          SIRET : <strong>106 651 672 00011</strong>
          <br />
          SIREN / identifiant RNE : <strong>106 651 672</strong>
          <br />
          TVA non applicable — article 293 B du Code général des impôts
        </p>
      </section>

      <section>
        <h2>Responsable de la publication</h2>

        <p>Le responsable de la publication est Thibaut SACHOT.</p>
      </section>

      <section>
        <h2>Hébergement</h2>

        <p>Le site est hébergé par :</p>

        <address>
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Avenue #4133
          <br />
          Covina, CA 91723 — États-Unis
          <br />
          Site :{" "}
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            vercel.com
          </a>
          <br />
          Assistance :{" "}
          <a href="https://vercel.com/help" target="_blank" rel="noreferrer">
            vercel.com/help
          </a>
        </address>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>

        <p>
          La structure, les textes, les éléments graphiques et les signes
          distinctifs du site sont protégés par les règles applicables à la
          propriété intellectuelle. Toute reproduction, représentation,
          adaptation ou exploitation substantielle sans autorisation préalable
          est interdite, sauf exception prévue par la loi.
        </p>

        <p>
          Les images de la galerie sont présentées comme des photos
          d&apos;illustration des types de prestations proposés. Elles ne
          constituent pas une preuve de travaux réalisés chez un client donné.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>

        <p>
          HomeAToutFaire s&apos;efforce de fournir des informations exactes et à
          jour. Les prestations pouvant être prises en charge dépendent toutefois
          de la nature du besoin, de l&apos;installation existante et de
          l&apos;étude préalable de la demande.
        </p>

        <p>
          Les liens externes sont proposés à titre pratique. HomeAToutFaire ne
          contrôle pas le contenu ni la disponibilité des sites tiers.
        </p>
      </section>

      <section>
        <h2>Médiation de la consommation</h2>

        <p>
          Après avoir adressé une réclamation écrite à HomeAToutFaire et en
          l&apos;absence de réponse satisfaisante, le client consommateur peut
          recourir gratuitement au médiateur de la consommation dont relève
          l&apos;entreprise :
        </p>

        <address>
          <strong>
            CM2C — Centre de la Médiation de la Consommation de Conciliateurs
            de Justice
          </strong>
          <br />
          49 rue de Ponthieu
          <br />
          75008 Paris — France
          <br />
          Téléphone : <a href="tel:0189470014">01 89 47 00 14</a>
          <br />
          E-mail :{" "}
          <a href="mailto:declarer-un-litige@cm2c.net">
            declarer-un-litige@cm2c.net
          </a>
          <br />
          Site :{" "}
          <a
            href="https://www.cm2c.net/declarer-un-litige.php"
            target="_blank"
            rel="noreferrer"
          >
            www.cm2c.net
          </a>
        </address>
      </section>

      <section>
        <h2>Données personnelles</h2>

        <p>
          Les modalités de collecte et d&apos;utilisation des données personnelles
          sont détaillées dans la{" "}
          <Link href="/politique-confidentialite">
            politique de confidentialité
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
