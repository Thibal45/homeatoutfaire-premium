import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site HomeAToutFaire.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-5 pb-16 pt-28 text-slate-700 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10">
        <article className="mx-auto max-w-[980px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
            Informations légales
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#06192B] sm:text-4xl">
            Mentions légales
          </h1>

          <LegalSection title="Éditeur du site">
            <p><strong>Nom commercial :</strong> HomeAToutFaire</p>
            <p><strong>Forme :</strong> entrepreneur individuel</p>
            <p><strong>Identité de l’entrepreneur :</strong> Thibaut SACHOT</p>
            <p><strong>SIRET :</strong> 10665167200011</p>
            <p><strong>Adresse :</strong> 28, rue du Bel Air, 30190 Sainte-Anastasie, France</p>
            <p><strong>Téléphone :</strong> <a className="underline hover:text-[#0A6587]" href="tel:0618085598">06 18 08 55 98</a></p>
            <p><strong>E-mail :</strong> <a className="underline hover:text-[#0A6587]" href="mailto:hatf30190@gmail.com">hatf30190@gmail.com</a></p>
          </LegalSection>

          <LegalSection title="Directeur de la publication">
            <p>Le directeur de la publication est l’entrepreneur individuel exploitant HomeAToutFaire.</p>
          </LegalSection>

          <LegalSection title="Hébergement">
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>
            </p>
            <p>
              440 N Barranca Avenue #4133
              <br />
              Covina, CA 91723
              <br />
              États-Unis
            </p>
            <p>
              Site :{" "}
              <a
                className="underline hover:text-[#0A6587]"
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Médiation de la consommation">
            <p>Les coordonnées du médiateur de la consommation compétent sont à compléter avant publication définitive.</p>
          </LegalSection>

          <LegalSection title="Propriété intellectuelle">
            <p>
              Sauf indication contraire, les textes, éléments graphiques, logos, photographies et contenus présents sur ce site sont protégés par les règles relatives à la propriété intellectuelle.
            </p>
          </LegalSection>

          <LegalSection title="Données personnelles et cookies">
            <p>
              Pour en savoir plus sur le traitement des données personnelles et les outils de mesure d’audience, consultez la{" "}
              <a className="font-semibold underline hover:text-[#0A6587]" href="/politique-confidentialite">
                politique de confidentialité
              </a>.
            </p>
          </LegalSection>

          <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            Dernière mise à jour : 11 octobre 2026.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

type LegalSectionProps = {
  title: string;
  children: React.ReactNode;
};

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-9">
      <h2 className="text-xl font-bold text-[#06192B] sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-2 leading-7 text-slate-600">{children}</div>
    </section>
  );
}
