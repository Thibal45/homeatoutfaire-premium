"use client";

import Image from "next/image";
import { CheckCircle2, FileText, MapPin, Phone } from "lucide-react";
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
      className="relative overflow-hidden bg-[#F8FAFC] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-100/70 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-yellow-100/70 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group relative mx-auto w-full max-w-[460px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_24px_70px_rgba(15,23,42,0.16)] lg:max-w-none"
        >
          <Image
            src="/images/thibaut-sachot-homeatoutfaire.webp"
            alt="Thibaut SACHOT, interlocuteur HomeAToutFaire"
            width={640}
            height={800}
            sizes="(max-width: 1024px) 100vw, 460px"
            className="aspect-[4/5] h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06192B] via-[#06192B]/88 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Votre interlocuteur
            </p>
            <h2 className="mt-1.5 text-2xl font-bold sm:text-3xl">
              Thibaut SACHOT
            </h2>
            <p className="mt-1 text-sm text-blue-100/75">
              HomeAToutFaire · Entreprise mobile
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0A6587]">
            À propos
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#06192B] sm:text-4xl lg:text-[2.6rem]">
            Une personne à qui parler, du premier contact à la fin
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
            Je m&apos;appelle Thibaut SACHOT. Je prends directement en charge vos
            demandes de petits travaux, dépannages et entretiens courants autour
            de Sainte-Anastasie, avec un échange simple et une réponse claire.
          </p>

          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            <TrustPoint
              icon={CheckCircle2}
              title="Un travail soigné"
              description="Une attention portée aux finitions et au respect de votre habitation."
            />
            <TrustPoint
              icon={FileText}
              title="Une demande étudiée avant déplacement"
              description="Quelques informations ou photos permettent de vérifier rapidement la prise en charge."
            />
            <TrustPoint
              icon={MapPin}
              title="Un service de proximité"
              description="Sainte-Anastasie et jusqu’à environ 50 km aux alentours."
            />
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

type TrustPointProps = {
  icon: typeof CheckCircle2;
  title: string;
  description: string;
};

function TrustPoint({ icon: Icon, title, description }: TrustPointProps) {
  return (
    <div className="grid gap-3 py-4 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#082E50] text-yellow-300 shadow-sm">
        <Icon size={19} strokeWidth={2.3} aria-hidden="true" />
      </div>
      <div>
        <p className="font-bold text-[#06192B]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
