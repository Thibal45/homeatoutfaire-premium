import type { Metadata } from "next";

import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de protection des données du site HomeAToutFaire.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-5 pb-16 pt-28 text-slate-700 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10">
        <article className="mx-auto max-w-[980px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
              Protection des données
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#06192B] sm:text-4xl">
              Politique de confidentialité
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              Cette politique explique quelles données peuvent être traitées
              lorsque vous utilisez le site HomeAToutFaire et comment exercer
              vos droits.
            </p>

            <PrivacySection title="Responsable du traitement">
              <p>
                Le responsable du traitement est Thibaut SACHOT, entrepreneur
                individuel exploitant HomeAToutFaire, situé au 28, rue du
                Bel Air, 30190 Sainte-Anastasie.
              </p>
              <p>
                Pour toute question relative à vos données personnelles :
                {" "}
                <a
                  className="underline hover:text-[#0A6587]"
                  href="mailto:hatf30190@gmail.com"
                >
                  hatf30190@gmail.com
                </a>
                {" "}ou 06 18 08 55 98.
              </p>
            </PrivacySection>

            <PrivacySection title="Données collectées via le formulaire de devis">
              <p>
                Lorsque vous envoyez une demande de devis, le site peut
                collecter les informations que vous saisissez : nom et
                prénom, numéro de téléphone, adresse e-mail, adresse du
                chantier si vous la renseignez, type de prestation et contenu
                de votre message.
              </p>
              <p>
                L’adresse du chantier est facultative. Les autres champs
                signalés comme requis sont nécessaires pour permettre le
                traitement de la demande.
              </p>
            </PrivacySection>

            <PrivacySection title="Finalités et base juridique">
              <p>
                Les données du formulaire sont utilisées pour répondre à votre
                demande, vérifier si l’intervention entre dans le périmètre
                des prestations proposées, préparer un devis et organiser les
                échanges précontractuels ou contractuels qui peuvent en
                découler.
              </p>
              <p>
                Le traitement repose principalement sur l’exécution de mesures
                précontractuelles prises à votre demande.
              </p>
            </PrivacySection>

            <PrivacySection title="Destinataires et prestataires">
              <p>
                Les informations sont destinées à HomeAToutFaire et aux
                prestataires techniques strictement nécessaires au
                fonctionnement du site et au traitement de la demande.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>EmailJS</strong> est utilisé pour transmettre le
                  contenu du formulaire de devis.
                </li>
                <li>
                  <strong>Vercel</strong> assure l’hébergement et fournit des
                  outils techniques de mesure de performance du site.
                </li>
                <li>
                  <strong>Google Analytics</strong> n’est chargé qu’après votre
                  accord afin de mesurer la fréquentation et les interactions
                  sur le site.
                </li>
                <li>
                  <strong>WhatsApp</strong> n’est utilisé que si vous choisissez
                  volontairement de contacter HomeAToutFaire par ce moyen.
                </li>
              </ul>
            </PrivacySection>

            <PrivacySection title="Durée de conservation">
              <p>
                Les données liées à une demande de devis sont conservées
                pendant le temps nécessaire au traitement de la demande. En
                l’absence de relation contractuelle, elles ne sont pas
                conservées au-delà de trois ans à compter du dernier contact,
                sauf nécessité particulière liée à une obligation légale ou à
                la gestion d’un litige.
              </p>
              <p>
                Lorsqu’une relation contractuelle est engagée, certaines
                informations peuvent être conservées plus longtemps afin de
                respecter les obligations comptables, fiscales ou probatoires
                applicables.
              </p>
            </PrivacySection>

            <PrivacySection title="Cookies et mesure d’audience">
              <p>
                Le site mémorise votre choix relatif à la mesure d’audience
                afin de ne pas vous redemander votre préférence à chaque
                page. Google Analytics n’est chargé qu’après acceptation.
              </p>
              <p>
                Vous pouvez modifier votre choix à tout moment grâce au bouton
                « Gérer mes cookies » affiché sur le site. En cas de refus,
                les cookies Google Analytics concernés sont supprimés dans la
                mesure techniquement possible depuis le navigateur.
              </p>
            </PrivacySection>

            <PrivacySection title="Transferts hors de l’Union européenne">
              <p>
                Certains prestataires techniques utilisés par le site sont
                établis ou peuvent traiter des données en dehors de l’Espace
                économique européen, notamment aux États-Unis. Lorsque de tels
                transferts ont lieu, ils relèvent des mécanismes juridiques et
                garanties mis en place par les prestataires concernés.
              </p>
            </PrivacySection>

            <PrivacySection title="Vos droits">
              <p>
                Selon la situation, vous pouvez demander l’accès à vos données,
                leur rectification, leur effacement ou la limitation de leur
                traitement. Vous pouvez également exercer les autres droits
                prévus par la réglementation lorsqu’ils sont applicables.
              </p>
              <p>
                Pour exercer vos droits, contactez HomeAToutFaire à
                {" "}
                <a
                  className="underline hover:text-[#0A6587]"
                  href="mailto:hatf30190@gmail.com"
                >
                  hatf30190@gmail.com
                </a>
                .
              </p>
              <p>
                Si vous estimez, après avoir contacté HomeAToutFaire, que vos
                droits ne sont pas respectés, vous pouvez adresser une
                réclamation à la CNIL :
                {" "}
                <a
                  className="underline hover:text-[#0A6587]"
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cnil.fr
                </a>
                .
              </p>
            </PrivacySection>

            <PrivacySection title="Liens externes et messageries">
              <p>
                Lorsque vous choisissez un lien vers un service tiers, comme
                WhatsApp, votre utilisation de ce service relève également
                des conditions et politiques de confidentialité de ce tiers.
              </p>
            </PrivacySection>

            <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
              Dernière mise à jour : 11 octobre 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

type PrivacySectionProps = {
  title: string;
  children: React.ReactNode;
};

function PrivacySection({ title, children }: PrivacySectionProps) {
  return (
    <section className="mt-9">
      <h2 className="text-xl font-bold text-[#06192B] sm:text-2xl">
        {title}
      </h2>

      <div className="mt-3 space-y-3 leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}
