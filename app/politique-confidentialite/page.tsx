import type { Metadata } from "next";

import LegalPageLayout from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et informations sur les données personnelles traitées par HomeAToutFaire.",
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
    <LegalPageLayout
      eyebrow="Vie privée"
      title="Politique de confidentialité"
      description="Cette page explique quelles données peuvent être traitées lorsque vous consultez le site ou contactez HomeAToutFaire, pourquoi elles le sont et comment exercer vos droits."
      updatedAt="13 octobre 2026"
    >
      <section>
        <h2>Responsable du traitement</h2>

        <p>
          Le responsable du traitement des données collectées sur ce site est
          Thibaut SACHOT, pour HomeAToutFaire.
        </p>

        <address>
          28, rue du Bel Air — 30190 Sainte-Anastasie
          <br />
          E-mail : <a href="mailto:hatf30190@gmail.com">hatf30190@gmail.com</a>
          <br />
          Téléphone : <a href="tel:0618085598">06 18 08 55 98</a>
        </address>
      </section>

      <section>
        <h2>Demandes de contact et de devis</h2>

        <p>
          Le formulaire peut recueillir votre nom, votre téléphone, votre
          adresse e-mail, la commune ou le code postal du chantier, le type de
          prestation recherché et le contenu de votre message.
        </p>

        <p>
          Le nom, le type de prestation et le message sont nécessaires pour
          comprendre la demande. Vous devez également indiquer au moins un moyen
          de réponse, par téléphone ou par e-mail. La commune ou le code postal
          du chantier reste facultatif au moment du premier contact.
        </p>

        <p>
          Ces informations servent uniquement à répondre à votre demande, à
          vérifier si elle peut être prise en charge, à préparer un devis et, le
          cas échéant, à organiser la prestation. Le traitement repose sur les
          mesures précontractuelles prises à votre demande et sur l&apos;intérêt
          légitime de HomeAToutFaire à répondre aux sollicitations reçues.
        </p>
      </section>

      <section>
        <h2>Destinataires et prestataires</h2>

        <p>
          Les informations d&apos;une demande sont destinées à HomeAToutFaire.
          L&apos;envoi du formulaire s&apos;appuie sur{" "}
          <a
            href="https://www.emailjs.com/legal/privacy-policy/"
            target="_blank"
            rel="noreferrer"
          >
            EmailJS
          </a>
          , qui agit comme prestataire technique d&apos;acheminement, et le site est
          hébergé par{" "}
          <a
            href="https://vercel.com/legal/privacy-notice"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </a>
          .
        </p>

        <p>
          Selon le moyen de contact que vous choisissez, les services de votre
          opérateur téléphonique, de votre fournisseur de messagerie ou de
          WhatsApp peuvent également traiter des données conformément à leurs
          propres politiques de confidentialité.
        </p>
      </section>

      <section>
        <h2>Durées de conservation</h2>

        <p>
          Les demandes qui ne débouchent pas sur une prestation sont conservées
          au maximum trois ans à compter du dernier échange, puis supprimées ou
          anonymisées. Lorsque la demande conduit à une prestation, les
          informations nécessaires au suivi de la relation et au respect des
          obligations comptables, fiscales ou juridiques sont conservées pendant
          les durées imposées par les textes applicables.
        </p>

        <p>
          Les journaux techniques des prestataires peuvent être conservés
          pendant la durée nécessaire à l&apos;acheminement, à la sécurité et au
          fonctionnement de leurs services.
        </p>
      </section>

      <section>
        <h2>Mesure d&apos;audience et performance</h2>

        <h3>Vercel Web Analytics et Speed Insights</h3>

        <p>
          Le site utilise Vercel Web Analytics pour obtenir des statistiques
          agrégées de fréquentation et Vercel Speed Insights pour mesurer les
          performances techniques. Ces outils fournissent des mesures utiles au
          fonctionnement du site sans afficher de profil individuel à
          HomeAToutFaire.
        </p>

        <h3>Google Analytics</h3>

        <p>
          Google Analytics n&apos;est chargé qu&apos;après votre accord dans le
          bandeau de consentement. Il sert à mesurer la fréquentation, les pages
          consultées et certaines actions utiles, comme un clic vers le
          téléphone, WhatsApp ou le formulaire de devis. La base juridique de ce
          traitement est votre consentement.
        </p>

        <p>
          Vous pouvez accepter, refuser ou modifier votre choix à tout moment
          avec le bouton « Gérer mes cookies » affiché en bas du site. Le refus
          n&apos;empêche pas l&apos;accès au site ni l&apos;envoi d&apos;une demande de devis.
        </p>
      </section>

      <section>
        <h2>Transferts hors de l&apos;Union européenne</h2>

        <p>
          Certains prestataires techniques, notamment Vercel, EmailJS et Google,
          peuvent traiter des données aux États-Unis ou dans d&apos;autres pays hors
          de l&apos;Union européenne. Ces prestataires indiquent mettre en place les
          mécanismes requis pour encadrer ces transferts, notamment les clauses
          contractuelles types lorsqu&apos;elles sont applicables.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>

        <p>
          Vous pouvez demander l&apos;accès à vos données, leur rectification, leur
          effacement ou la limitation de leur traitement. Vous pouvez également
          vous opposer à un traitement fondé sur l&apos;intérêt légitime et retirer
          à tout moment votre consentement pour Google Analytics.
        </p>

        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href="mailto:hatf30190@gmail.com">hatf30190@gmail.com</a> en
          précisant l&apos;objet de votre demande. Une vérification de votre identité
          peut être demandée uniquement lorsque cela est nécessaire.
        </p>

        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          déposer une réclamation auprès de la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            Commission nationale de l&apos;informatique et des libertés (CNIL)
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>

        <p>
          HomeAToutFaire et ses prestataires mettent en œuvre des mesures
          techniques et organisationnelles destinées à protéger les informations
          contre l&apos;accès non autorisé, la perte, l&apos;altération ou la divulgation.
          Seules les informations utiles au traitement de votre demande doivent
          être transmises dans le formulaire.
        </p>
      </section>

      <section>
        <h2>Évolution de la politique</h2>

        <p>
          Cette politique peut être mise à jour en cas d&apos;évolution du site, des
          prestataires utilisés ou des règles applicables. La date de mise à jour
          figure en haut de la page.
        </p>
      </section>
    </LegalPageLayout>
  );
}
