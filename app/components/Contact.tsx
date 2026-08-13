"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[68px] overflow-hidden bg-white py-12 sm:py-20 lg:py-22"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-yellow-200/25 blur-[110px]" />

        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-sky-200/25 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,46,80,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,46,80,0.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
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
              y: 28,
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
              duration: 0.65,
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
              Contact
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
              Parlons de votre besoin
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
              Une question, un dépannage ou un projet à prévoir ? Contactez
              HomeAToutFaire directement.
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
              CARTE PRINCIPALE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_22px_65px_rgba(15,23,42,0.10)] lg:grid-cols-[0.9fr_1.1fr]"
          >
            {/* ===================================================
                COLONNE GAUCHE
            =================================================== */}

            <div
              className="relative overflow-hidden bg-[#082E50] text-white"
              style={{
                boxSizing: "border-box",
                paddingTop: "22px",
                paddingRight: "22px",
                paddingBottom: "22px",
                paddingLeft: "22px",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/10 blur-[80px]"
              />

              <div
                className="relative z-10"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-300 sm:text-sm sm:tracking-[0.18em]"
                  style={{
                    margin: 0,
                    padding: 0,
                    textIndent: 0,
                  }}
                >
                  HomeAToutFaire
                </p>

                <h3
                  className="mt-2.5 text-[1.35rem] font-bold leading-tight text-white sm:mt-3 sm:text-2xl"
                  style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                    textIndent: 0,
                  }}
                >
                  Un interlocuteur unique pour vos petits travaux
                </h3>

                <p
                  className="mt-3 text-[13px] leading-5 text-blue-100/75 sm:mt-4 sm:text-sm sm:leading-6"
                  style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                    textIndent: 0,
                    overflowWrap: "break-word",
                  }}
                >
                  Je vous accompagne pour vos besoins en plomberie, électricité,
                  peinture, menuiserie, entretien de piscine et dépannage.
                </p>

                <div className="mt-5 space-y-3.5 sm:mt-8 sm:space-y-5">
                  <ContactLine
                    icon={<Phone size={20} />}
                    title="Téléphone"
                  >
                    <a
                      href="tel:0618085598"
                      className="font-semibold text-white transition-colors hover:text-yellow-300"
                    >
                      06 18 08 55 98
                    </a>
                  </ContactLine>

                  <ContactLine
                    icon={<Mail size={20} />}
                    title="E-mail"
                  >
                    <a
                      href="mailto:hatf30190@gmail.com"
                      className="break-all font-semibold text-white transition-colors hover:text-yellow-300"
                    >
                      hatf30190@gmail.com
                    </a>
                  </ContactLine>

                  <ContactLine
                    icon={<MapPin size={20} />}
                    title="Zone d’intervention"
                  >
                    <p className="m-0 text-blue-100/80">
                      Jusqu&apos;à 50 km autour de Sainte-Anastasie
                    </p>
                  </ContactLine>
                </div>
              </div>
            </div>

            {/* ===================================================
                COLONNE DROITE
            =================================================== */}

            <div
              className="relative bg-white"
              style={{
                boxSizing: "border-box",
                paddingTop: "22px",
                paddingRight: "22px",
                paddingBottom: "22px",
                paddingLeft: "22px",
              }}
            >
              <div
                className="relative z-10"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-[#C89516] sm:h-11 sm:w-11 sm:rounded-2xl">
                    <Clock
                      size={20}
                      strokeWidth={2.2}
                      className="sm:h-[22px] sm:w-[22px]"
                    />
                  </div>

                  <div>
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#B88311] sm:text-sm sm:tracking-[0.14em]">
                      Horaires
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#082E50] sm:text-xl">
                      Disponibilités
                    </h3>
                  </div>
                </div>

                <div className="mt-5 divide-y divide-slate-200 sm:mt-7">
                  <ScheduleLine
                    day="Lundi au vendredi"
                    hours="8h00 – 18h00"
                  />

                  <ScheduleLine
                    day="Samedi"
                    hours="8h00 – 18h00"
                  />

                  <ScheduleLine
                    day="Dimanche"
                    hours="Extrême urgence le matin"
                    highlight
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 sm:mt-7 sm:p-5">
                  <p className="m-0 text-sm font-semibold text-[#082E50] sm:text-base">
                    Besoin d&apos;un devis ?
                  </p>

                  <p className="mt-1.5 text-[13px] leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">
                    Utilisez le formulaire en ligne pour détailler votre demande.
                    Les photos pourront ensuite être transmises par e-mail ou
                    WhatsApp si nécessaire.
                  </p>

                  <a
                    href="#devis"
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#082E50] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B3A63] hover:shadow-md sm:mt-4 sm:px-5 sm:py-3"
                  >
                    Demander un devis gratuit
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   LIGNE DE CONTACT
================================================================ */

type ContactLineProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function ContactLine({
  icon,
  title,
  children,
}: ContactLineProps) {
  return (
    <div
      className="flex items-start gap-3"
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-yellow-300 sm:h-10 sm:w-10">
        {icon}
      </div>

      <div
        className="min-w-0"
        style={{
          boxSizing: "border-box",
        }}
      >
        <p
          className="m-0 text-[11px] font-semibold uppercase tracking-[0.11em] text-blue-100/55 sm:text-xs sm:tracking-[0.12em]"
          style={{
            paddingLeft: 0,
            textIndent: 0,
          }}
        >
          {title}
        </p>

        <div
          className="mt-0.5 text-[13px] leading-5 sm:mt-1 sm:text-sm sm:leading-6"
          style={{
            marginLeft: 0,
            paddingLeft: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   LIGNE D'HORAIRES
================================================================ */

type ScheduleLineProps = {
  day: string;
  hours: string;
  highlight?: boolean;
};

function ScheduleLine({
  day,
  hours,
  highlight = false,
}: ScheduleLineProps) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
      <span className="text-sm font-medium text-slate-700 sm:text-base">
        {day}
      </span>

      <span
        className={
          highlight
            ? "text-sm font-semibold text-[#B88311] sm:text-right sm:text-base"
            : "text-sm font-semibold text-[#082E50] sm:text-right sm:text-base"
        }
      >
        {hours}
      </span>
    </div>
  );
}