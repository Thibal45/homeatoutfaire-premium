"use client";

import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: Record<string, string | number | boolean>,
  ) => void;
};

type ServiceContactCtaProps = {
  location: string;
  service?: string;
};

export default function ServiceContactCta({
  location,
  service,
}: ServiceContactCtaProps) {
  const quoteHref = service
    ? `/?service=${encodeURIComponent(service)}#devis`
    : "/#devis";

  const whatsappMessage = service
    ? `Bonjour, je souhaite un renseignement pour : ${service}.`
    : "Bonjour, je souhaite un renseignement pour des petits travaux.";

  const whatsappHref = `https://wa.me/33618085598?text=${encodeURIComponent(
    whatsappMessage,
  )}`;
  function trackPhoneClick() {
    const analyticsWindow = window as GtagWindow;

    analyticsWindow.gtag?.("event", "click_phone", {
      contact_method: "phone",
      location,
    });
  }

  function trackQuoteClick() {
    const analyticsWindow = window as GtagWindow;

    analyticsWindow.gtag?.("event", "click_quote", {
      location,
      ...(service ? { service } : {}),
    });
  }

  function trackWhatsAppClick() {
    const analyticsWindow = window as GtagWindow;

    analyticsWindow.gtag?.("event", "click_whatsapp", {
      contact_method: "whatsapp",
      location,
      ...(service ? { service } : {}),
    });
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <a
          href="tel:0618085598"
          onClick={trackPhoneClick}
          aria-label="Appeler HomeAToutFaire au 06 18 08 55 98"
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-[#06192B] shadow-[0_14px_35px_rgba(250,204,21,0.24)] transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
        >
          <Phone size={20} strokeWidth={2.4} />

          <span>
            Appeler le 06 18 08 55 98
          </span>
        </a>

        <Link
          href={quoteHref}
          onClick={trackQuoteClick}
          aria-label="Demander un devis gratuit à HomeAToutFaire"
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-yellow-300/60 hover:bg-white hover:text-[#06192B]"
        >
          <FileText size={20} strokeWidth={2.3} />

          <span>
            Devis gratuit pour ce besoin
          </span>
        </Link>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-300 transition-colors hover:bg-white/8 hover:text-emerald-200"
      >
        <MessageCircle size={17} strokeWidth={2.3} />
        Écrire sur WhatsApp
      </a>
    </div>
  );
}