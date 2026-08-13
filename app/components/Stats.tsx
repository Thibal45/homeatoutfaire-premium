"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const commitments = [
  {
    title: "Travail soigné",
    description:
      "Des interventions réalisées avec sérieux, attention et soin des finitions.",
    icon: CheckCircle2,
    iconClassName: "bg-yellow-400/10 text-yellow-300",
  },
  {
    title: "Zone d’intervention locale",
    description:
      "Interventions jusqu’à 50 km autour de Sainte-Anastasie.",
    icon: MapPin,
    iconClassName: "bg-red-400/10 text-red-300",
  },
  {
    title: "Disponible du lundi au samedi",
    description:
      "Interventions et dépannages selon les horaires d’ouverture annoncés.",
    icon: CalendarDays,
    iconClassName: "bg-emerald-400/10 text-emerald-300",
  },
  {
    title: "Devis gratuit",
    description:
      "Une estimation claire de votre besoin avant intervention.",
    icon: FileText,
    iconClassName: "bg-sky-400/10 text-sky-300",
  },
  {
    title: "Multi-services",
    description:
      "Plomberie, électricité, peinture, menuiserie, piscine et petits dépannages.",
    icon: Wrench,
    iconClassName: "bg-violet-400/10 text-violet-300",
  },
  {
    title: "Un interlocuteur unique",
    description:
      "Un seul contact pour suivre votre demande du premier échange à l’intervention.",
    icon: ShieldCheck,
    iconClassName: "bg-cyan-400/10 text-cyan-300",
  },
];

export default function Stats() {
  return (
    <section
      id="engagements"
      className="relative overflow-hidden bg-[#082E50] py-12 text-white sm:py-20 lg:py-22"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(1,12,24,0.28)_100%)]" />
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
            <span
              className="inline-flex rounded-full border border-yellow-300/30 bg-white/8 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-300 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
              style={{
                alignSelf: "center",
              }}
            >
              Nos engagements
            </span>

            <h2
              className="mt-3 text-[1.8rem] font-bold leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]"
              style={{
                width: "100%",
                maxWidth: "960px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              Un service de proximité, clair et soigné
            </h2>

            <p
              className="mt-2.5 text-[15px] leading-6 text-blue-100/75 sm:mt-3 sm:text-lg sm:leading-7"
              style={{
                width: "100%",
                maxWidth: "900px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              HomeAToutFaire vous accompagne avec sérieux pour vos petits
              travaux, vos besoins d’entretien et vos dépannages du quotidien.
            </p>

            <div
              className="mt-3 h-1 w-14 rounded-full bg-yellow-400 sm:mt-4 sm:w-16"
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </motion.div>

          {/* =====================================================
              GRILLE
          ===================================================== */}

          <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;

              return (
                <motion.article
                  key={commitment.title}
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
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-300/35 hover:bg-white/11"
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "18px",
                    paddingRight: "22px",
                    paddingBottom: "18px",
                    paddingLeft: "22px",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl transition-all duration-300 group-hover:bg-yellow-400/20"
                  />

                  <div
                    className="relative z-10"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${commitment.iconClassName}`}
                    >
                      <Icon
                        size={21}
                        strokeWidth={2.2}
                        className="sm:h-6 sm:w-6"
                      />
                    </div>

                    <h3
                      className="mt-3 text-[17px] font-semibold leading-6 text-white sm:mt-4 sm:text-lg"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                      }}
                    >
                      {commitment.title}
                    </h3>

                    <p
                      className="mt-1.5 block w-full text-[13px] leading-5 text-blue-100/70 sm:mt-2 sm:text-sm sm:leading-6"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        textIndent: 0,
                        boxSizing: "border-box",
                        overflowWrap: "break-word",
                      }}
                    >
                      {commitment.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* =====================================================
              CTA BAS
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: "easeOut",
            }}
            className="mx-auto mt-6 flex max-w-4xl flex-col justify-between gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            style={{
              boxSizing: "border-box",
              paddingTop: "16px",
              paddingRight: "22px",
              paddingBottom: "16px",
              paddingLeft: "22px",
            }}
          >
            <div className="min-w-0">
              <p className="m-0 text-sm font-semibold text-white sm:text-base">
                Un projet ou un besoin ponctuel ?
              </p>

              <p
                className="mt-1 text-[13px] leading-5 text-blue-100/70 sm:text-sm sm:leading-6"
                style={{
                  marginLeft: 0,
                  paddingLeft: 0,
                  textIndent: 0,
                }}
              >
                Décrivez votre demande et recevez un devis gratuit.
              </p>
            </div>

            <a
              href="#devis"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-[#06192B] shadow-[0_12px_32px_rgba(250,204,21,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 sm:px-6 sm:py-3"
            >
              Demander un devis gratuit
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}