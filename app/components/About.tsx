"use client";

import { FileText, MapPin, Phone, UserRound } from "lucide-react";
import { motion } from "framer-motion";

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: Record<string, string | number | boolean>,
  ) => void;
};

function trackPhoneClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_phone", {
    contact_method: "phone",
    location: "about_section",
  });
}

function trackQuoteClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_quote", {
    location: "about_section",
  });
}

export default function About() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden bg-[#F8FAFC] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-100/70 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-yellow-100/70 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#082E50] text-xl font-bold text-yellow-300 shadow-sm">
              TS
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A6587]">
                Votre interlocuteur
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#06192B]">
                Thibaut SACHOT
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                HomeAToutFaire
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#082E50] p-5 text-white">
            <div className="flex items-start gap-3">
              <UserRound
                size={22}
                strokeWidth={2.2}
                className="mt-0.5 shrink-0 text-yellow-300"
              />

              <p className="text-sm leading-6 text-blue-50/85">
                Un seul interlocuteur du premier échange jusqu&apos;à la fin
                de l&apos;intervention, pour garder une communication simple
                et claire.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
            À propos
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#06192B] sm:text-4xl">
            Derrière HomeAToutFaire, une personne à qui parler directement
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
            <p>
              Je m&apos;appelle Thibaut SACHOT. Avec HomeAToutFaire, je prends
              directement en charge vos demandes de petits travaux,
              dépannages et entretiens courants autour de Sainte-Anastasie.
            </p>

            <p>
              Chaque demande est étudiée avant déplacement afin de vérifier
              qu&apos;elle correspond bien aux prestations proposées. Mon
              objectif est simple : vous apporter une réponse claire, un
              travail soigné et un échange facile du premier contact à la fin
              de l&apos;intervention.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin
                  size={20}
                  strokeWidth={2.2}
                  className="text-[#0A6587]"
                />
                <p className="font-semibold text-[#06192B]">
                  Service de proximité
                </p>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sainte-Anastasie et jusqu&apos;à environ 50 km aux alentours.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText
                  size={20}
                  strokeWidth={2.2}
                  className="text-[#0A6587]"
                />
                <p className="font-semibold text-[#06192B]">
                  Besoin étudié avant intervention
                </p>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quelques informations ou photos permettent souvent de valider
                rapidement la prise en charge.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#devis"
              onClick={trackQuoteClick}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              <FileText size={18} strokeWidth={2.3} />
              Me parler de votre besoin
            </a>

            <a
              href="tel:0618085598"
              onClick={trackPhoneClick}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#082E50] transition-all hover:-translate-y-0.5 hover:border-[#0A6587]"
            >
              <Phone size={18} strokeWidth={2.3} />
              06 18 08 55 98
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
