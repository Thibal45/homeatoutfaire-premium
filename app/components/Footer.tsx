import type { ReactNode } from "react";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#06192B] text-white">
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[110px]" />

        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D5A52E]/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(1,10,20,0.25)_100%)]" />
      </div>

      {/* =========================================================
          CONTENEUR PRINCIPAL
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-12">
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
              PARTIE PRINCIPALE
          ===================================================== */}

          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            {/* ===================================================
                IDENTITÉ
            =================================================== */}

            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Home
                <span className="text-[#D5A52E]">
                  AToutFaire
                </span>
              </h2>

              <p className="mt-3 text-sm font-medium leading-6 text-blue-100/75 sm:text-base">
                Votre confiance, notre priorité.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/55">
                Services de proximité pour vos petits travaux, dépannages et
                besoins du quotidien autour de Sainte-Anastasie.
              </p>

              <div className="mt-6 h-1 w-14 rounded-full bg-[#D5A52E]" />
            </div>

            {/* ===================================================
                COORDONNÉES
            =================================================== */}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 md:justify-items-end">
              <FooterContact
                icon={<Phone size={18} strokeWidth={2.2} />}
                href="tel:0618085598"
              >
                06 18 08 55 98
              </FooterContact>

              <FooterContact
                icon={<Mail size={18} strokeWidth={2.2} />}
                href="mailto:hatf30190@gmail.com"
              >
                hatf30190@gmail.com
              </FooterContact>

              <FooterContact
                icon={<MapPin size={18} strokeWidth={2.2} />}
              >
                Sainte-Anastasie (30)
              </FooterContact>
            </div>
          </div>

          {/* =====================================================
              BAS DU FOOTER
          ===================================================== */}

          <div className="pt-7">
            <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-blue-100/50">
              <span>
                © {new Date().getFullYear()} HomeAToutFaire — Tous droits réservés.
              </span>

              <span className="hidden text-blue-100/25 sm:inline">
                •
              </span>

              <span className="text-xs font-medium text-blue-100/55">
                SIRET : 10665167200011
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===============================================================
   LIGNE DE CONTACT
================================================================ */

type FooterContactProps = {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
};

function FooterContact({
  icon,
  children,
  href,
}: FooterContactProps) {
  const content = (
    <span
      className="flex items-center gap-3"
      style={{
        boxSizing: "border-box",
      }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/8 text-[#D5A52E]">
        {icon}
      </span>

      <span className="text-sm font-medium text-blue-50">
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className="rounded-xl transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52E]/70"
      >
        {content}
      </a>
    );
  }

  return content;
}