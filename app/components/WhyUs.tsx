"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Handshake,
  MapPin,
  ShieldCheck,
  TimerReset,
  Wrench,
} from "lucide-react";

const reasons = [
  {
    title: "Travail soigné",
    description:
      "Des prestations réalisées avec sérieux, avec une attention particulière portée aux finitions et au respect de votre habitation.",
    icon: CheckCircle2,
  },
  {
    title: "Confiance et proximité",
    description:
      "Un interlocuteur unique pour vous conseiller, suivre votre demande et intervenir sur vos petits travaux du quotidien.",
    icon: Handshake,
  },
  {
    title: "Intervention locale",
    description:
      "Des interventions à Sainte-Anastasie et jusqu’à 50 km aux alentours pour rester disponible au plus près de vos besoins.",
    icon: MapPin,
  },
];

const highlights = [
  {
    label: "Multi-services",
    icon: Wrench,
  },
  {
    label: "Intervention réactive",
    icon: TimerReset,
  },
  {
    label: "Suivi personnalisé",
    icon: ShieldCheck,
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-22"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-100/80 blur-[110px]" />

        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-100/70 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,46,80,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(8,46,80,0.3) 1px, transparent 1px)",
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
            className="mb-8 flex w-full flex-col items-center justify-center text-center sm:mb-12"
            style={{
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <span
              className="inline-flex rounded-full border border-yellow-300/70 bg-yellow-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88311] sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
              style={{
                alignSelf: "center",
              }}
            >
              Pourquoi nous choisir
            </span>

            <h2
              className="mt-3 text-[1.8rem] font-bold leading-[1.12] tracking-tight text-[#082E50] sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]"
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
              Un accompagnement simple, humain et efficace
            </h2>

            <p
              className="mt-2.5 text-[15px] leading-6 text-slate-600 sm:mt-3 sm:text-lg sm:leading-7"
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
              HomeAToutFaire met l’accent sur la qualité du travail, la
              proximité et un accompagnement clair pour vos petits travaux,
              entretiens et dépannages.
            </p>

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
              CARTES
          ===================================================== */}

          <div className="grid gap-3.5 sm:gap-5 md:grid-cols-3 lg:gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.article
                  key={reason.title}
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
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)]"
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "20px",
                    paddingRight: "22px",
                    paddingBottom: "20px",
                    paddingLeft: "22px",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-100/70 blur-3xl transition-all duration-300 group-hover:bg-yellow-200/80"
                  />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#082E50] text-[#D5A52E] shadow-[0_10px_24px_rgba(8,46,80,0.18)] sm:h-14 sm:w-14">
                      <Icon
                        size={24}
                        strokeWidth={2.2}
                        className="sm:h-[27px] sm:w-[27px]"
                      />
                    </div>

                    <h3 className="mt-3.5 text-lg font-bold text-[#082E50] sm:mt-5 sm:text-xl">
                      {reason.title}
                    </h3>

                    <p
                      className="mt-2 text-[13px] leading-5 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-6"
                      style={{
                        marginLeft: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        textIndent: 0,
                        boxSizing: "border-box",
                        overflowWrap: "break-word",
                      }}
                    >
                      {reason.description}
                    </p>

                    <div className="mt-4 h-px w-full bg-slate-100 sm:mt-5" />

                    <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-[#B88311] sm:mt-4 sm:text-sm">
                      <CheckCircle2
                        size={16}
                        strokeWidth={2.3}
                      />

                      <span>
                        Votre confiance, notre priorité.
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* =====================================================
              BANDEAU INFÉRIEUR
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
              delay: 0.15,
              ease: "easeOut",
            }}
            className="mt-5 grid overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] sm:mt-8 sm:grid-cols-3"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.label}
                  className={`flex items-center justify-center gap-3 px-4 py-3.5 sm:px-5 sm:py-5 ${
                    index !== highlights.length - 1
                      ? "border-b border-slate-200 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#082E50]/8 text-[#082E50] sm:h-10 sm:w-10">
                    <Icon
                      size={18}
                      strokeWidth={2.2}
                      className="sm:h-5 sm:w-5"
                    />
                  </div>

                  <span className="text-[13px] font-bold text-[#082E50] sm:text-[15px]">
                    {highlight.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}