"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import QuoteForm from "./QuoteForm";

export default function Quote() {
  return (
    <section
      id="devis"
      className="relative scroll-mt-[68px] overflow-hidden bg-[#082E50] py-12 text-white sm:py-20 lg:py-22"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

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
              className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-white/8 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-300 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
              style={{
                alignSelf: "center",
              }}
            >
              <FileText
                size={14}
                strokeWidth={2.3}
                className="sm:h-[15px] sm:w-[15px]"
              />

              Devis gratuit
            </span>

            <h2
              className="mt-3 text-[1.72rem] font-bold leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]"
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
              Besoin d&apos;un devis gratuit&nbsp;?
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
              Décrivez votre projet et transmettez les informations utiles à
              votre demande. Vous pourrez ainsi obtenir une estimation claire,
              gratuite et sans engagement.
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
              AVANTAGES
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
              duration: 0.55,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="mb-5 grid gap-2.5 sm:mb-7 sm:grid-cols-3 sm:gap-4"
          >
            <Benefit
              icon={<CheckCircle2 size={19} strokeWidth={2.3} />}
              title="Gratuit"
              text="Aucun engagement"
            />

            <Benefit
              icon={<Sparkles size={19} strokeWidth={2.3} />}
              title="Simple"
              text="Quelques informations suffisent"
            />

            <Benefit
              icon={<ShieldCheck size={19} strokeWidth={2.3} />}
              title="Clair"
              text="Une demande structurée"
            />
          </motion.div>

          {/* =====================================================
              FORMULAIRE
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
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: "easeOut",
            }}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/7 shadow-[0_24px_70px_rgba(1,12,24,0.30)] backdrop-blur-xl sm:rounded-[32px]"
            style={{
              boxSizing: "border-box",
              paddingTop: "16px",
              paddingRight: "16px",
              paddingBottom: "16px",
              paddingLeft: "16px",
            }}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type BenefitProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function Benefit({
  icon,
  title,
  text,
}: BenefitProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 backdrop-blur-md"
      style={{
        boxSizing: "border-box",
        paddingTop: "11px",
        paddingRight: "14px",
        paddingBottom: "11px",
        paddingLeft: "14px",
      }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/12 text-yellow-300 sm:h-10 sm:w-10">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="m-0 text-sm font-bold text-white">
          {title}
        </p>

        <p
          className="mt-0.5 text-xs leading-5 text-blue-100/65"
          style={{
            marginLeft: 0,
            paddingLeft: 0,
            textIndent: 0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}