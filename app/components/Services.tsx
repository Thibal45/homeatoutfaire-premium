"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bolt,
  Droplets,
  Hammer,
  House,
  PaintRoller,
  Waves,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Petits travaux électriques",
    description:
      "Remplacement d'interrupteurs, prises, luminaires et petits dépannages sur existant.",
    icon: Bolt,
    href: "/electricite",
  },
  {
    title: "Petits travaux de plomberie",
    description:
      "Petites réparations, robinetterie et dépannages simples sur installation existante.",
    icon: Wrench,
    href: "/plomberie",
  },
  {
    title: "Peinture",
    description:
      "Rafraîchissement, retouches et petits travaux de peinture avec finitions soignées.",
    icon: PaintRoller,
    href: "/peinture",
  },
  {
    title: "Menuiserie",
    description:
      "Montage, réglages, petites réparations et ajustements sur éléments existants.",
    icon: Hammer,
    href: "/menuiserie",
  },
  {
    title: "Entretien piscine",
    description:
      "Entretien ponctuel ou régulier, nettoyage courant et petites interventions sur votre piscine.",
    icon: Waves,
    href: "/entretien-piscine",
  },
  {
    title: "Petit dépannage",
    description:
      "Intervention sur les petits travaux nécessitant une prise en charge rapide.",
    icon: Droplets,
    href: "/depannage",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[68px] overflow-hidden bg-white py-14 sm:py-18 lg:py-20"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-100/60 blur-[110px]" />

        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-yellow-100/60 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,46,80,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,46,80,0.35) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
      </div>

      {/* =========================================================
          CONTENEUR PRINCIPAL
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1360px]">
          {/* =====================================================
              EN-TÊTE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mx-auto mb-9 flex w-full max-w-[980px] flex-col items-center justify-center text-center sm:mb-11"
          >
            {/* Badge */}

            <span className="inline-flex rounded-full border border-yellow-300/70 bg-yellow-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88311] sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]">
              Nos services
            </span>

            {/* Titre */}

            <h2 className="mt-3 text-[1.8rem] font-bold leading-[1.12] tracking-tight text-[#082E50] sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]">
              Des prestations pour toute la maison
            </h2>

            {/* Sous-titre */}

            <p className="mt-2.5 max-w-[850px] text-[15px] leading-6 text-slate-600 sm:mt-3 sm:text-lg sm:leading-7">
              HomeAToutFaire vous accompagne dans tous vos petits travaux, avec
              professionnalisme, réactivité et un travail soigné.
            </p>

            {/* Barre or */}

            <div className="mt-3 h-1 w-14 rounded-full bg-[#D5A52E] sm:mt-4 sm:w-16" />
          </motion.div>

          {/* =====================================================
              GRILLE DES SERVICES
          ===================================================== */}

          <div className="grid gap-3.5 min-[400px]:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group relative min-h-[220px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] min-[400px]:min-h-[260px] min-[400px]:p-4 sm:p-6"
                >
                  {/* Halo décoratif */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-100/70 blur-3xl transition-all duration-300 group-hover:bg-yellow-200/80"
                  />

                  <Link
                    href={service.href}
                    aria-label={`Découvrir ${service.title}`}
                    className="relative z-10 flex h-full flex-col rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52E] focus-visible:ring-offset-4"
                  >
                    {/* Icône */}

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-[#C88A00] shadow-[0_8px_20px_rgba(213,165,46,0.16)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-14 sm:w-14">
                      <Icon
                        size={24}
                        strokeWidth={2.2}
                        className="sm:h-7 sm:w-7"
                      />
                    </div>

                    {/* Titre */}

                    <h3 className="mt-3.5 text-lg font-bold leading-tight text-[#082E50] min-[400px]:text-base sm:mt-5 sm:text-xl">
                      {service.title}
                    </h3>

                    {/* Description */}

                    <p className="mt-2 text-sm leading-6 text-slate-600 min-[400px]:text-[13px] min-[400px]:leading-5 sm:text-[15px] sm:leading-6">
                      {service.description}
                    </p>

                    <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-[#0A6587] transition-colors group-hover:text-[#B88311]">
                      Voir les prestations
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:translate-x-1 group-hover:bg-yellow-100">
                        <ArrowRight size={15} strokeWidth={2.3} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-8 overflow-hidden rounded-3xl border border-[#082E50]/10 bg-[#082E50] p-6 text-white shadow-[0_16px_45px_rgba(8,46,80,0.16)] sm:mt-10 sm:p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-3xl items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                  <House size={24} strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-yellow-300">
                    Propriétaires & hébergements saisonniers
                  </p>

                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                    Résidences secondaires & gîtes
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100/75 sm:text-base sm:leading-7">
                    Regroupez plusieurs petits travaux, remises en état légères
                    et besoins d&apos;entretien courant auprès d&apos;un seul
                    interlocuteur, même si vous n&apos;occupez pas le logement
                    toute l&apos;année.
                  </p>
                </div>
              </div>

              <Link
                href="/residences-secondaires-gites"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                Découvrir l&apos;offre
                <ArrowRight size={18} strokeWidth={2.3} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
