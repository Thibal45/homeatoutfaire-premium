import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  House,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceContactCta from "../components/ServiceContactCta";
import ServiceStructuredData from "../components/ServiceStructuredData";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title:
    "Petits travaux pour résidences secondaires et gîtes près de Nîmes",

  description:
    "HomeAToutFaire accompagne les propriétaires de résidences secondaires, gîtes et locations saisonnières pour leurs petits travaux, remises en état légères, entretien courant et piscine autour de Sainte-Anastasie et Nîmes.",

  alternates: {
    canonical: "/residences-secondaires-gites",
  },

  openGraph: {
    title:
      "Résidences secondaires & gîtes près de Nîmes | HomeAToutFaire",

    description:
      "Un interlocuteur pour regrouper plusieurs petits travaux et besoins d'entretien courant dans votre résidence secondaire ou votre gîte.",

    url: `${siteUrl}/residences-secondaires-gites`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "HomeAToutFaire - Petits travaux pour résidences secondaires et gîtes",
      },
    ],
  },
};

const needs = [
  {
    title: "Petites réparations de plomberie",
    description:
      "Robinetterie, siphons, petites fuites accessibles et raccordements simples sur installation existante.",
    href: "/plomberie",
  },
  {
    title: "Petits travaux électriques",
    description:
      "Remplacement d'appareillage, luminaires et petits équipements sur installation existante.",
    href: "/electricite",
  },
  {
    title: "Retouches et peinture",
    description:
      "Rafraîchissements ciblés et reprises localisées pour remettre proprement une pièce ou une zone.",
    href: "/peinture",
  },
  {
    title: "Réglages et menuiserie",
    description:
      "Portes, poignées, placards et petites réparations ou ajustements sur éléments existants.",
    href: "/menuiserie",
  },
  {
    title: "Entretien courant de piscine",
    description:
      "Nettoyage et petites opérations accessibles sur un bassin et ses équipements déjà installés.",
    href: "/entretien-piscine",
  },
  {
    title: "Petit dépannage",
    description:
      "Prise en charge de petits problèmes du quotidien entrant dans le périmètre des prestations HomeAToutFaire.",
    href: "/depannage",
  },
];

const interventionAreas = [
  "Sainte-Anastasie",
  "Dions",
  "La Calmette",
  "Saint-Chaptes",
  "Poulx",
  "Nîmes",
  "Marguerittes",
  "Uzès",
];

