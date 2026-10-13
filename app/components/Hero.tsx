"use client";

import type { ElementType } from "react";
import Image from "next/image";
import {
  ArrowDown,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, MotionConfig } from "framer-motion";

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
    location: "hero",
  });
}

function trackQuoteClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_quote", {
    location: "hero",
  });
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="accueil"
        className="relative isolate min-h-[calc(100svh-68px)] scroll-mt-[68px] overflow-hidden bg-[#06192B] text-white lg:min-h-[760px] lg:max-h-[860px]"
      >
        {/* =========================================================
            PHOTO DE FOND
        ========================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_45%]"
          />
        </div>

        {/* =========================================================
            VOILES DE LISIBILITÉ
        ========================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[#041524]/42"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(3,18,32,0.94)_0%,rgba(4,27,47,0.82)_34%,rgba(4,27,47,0.40)_58%,rgba(4,20,35,0.10)_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(4,20,34,0.28)_0%,transparent_30%,rgba(3,18,32,0.16)_65%,rgba(3,18,32,0.72)_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* =========================================================
            CONTENU GLOBAL
        ========================================================= */}

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-68px)] w-full max-w-[1480px] flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[760px] lg:px-10 lg:py-14 xl:px-12">
          {/* =======================================================
              ZONE PRINCIPALE
          ======================================================= */}

          <div className="grid items-center lg:grid-cols-[0.58fr_0.42fr] lg:gap-12 xl:grid-cols-[0.55fr_0.45fr] xl:gap-16">
            {/* =====================================================
                COLONNE GAUCHE
            ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -32,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="w-full max-w-[740px]"
            >
              {/* ===================================================
                  PROMESSE PRINCIPALE
              =================================================== */}

              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#06192B]/55 px-3.5 py-1.5 text-left text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-yellow-300 shadow-lg backdrop-blur-xl sm:text-xs sm:tracking-[0.16em]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
                Artisan multiservices local
              </p>

              <h1 className="mt-4 max-w-[740px] text-left text-[2.15rem] font-bold leading-[1.04] tracking-tight text-white sm:text-[2.85rem] sm:leading-[1.05] lg:text-[3.15rem] xl:text-[3.45rem]">
                Petits travaux et dépannage à Sainte-Anastasie
              </h1>

              <p className="mt-4 max-w-[650px] text-left text-base leading-7 text-blue-50/85 sm:text-lg sm:leading-8">
                Un interlocuteur unique pour vos travaux du quotidien, près de
                Nîmes et jusqu&apos;à environ 50 km aux alentours.
              </p>

              {/* DISPONIBILITÉ */}

              <div className="mt-5 flex flex-col items-start gap-2">
                <div className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-[#06192B]/65 px-3 py-1 text-[11px] shadow-lg backdrop-blur-xl sm:px-4 sm:py-1.5 sm:text-sm">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

                  <span className="font-semibold text-white">
                    Interventions du lundi au samedi
                  </span>

                  <span className="text-yellow-300">•</span>

                  <span className="text-white/75">Devis gratuit</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-300 sm:text-sm">
                  <Zap size={15} strokeWidth={2.4} />

                  <span>
                    Dimanche matin : uniquement pour les dépannages
                    d&apos;extrême urgence, selon disponibilité
                  </span>
                </div>
              </div>

              {/* ===================================================
                  CARTES
              =================================================== */}

              <div className="mt-5 grid w-full gap-2 sm:grid-cols-3 sm:gap-3">
                <HeroCard
                  icon={Zap}
                  title="Réactif"
                  subtitle="Prise en charge rapide"
                  iconClassName="bg-yellow-400/15 text-yellow-300"
                />

                <HeroCard
                  icon={ShieldCheck}
                  title="Soigné"
                  subtitle="Travail propre"
                  iconClassName="bg-emerald-400/15 text-emerald-300"
                />

                <HeroCard
                  icon={MapPin}
                  title="Local"
                  subtitle="Jusqu’à 50 km"
                  iconClassName="bg-red-400/15 text-red-300"
                />
              </div>

              {/* ===================================================
                  CTA
              =================================================== */}

              <div className="mt-5 grid w-full gap-2.5 sm:grid-cols-2 sm:gap-3">
                <motion.a
                  href="tel:0618085598"
                  aria-label="Appeler HomeAToutFaire au 06 18 08 55 98"
                  onClick={trackPhoneClick}
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-5 py-2.5 font-bold text-[#06192B] shadow-[0_14px_38px_rgba(250,204,21,0.28)] transition-colors hover:bg-yellow-300 sm:min-h-[56px] sm:px-6 sm:py-3"
                >
                  <Phone
                    size={20}
                    strokeWidth={2.4}
                    className="sm:h-[22px] sm:w-[22px]"
                  />

                  <span className="text-left leading-tight">
                    <span className="block text-sm sm:text-base">
                      Appeler maintenant
                    </span>

                    <span className="block text-[11px] font-medium opacity-70 sm:text-xs">
                      06 18 08 55 98
                    </span>
                  </span>
                </motion.a>

                <motion.a
                  href="#devis"
                  aria-label="Accéder au formulaire de demande de devis"
                  onClick={trackQuoteClick}
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-2xl border border-white/25 bg-[#06192B]/60 px-5 py-2.5 font-semibold text-white shadow-lg backdrop-blur-xl transition-colors hover:border-yellow-300/60 hover:bg-white hover:text-[#06192B] sm:min-h-[56px] sm:px-6 sm:py-3"
                >
                  <FileText
                    size={20}
                    strokeWidth={2.2}
                    className="sm:h-[22px] sm:w-[22px]"
                  />

                  <span className="text-left leading-tight">
                    <span className="block text-sm sm:text-base">
                      Demander un devis gratuit
                    </span>

                    <span className="block text-[11px] font-normal opacity-70 sm:text-xs">
                      Gratuit et sans engagement
                    </span>
                  </span>
                </motion.a>
              </div>

              <a
                href="#services"
                className="mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white/75 transition-colors hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300"
              >
                Découvrir les prestations
                <ArrowDown size={17} strokeWidth={2.2} aria-hidden="true" />
              </a>

            </motion.div>

            {/* =====================================================
                COLONNE DROITE LIBRE
            ===================================================== */}

            <div
              aria-hidden="true"
              className="hidden min-h-[430px] lg:block"
            />
          </div>
        </div>

        {/* =========================================================
            TRANSITION BAS
        ========================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-16 bg-gradient-to-b from-transparent to-[#06192B]/38"
        />
      </section>
    </MotionConfig>
  );
}

/* ===============================================================
   CARTE HERO
================================================================ */

type HeroCardProps = {
  icon: ElementType;
  title: string;
  subtitle: string;
  iconClassName: string;
};

function HeroCard({
  icon: Icon,
  title,
  subtitle,
  iconClassName,
}: HeroCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex min-h-[60px] items-center gap-3 rounded-2xl border border-white/12 bg-[#06192B]/58 px-3 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:min-h-[72px] sm:px-4 sm:py-2.5"
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${iconClassName}`}
      >
        <Icon
          size={18}
          strokeWidth={2.3}
          className="sm:h-5 sm:w-5"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-4 text-white sm:text-sm sm:leading-5">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-blue-100/65 sm:text-[11px]">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
