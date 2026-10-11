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

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: Record<string, string | number | boolean>,
  ) => void;
};

function trackQuoteClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_quote", {
    location: "stats",
  });
}

const commitments = [
  {
    title: "Travail soigné",
    description:
      "Des petits travaux réalisés avec sérieux, attention et soin des finitions.",
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
      "Petits travaux et dépannages selon les horaires d’ouverture annoncés.",
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
    title: "Petits travaux multiservices",
    description:
      "Plomberie et électricité sur existant, peinture, menuiserie, entretien courant de piscine et petits dépannages.",
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
      className="relative overflow-hidden bg-[#082E50] py-16 text-white sm:py-20 lg:py-22"
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
              EN-TÊTE CENTRÉ
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
            className="mb-10 flex w-full flex-col items-center justify-center sm:mb-12"
            style={{
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <span
              className="inline-flex rounded-full border border-yellow-300/30 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300"
              style={{
                alignSelf: "center",
              }}
            >
              Nos engagements
            </span>

            <h2
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.15rem] lg:text-[2.35rem]"
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
              className="mt-3 text-base leading-7 text-blue-100/75 sm:text-lg"
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
              travaux, vos besoins d’entretien courant et vos petits
              dépannages du quotidien.
            </p>

            <div
              className="mt-4 h-1 w-16 rounded-full bg-yellow-400"
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                    paddingTop: "24px",
                    paddingRight: "32px",
                    paddingBottom: "24px",
                    paddingLeft: "32px",
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
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${commitment.iconClassName}`}
                    >
                      <Icon
                        size={24}
                        strokeWidth={2.2}
                      />
                    </div>

                    <h3
                      className="mt-4 text-lg font-semibold leading-6 text-white"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                      }}
                    >
                      {commitment.title}
                    </h3>

                    <p
                      className="mt-2 block w-full text-sm leading-6 text-blue-100/70"
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
            className="mx-auto mt-10 flex max-w-4xl flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl sm:flex-row sm:items-center"
            style={{
              boxSizing: "border-box",
              paddingTop: "20px",
              paddingRight: "32px",
              paddingBottom: "20px",
              paddingLeft: "32px",
            }}
          >
            <div className="min-w-0">
              <p className="m-0 font-semibold text-white">
                Un petit travail ou un besoin ponctuel ?
              </p>

              <p
                className="mt-1 text-sm leading-6 text-blue-100/70"
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
              onClick={trackQuoteClick}
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-bold text-[#06192B] shadow-[0_12px_32px_rgba(250,204,21,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              Demander un devis gratuit
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}