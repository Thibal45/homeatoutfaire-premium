import type { Metadata } from "next";
import Link from "next/link";
import {
  Brush,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MapPin,
  PaintRoller,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceContactCta from "../components/ServiceContactCta";
import ServiceStructuredData from "../components/ServiceStructuredData";

const siteUrl = "https://www.homeatoutfaire30.fr";

export const metadata: Metadata = {
  title:
    "Petits travaux de peinture à Sainte-Anastasie, près de Nîmes",

  description:
    "HomeAToutFaire réalise vos petits travaux de peinture et rafraîchissement intérieur à Sainte-Anastasie, près de Nîmes, et jusqu'à 50 km. Devis gratuit.",

  alternates: {
    canonical: "/peinture",
  },

  openGraph: {
    title:
      "Petits travaux de peinture à Sainte-Anastasie | HomeAToutFaire",

    description:
      "Petits travaux de peinture intérieure, retouches et rafraîchissement autour de Sainte-Anastasie et Nîmes.",

    url: `${siteUrl}/peinture`,
    siteName: "HomeAToutFaire",
    locale: "fr_FR",
    type: "website",

    images: [
      {
        url: "/images/logo-homeatoutfaire.png",
        width: 1076,
        height: 287,
        alt: "HomeAToutFaire - Petits travaux de peinture à Sainte-Anastasie",
      },
    ],
  },
};

const paintingServices = [
  "Rafraîchissement de petites surfaces murales",
  "Retouches de peinture après réparation ou petits travaux",
  "Remise en peinture d’un mur ou d’une zone limitée",
  "Peinture de petites pièces ou espaces ciblés",
  "Préparation légère des supports avant peinture",
  "Petites finitions et reprises de peinture intérieure",
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

export default function PaintingPage() {
  return (
    <>
      <Header />

      <ServiceStructuredData
        name="Petits travaux de peinture"
        description="Rafraîchissement intérieur, retouches et petits travaux de peinture sur des zones ciblées et supports existants."
        path="/peinture"
        breadcrumbName="Peinture"
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
                Peinture
              </span>
            </nav>

            <div className="max-w-[850px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-yellow-300 sm:text-sm">
                <PaintRoller size={16} strokeWidth={2.3} />

                Petits travaux de peinture
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Petits travaux de peinture à Sainte-Anastasie,
                <span className="text-yellow-300">
                  {" "}
                  près de Nîmes
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
                HomeAToutFaire réalise de petits travaux de peinture
                intérieure, de rafraîchissement et de finition pour remettre
                proprement en état une pièce ou une zone ciblée.
              </p>

              <div className="mt-7 max-w-[760px]">
                <ServiceContactCta
                  location="peinture_page"
                  service="Peinture"
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

                  Petits travaux ciblés
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
                Rafraîchissement intérieur
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#06192B] sm:text-3xl">
                Pour redonner un aspect propre à votre intérieur
              </h2>
            </div>

            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              <p>
                Un mur marqué, une peinture vieillissante ou des traces
                laissées après de petits travaux peuvent rapidement donner
                une impression de logement mal entretenu.
              </p>

              <p>
                HomeAToutFaire intervient pour les petits travaux de peinture
                et les reprises localisées permettant de rafraîchir une zone,
                une petite pièce ou un support existant.
              </p>

              <p>
                L&apos;objectif est d&apos;obtenir un résultat propre et
                soigné sur une zone ciblée, avec une préparation adaptée au
                support et au niveau de finition recherché.
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
                Quels petits travaux de peinture ?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Chaque demande est étudiée en fonction de la surface, de
                l&apos;état du support et du niveau de préparation nécessaire.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paintingServices.map((service) => (
                <div
                  key={service}
                  className="flex min-h-[118px] items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-600">
                    <Brush size={18} strokeWidth={2.3} />
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
            PÉRIMÈTRE
        ========================================================= */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#082E50]/8 text-[#0A6587]">
                <Sparkles size={22} strokeWidth={2.2} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#06192B] sm:text-2xl">
                Des travaux de finition ciblés
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                L&apos;objectif est de remettre proprement en état une surface
                ou une petite zone sans engager un chantier de rénovation
                important.
              </p>

              <p className="mt-3 leading-7 text-slate-600">
                Une photo et quelques informations sur les dimensions du
                support permettent généralement d&apos;évaluer rapidement la
                nature du travail.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#082E50] p-6 text-white shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                <ShieldCheck size={22} strokeWidth={2.3} />
              </div>

              <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                Un périmètre adapté aux petits travaux
              </h2>

              <p className="mt-3 leading-7 text-blue-100/75">
                Les prestations concernent les rafraîchissements et reprises
                ciblées ; elles n&apos;incluent pas les rénovations lourdes,
                les façades ou les traitements techniques spécialisés.
              </p>

              <p className="mt-3 leading-7 text-blue-100/75">
                L&apos;état du support est vérifié avant intervention afin de
                proposer une prise en charge adaptée.
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
                Un service simple, local et soigné
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
                  Votre demande est étudiée rapidement pour vérifier la
                  nature et l&apos;ampleur du travail souhaité.
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
                  Une attention particulière est portée à la préparation,
                  aux finitions et à la propreté de la zone de travail.
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
                  Décrivez la surface à peindre et le résultat souhaité afin
                  d&apos;évaluer la prestation avant intervention.
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
                la nature et l&apos;importance des petits travaux demandés.
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
              Un petit travail de peinture à réaliser ?
            </h2>

            <p className="mx-auto mt-4 max-w-[680px] leading-7 text-blue-100/75">
              Décrivez la surface et le résultat souhaité pour vérifier
              rapidement si HomeAToutFaire peut prendre en charge votre
              intervention.
            </p>

            <div className="mx-auto mt-7 max-w-[760px]">
              <ServiceContactCta
                  location="peinture_page_bottom"
                  service="Peinture"
                />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