export default function SecondaryHomesPage() {
  return (
    <>
      <Header />

      <ServiceStructuredData
        name="Petits travaux pour résidences secondaires et gîtes"
        description="Petits travaux multiservices, remises en état légères et entretien courant pour résidences secondaires, gîtes et locations saisonnières autour de Sainte-Anastasie et Nîmes."
        path="/residences-secondaires-gites"
        breadcrumbName="Résidences secondaires & gîtes"
      />

      <main id="contenu-principal" className="bg-slate-50">
        <section className="relative overflow-hidden bg-[#06192B] px-5 pb-16 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 lg:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]"
          />

          <div className="relative mx-auto max-w-[1180px]">
            <nav
              aria-label="Fil d’Ariane"
              className="mb-6 text-sm text-blue-100/65"
            >
              <Link
                href="/"
                className="transition-colors hover:text-yellow-300"
              >
                Accueil
              </Link>

              <span className="mx-2" aria-hidden="true">
                /
              </span>

              <span className="text-white">
                Résidences secondaires & gîtes
              </span>
            </nav>

            <div className="max-w-[880px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-yellow-300 sm:text-sm">
                <House size={16} strokeWidth={2.3} />

                Propriétaires & hébergements saisonniers
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Petits travaux pour résidences secondaires et gîtes,
                <span className="text-yellow-300">
                  {" "}
                  près de Nîmes
                </span>
              </h1>

              <p className="mt-5 max-w-[780px] text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
                HomeAToutFaire vous permet de regrouper plusieurs petits
                travaux et besoins d&apos;entretien courant auprès d&apos;un
                interlocuteur unique, que le logement soit occupé
                ponctuellement, loué en saisonnier ou utilisé comme résidence
                secondaire.
              </p>

              <div className="mt-7 max-w-[760px]">
                <ServiceContactCta
                  location="residences_gites_page"
                  service="Résidence secondaire / gîte"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/70">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-300"
                  />

                  Devis gratuit
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="text-red-300"
                  />

                  Intervention locale
                </span>

                <span className="inline-flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-yellow-300"
                  />

                  Un interlocuteur unique
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Une demande, plusieurs petits besoins
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#06192B] sm:text-3xl">
                Simplifier l&apos;entretien courant d&apos;un logement que vous
                n&apos;occupez pas toute l&apos;année
              </h2>
            </div>

            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              <p>
                Dans une résidence secondaire ou un gîte, plusieurs petites
                choses peuvent s&apos;accumuler : un robinet à reprendre, une
                poignée à régler, un luminaire à remplacer, une retouche de
                peinture ou un entretien de piscine à prévoir.
              </p>

              <p>
                HomeAToutFaire permet de regrouper ces besoins dans une même
                demande afin d&apos;éviter de multiplier les interlocuteurs
                pour des interventions simples et ciblées.
              </p>

              <p>
                Avant déplacement, les travaux sont étudiés à partir de votre
                description et, si nécessaire, de photos pour confirmer ce qui
                peut être pris en charge.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[800px]">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Interventions possibles
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#06192B] sm:text-3xl">
                Les petits travaux utiles entre deux séjours
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Les prestations restent les mêmes que pour les autres clients
                HomeAToutFaire, avec la possibilité de les regrouper lorsqu&apos;un
                logement présente plusieurs petits besoins.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {needs.map((need) => (
                <Link
                  key={need.href}
                  href={need.href}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-yellow-300 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#082E50]/8 text-[#0A6587]">
                    <Wrench size={20} strokeWidth={2.2} />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#06192B]">
                    {need.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {need.description}
                  </p>

                  <span className="mt-4 inline-flex text-sm font-semibold text-[#B88311]">
                    Voir le service →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#082E50]/8 text-[#0A6587]">
                <Clock3 size={22} strokeWidth={2.2} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#06192B] sm:text-2xl">
                Pratique pour préparer le logement
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Avant une période d&apos;occupation ou de location, vous pouvez
                transmettre une liste de petits travaux identifiés afin de
                vérifier lesquels peuvent être réalisés dans le même créneau.
              </p>

              <p className="mt-3 leading-7 text-slate-600">
                Cette organisation est particulièrement utile lorsque vous
                habitez loin du logement ou souhaitez limiter le nombre
                d&apos;intervenants.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#082E50] p-6 text-white shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                <ShieldCheck size={22} strokeWidth={2.3} />
              </div>

              <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                Un service de petits travaux, pas une conciergerie
              </h2>

              <p className="mt-3 leading-7 text-blue-100/75">
                HomeAToutFaire intervient pour les petits travaux et
                l&apos;entretien courant décrits sur le site. Cette offre ne
                comprend pas la gestion locative, le ménage, la remise de clés
                ou la surveillance permanente du logement.
              </p>

              <p className="mt-3 leading-7 text-blue-100/75">
                Les limites propres à chaque type de prestation restent
                identiques : les travaux lourds, structurels ou soumis à une
                qualification spécifique ne sont pas pris en charge.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#082E50] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                <MapPin size={22} strokeWidth={2.4} />
              </div>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                Autour de Sainte-Anastasie et Nîmes
              </h2>

              <p className="mt-4 leading-7 text-blue-100/75">
                HomeAToutFaire intervient dans un rayon pouvant aller
                jusqu&apos;à environ 50 km autour de Sainte-Anastasie, selon
                la nature et le regroupement des travaux demandés.
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-yellow-300">
                Secteurs notamment desservis
              </p>

              <div className="flex flex-wrap gap-2.5">
                {interventionAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-blue-50"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-6 text-blue-100/60">
                Votre commune n&apos;est pas indiquée ? Contactez
                HomeAToutFaire pour vérifier la possibilité
                d&apos;intervention.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#06192B] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Plusieurs petits travaux à regrouper dans votre logement ?
            </h2>

            <p className="mx-auto mt-4 max-w-[700px] leading-7 text-blue-100/75">
              Envoyez la liste des besoins et, si possible, quelques photos.
              HomeAToutFaire vous indique rapidement ce qui peut être pris en
              charge et prépare un devis gratuit.
            </p>

            <div className="mx-auto mt-7 max-w-[760px]">
              <ServiceContactCta
                  location="residences_gites_page_bottom"
                  service="Résidence secondaire / gîte"
                />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
