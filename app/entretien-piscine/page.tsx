import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceContactCta from "../components/ServiceContactCta";
import ServiceStructuredData from "../components/ServiceStructuredData";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title:
    "Entretien de piscine à Sainte-Anastasie, près de Nîmes",

  description:
    "Entretien de piscine ponctuel ou régulier avec HomeAToutFaire à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km : nettoyage courant et petites interventions sur existant.",

  alternates: {
    canonical: "/entretien-piscine",
  },

  openGraph: {
    title:
      "Entretien de piscine à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Entretien de piscine ponctuel ou régulier, nettoyage courant et petites interventions autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/entretien-piscine`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "HomeAToutFaire - Entretien de piscine à Sainte-Anastasie",
      },
    ],
  },
};

const poolServices = [
  "Nettoyage courant du bassin",
  "Nettoyage de la ligne d’eau et des surfaces accessibles",
  "Vidage et nettoyage des paniers de skimmers",
  "Nettoyage des éléments de filtration accessibles",
  "Contrôle courant de l’état général de la piscine",
  "Petites interventions d’entretien sur équipements existants",
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

export default function PoolMaintenancePage() {
  return (
    <>
      <Header />

      <ServiceStructuredData
        name="Entretien courant de piscine"
        description="Entretien de piscine ponctuel ou régulier, nettoyage courant et petites opérations accessibles sur une piscine et ses équipements déjà installés."
        path="/entretien-piscine"
        breadcrumbName="Entretien de piscine"
      />

      <main id="contenu-principal" className="bg-slate-50">
        {/* =========================================================
            HERO
        ========================================================= */}

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
                Entretien piscine
              </span>
            </nav>

            <div className="max-w-[850px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-yellow-300 sm:text-sm">
                <Droplets size={16} strokeWidth={2.3} />

                Entretien courant de piscine
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Entretien de piscine à Sainte-Anastasie,
                <span className="text-yellow-300">
                  {" "}
                  près de Nîmes
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
                HomeAToutFaire intervient pour l&apos;entretien courant,
                le nettoyage et les petites interventions sur une piscine
                existante, de façon ponctuelle ou avec une fréquence régulière
                définie selon vos besoins.
              </p>

              <div className="mt-7 max-w-[760px]">
                <ServiceContactCta
                  location="piscine_page"
                  service="Entretien piscine - ponctuel ou régulier"
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

                  Ponctuel ou régulier
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTRODUCTION
        ========================================================= */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Entretien courant
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#06192B] sm:text-3xl">
                Garder une piscine propre et agréable au quotidien
              </h2>
            </div>

            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              <p>
                Une piscine demande un entretien régulier pour limiter
                l&apos;accumulation de saletés et conserver des équipements
                propres et accessibles.
              </p>

              <p>
                HomeAToutFaire propose des prestations d&apos;entretien
                courant et de nettoyage sur des installations existantes,
                adaptées aux besoins simples du quotidien.
              </p>

              <p>
                Le service est pensé pour l&apos;entretien régulier du bassin
                et les petites opérations accessibles sur les équipements
                déjà en place.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRESTATIONS
        ========================================================= */}

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[760px]">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Interventions
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#06192B] sm:text-3xl">
                Quel entretien de piscine ?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                La prestation est définie selon l&apos;état du bassin,
                l&apos;accessibilité des équipements et la nature du besoin.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {poolServices.map((service) => (
                <div
                  key={service}
                  className="flex min-h-[118px] items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-700">
                    <Sparkles size={18} strokeWidth={2.3} />
                  </div>

                  <p className="pt-1 text-sm font-semibold leading-6 text-[#06192B] sm:text-[15px]">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            ENTRETIEN PONCTUEL OU RÉGULIER
        ========================================================= */}

        <section className="bg-[#EAF5F8] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-[800px] text-center">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Une fréquence adaptée à votre piscine
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#06192B] sm:text-3xl">
                Entretien ponctuel ou suivi régulier
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Vous pouvez faire appel à HomeAToutFaire pour une intervention
                ponctuelle ou prévoir des passages réguliers lorsque votre
                bassin demande un entretien plus suivi.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-white/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-700">
                  <Wrench size={22} strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#06192B]">
                  Intervention ponctuelle
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Pour un nettoyage, une remise au propre ou une petite
                  opération d&apos;entretien identifiée sur une piscine déjà
                  installée.
                </p>
              </article>

              <article className="rounded-3xl border border-white/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-700">
                  <CalendarDays size={22} strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#06192B]">
                  Passages réguliers
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Lorsque vous souhaitez un suivi dans la durée, la fréquence
                  des passages est définie avec vous selon le bassin, la saison,
                  l&apos;utilisation et les opérations d&apos;entretien
                  réellement nécessaires.
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-2xl border border-[#0A6587]/10 bg-white/70 p-5 text-sm leading-6 text-slate-600 sm:p-6 sm:text-base sm:leading-7">
              Aucune formule standard n&apos;est imposée : le contenu et la
              fréquence des interventions sont précisés dans le devis selon
              votre besoin réel.
            </div>
          </div>
        </section>

        {/* =========================================================
            PÉRIMÈTRE
        ========================================================= */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#082E50]/8 text-[#0A6587]">
                <Wrench size={22} strokeWidth={2.2} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#06192B] sm:text-2xl">
                Des interventions d&apos;entretien simples
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Les prestations concernent l&apos;entretien courant et les
                petites opérations accessibles sur une piscine et ses
                équipements déjà installés.
              </p>

              <p className="mt-3 leading-7 text-slate-600">
                Des photos du bassin et du matériel concerné permettent
                souvent de déterminer rapidement si l&apos;intervention
                entre dans le périmètre proposé.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#082E50] p-6 text-white shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                <ShieldCheck size={22} strokeWidth={2.3} />
              </div>

              <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                Un service centré sur l&apos;entretien courant
              </h2>

              <p className="mt-3 leading-7 text-blue-100/75">
                Les prestations n&apos;incluent pas la construction ou la
                rénovation du bassin, les modifications importantes du circuit
                hydraulique ni les travaux électriques de piscine.
              </p>

              <p className="mt-3 leading-7 text-blue-100/75">
                En cas de besoin plus technique, la demande est identifiée
                avant déplacement afin d&apos;éviter une intervention
                inadaptée.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            POURQUOI HOMEATOUTFAIRE
        ========================================================= */}

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                HomeAToutFaire
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#06192B] sm:text-3xl">
                Un entretien simple, local et régulier
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-600">
                  <Clock3 size={22} strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#06192B]">
                  Réactif
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Votre demande est étudiée rapidement afin de déterminer
                  le type d&apos;entretien ou de petite intervention
                  nécessaire.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-600">
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#06192B]">
                  Travail soigné
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  L&apos;entretien est réalisé avec attention afin de
                  conserver un bassin et des équipements propres.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-700">
                  <CircleDollarSign size={22} strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#06192B]">
                  Devis gratuit
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Décrivez votre piscine et le besoin d&apos;entretien pour
                  permettre une première évaluation avant intervention.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================
            ZONE D'INTERVENTION
        ========================================================= */}

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
                jusqu&apos;à environ 50 km autour de Sainte-Anastasie selon
                la nature de l&apos;entretien demandé.
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

        {/* =========================================================
            CTA FINAL
        ========================================================= */}

        <section className="bg-[#06192B] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Besoin d&apos;entretenir votre piscine ?
            </h2>

            <p className="mx-auto mt-4 max-w-[680px] leading-7 text-blue-100/75">
              Décrivez le bassin, l&apos;entretien souhaité et indiquez si
              vous recherchez une intervention ponctuelle ou des passages
              réguliers. HomeAToutFaire pourra alors préparer une proposition
              adaptée.
            </p>

            <div className="mx-auto mt-7 max-w-[760px]">
              <ServiceContactCta
                  location="piscine_page_bottom"
                  service="Entretien piscine - ponctuel ou régulier"
                />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
