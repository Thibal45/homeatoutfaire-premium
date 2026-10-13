"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Phone,
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
    location: "how_it_works",
  });
}

function trackPhoneClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_phone", {
    contact_method: "phone",
    location: "how_it_works",
  });
}

const steps = [
  {
    number: "01",
    title: "Décrivez votre besoin",
    description:
      "Expliquez le petit travail ou le problème rencontré par le formulaire, par téléphone ou sur WhatsApp. Quelques photos peuvent aider à comprendre la situation.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Je vérifie la prise en charge",
    description:
      "Votre demande est étudiée avant déplacement afin de confirmer qu’elle entre bien dans les prestations HomeAToutFaire et de préciser les éléments utiles au devis.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "L’intervention est organisée",
    description:
      "Une fois la prestation et le tarif convenus, l’intervention est planifiée avec vous dans le cadre défini ensemble.",
    icon: Wrench,
  },
];

export default function Stats() {
  return (
    <section
      id="fonctionnement"
      className="relative overflow-hidden bg-[#082E50] py-16 text-white sm:py-20 lg:py-22"
    >
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

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1360px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="how-it-works-heading mx-auto max-w-[900px] text-center"
          >
            <span className="inline-flex rounded-full border border-yellow-300/30 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
              Comment ça se passe ?
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.15rem] lg:text-[2.35rem]">
              Une demande simple, du premier contact à l&apos;intervention
            </h2>

            <p className="mt-3 text-base leading-7 text-blue-100/75 sm:text-lg">
              L&apos;objectif est de savoir rapidement si votre besoin peut
              être pris en charge, sans vous faire déplacer ni multiplier les
              interlocuteurs.
            </p>

            <div className="how-it-works-divider mx-auto mt-4 h-1 w-16 rounded-full bg-yellow-400" />
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
                      <Icon size={23} strokeWidth={2.3} />
                    </div>

                    <span className="text-3xl font-black tracking-tight text-white/10">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-blue-100/70 sm:text-[15px]">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-2xl items-start gap-3">
                <CheckCircle2
                  size={21}
                  strokeWidth={2.3}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />

                <div>
                  <p className="font-semibold text-white">
                    Vous ne savez pas si votre demande entre dans le périmètre ?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-100/70">
                    Décrivez-la simplement. Elle est étudiée avant déplacement
                    afin de vous donner une réponse claire.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <a
                  href="#devis"
                  onClick={trackQuoteClick}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
                >
                  <FileText size={18} strokeWidth={2.3} />
                  Décrire mon besoin
                </a>

                <a
                  href="tel:0618085598"
                  onClick={trackPhoneClick}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-yellow-300/50 hover:bg-white/12"
                >
                  <Phone size={18} strokeWidth={2.3} />
                  Appeler
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
