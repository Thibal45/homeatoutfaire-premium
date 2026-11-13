"use client";

import { ArrowUpRight, Check, Phone } from "lucide-react";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";
import { trackContactClick } from "../lib/analytics";

export default function Quote() {
  return (
    <section id="devis" className="section-space quote-section">
      <div className="site-container quote-layout">
        <Reveal className="quote-intro">
          <p className="eyebrow">
            <span className="eyebrow-line" /> 04 / ON EN PARLE ?
          </p>
          <h2 className="display-title">
            Et si on réglait
            <br />
            <span>ce petit truc ?</span>
          </h2>
          <p className="large-copy">
            Parlez-moi de votre besoin.
            <br />
            Je vous réponds directement.
          </p>
          <ul className="quote-benefits">
            <li>
              <Check size={18} aria-hidden="true" /> Une demande gratuite, sans
              engagement
            </li>
            <li>
              <Check size={18} aria-hidden="true" /> Un téléphone ou un e-mail
              suffit
            </li>
            <li>
              <Check size={18} aria-hidden="true" /> Une prise en charge
              vérifiée avant déplacement
            </li>
          </ul>
          <a
            href="tel:0618085598"
            className="quote-direct"
            onClick={() => trackContactClick("phone", "quote_intro")}
          >
            <span className="call-icon">
              <Phone size={21} aria-hidden="true" />
            </span>
            <span>
              <small>Vous préférez en parler ?</small>
              <strong>06 18 08 55 98</strong>
            </span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <div className="quote-faq">
            <h3>Avant de se lancer</h3>
            <details>
              <summary>Faut-il envoyer des photos ?</summary>
              <p>
                Ce n’est pas obligatoire. Elles peuvent aider à comprendre votre
                besoin. Vous pourrez les transmettre par e-mail ou WhatsApp lors
                de notre échange.
              </p>
            </details>
            <details>
              <summary>Comment le prix est-il défini ?</summary>
              <p>
                Le travail à réaliser est précisé ensemble. La prestation et le
                tarif sont convenus avant de planifier l’intervention.
              </p>
            </details>
            <details>
              <summary>Et pour une petite urgence ?</summary>
              <p>
                Appelez-moi pour vérifier la prise en charge et mes
                disponibilités. Le dimanche matin est réservé aux dépannages
                d’extrême urgence, selon disponibilité.
              </p>
            </details>
          </div>
        </Reveal>
        <Reveal className="quote-frame" delay={80}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
