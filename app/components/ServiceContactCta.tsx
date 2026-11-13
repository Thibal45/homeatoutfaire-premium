"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";

type Props = { location: string; service?: string };
export default function ServiceContactCta({ location, service }: Props) {
  const quoteHref = service
    ? `/?service=${encodeURIComponent(service)}#devis`
    : "/#devis";
  const whatsapp = `https://wa.me/33618085598?text=${encodeURIComponent(service ? `Bonjour, je souhaite un renseignement pour : ${service}.` : "Bonjour, je souhaite un renseignement pour des petits travaux.")}`;
  return (
    <div className="service-contact-cta">
      <div>
        <Link
          href={quoteHref}
          className="btn btn-gold"
          aria-label="Demander un devis gratuit à HomeAToutFaire"
          onClick={() => trackQuoteClick(location, service)}
        >
          Demander un devis gratuit{" "}
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
        <a
          href="tel:0618085598"
          className="service-cta-phone"
          aria-label="Appeler HomeAToutFaire au 06 18 08 55 98"
          onClick={() => trackContactClick("phone", location, service)}
        >
          <Phone size={17} aria-hidden="true" />
          06 18 08 55 98
        </a>
      </div>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="service-cta-whatsapp"
        onClick={() => trackContactClick("whatsapp", location, service)}
      >
        <MessageCircle size={16} aria-hidden="true" />
        Ou écrivez-moi sur WhatsApp
      </a>
    </div>
  );
}
