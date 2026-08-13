"use client";

import { motion } from "framer-motion";
import {
  Bolt,
  Droplets,
  Hammer,
  PaintRoller,
  Waves,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Petits travaux électriques",
    description:
      "Remplacement d'interrupteurs, prises, luminaires et petits dépannages.",
    icon: Bolt,
  },
  {
    title: "Petits travaux de plomberie",
    description:
      "Réparation de fuites, remplacement de robinetterie et petits dépannages.",
    icon: Wrench,
  },
  {
    title: "Peinture",
    description:
      "Travaux de peinture intérieure et extérieure avec finitions soignées.",
    icon: PaintRoller,
  },
  {
    title: "Menuiserie",
    description:
      "Montage de meubles, pose d'étagères, réparations et ajustements.",
    icon: Hammer,
  },
  {
    title: "Entretien piscine",
    description:
      "Entretien courant, nettoyage et contrôle de votre piscine.",
    icon: Waves,
  },
  {
    title: "Dépannage d’urgence",
    description:
      "Intervention sur les petits travaux nécessitant une prise en charge rapide.",
    icon: Droplets,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[68px] overflow-hidden bg-white py-12 sm:py-20 lg:py-22"
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
        <div
          className="w-full"
          style={{
            width: "100%",
            maxWidth: "1360px",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
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
            className="mb-8 flex w-full flex-col items-center justify-center text-center sm:mb-12"
            style={{
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            {/* Badge */}

            <span
              className="inline-flex rounded-full border border-yellow-300/70 bg-yellow-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88311] sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
              style={{
                alignSelf: "center",
              }}
            >
              Nos services
            </span>

            {/* Titre */}

            <h2
              className="mt-3 text-[1.8rem] font-bold leading-[1.12] tracking-tight text-[#082E50] sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]"
              style={{
                width: "100%",
                maxWidth: "1050px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              Des prestations pour toute la maison
            </h2>

            {/* Sous-titre */}

            <p
              className="mt-2.5 text-[15px] leading-6 text-slate-600 sm:mt-3 sm:text-lg sm:leading-7"
              style={{
                width: "100%",
                maxWidth: "980px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              HomeAToutFaire vous accompagne dans tous vos petits travaux, avec
              professionnalisme, réactivité et un travail soigné.
            </p>

            {/* Barre or */}

            <div
              className="mt-3 h-1 w-14 rounded-full bg-[#D5A52E] sm:mt-4 sm:w-16"
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </motion.div>

          {/* =====================================================
              GRILLE DES SERVICES
          ===================================================== */}

          <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
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
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "18px",
                    paddingRight: "22px",
                    paddingBottom: "18px",
                    paddingLeft: "22px",
                  }}
                >
                  {/* Halo décoratif */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-100/70 blur-3xl transition-all duration-300 group-hover:bg-yellow-200/80"
                  />

                  <div className="relative z-10">
                    {/* Icône */}

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-[#C88A00] shadow-[0_8px_20px_rgba(213,165,46,0.16)] sm:h-14 sm:w-14">
                      <Icon
                        size={24}
                        strokeWidth={2.2}
                        className="sm:h-7 sm:w-7"
                      />
                    </div>

                    {/* Titre */}

                    <h3
                      className="mt-3.5 text-lg font-bold leading-tight text-[#082E50] sm:mt-5 sm:text-xl"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}

                    <p
                      className="mt-1.5 text-[13px] leading-5 text-slate-600 sm:mt-2 sm:text-[15px] sm:leading-6"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        textIndent: 0,
                        boxSizing: "border-box",
                        overflowWrap: "break-word",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}